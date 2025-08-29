import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { IPokemonApiRequest } from '../../shared/interface/pokemon-list';
import { IDamageRelations, IPokemonTypeResponse } from '../../shared/interface/pokemon-type-relations';

@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  #http = inject(HttpClient);
  #url = 'https://pokeapi.co/api/v2';

  private readonly pokemonListSubject$ = new BehaviorSubject<Array<any>>([]);
  public readonly pokemonList$ = this.pokemonListSubject$.asObservable();
  private readonly loadingSubject$ = new BehaviorSubject<boolean>(false)
  public readonly loading$ = this.loadingSubject$.asObservable()
  
  public fetchPokemonList(range: { offset: number; limit: number }) {
    if (this.loadingSubject$.getValue()) {
      return
    }

    const url = `${this.#url}/pokemon?offset=${range.offset}&limit=${
      range.limit
    }`;

    this.loadingSubject$.next(true)

    this.#http
      .get<IPokemonApiRequest>(url)
      .pipe(
        switchMap((res) =>
          forkJoin(
            res.results.map((pokemon) => this.#http.get<{}>(pokemon.url))
          )
        ),
        tap((pokemonInfo) => {
          const currentList = this.pokemonListSubject$.getValue();
          this.pokemonListSubject$.next([...currentList, ...pokemonInfo]);
        }),
        catchError((err) => {
          console.log(err);
          return of([])
        }),
        finalize(() => this.loadingSubject$.next(false))
      )
      .subscribe()
  }

  public fetchPokemonTypeRelations(pokemonTypes: string[]): Observable<Array<IDamageRelations>> {
    const requests = pokemonTypes.map(type => 
      this.#http.get<IPokemonTypeResponse>(`${this.#url}/type/${type}`).pipe(
        map(data => data.damage_relations)
      )
    )
    return forkJoin(requests)
  }

  get pokemonListLength() {
    return this.pokemonListSubject$.getValue().length
  }
}
