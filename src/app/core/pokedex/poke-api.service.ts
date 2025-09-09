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
import { IPokemon } from '../../shared/interface/pokemon-item.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  #http = inject(HttpClient);
  #url = 'https://pokeapi.co/api/v2';

  private readonly pokemonListSubject$ = new BehaviorSubject<IPokemon[]>([]);
  public readonly pokemonList$ = this.pokemonListSubject$.asObservable();
  private readonly loadingSubject$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject$.asObservable();

  public fetchPokemonList(range: { offset: number; limit: number }) {
    if (this.loadingSubject$.getValue()) {
      return;
    }

    const url = `${this.#url}/pokemon?offset=${range.offset}&limit=${
      range.limit
    }`;

    this.loadingSubject$.next(true);

    this.#http
      .get<IPokemonApiRequest>(url)
      .pipe(
        switchMap((res) =>
          forkJoin(
            res.results.map((pokemon) => this.#http.get<IPokemon>(pokemon.url))
          )
        ),
        tap((pokemonInfo) => {
          const currentList = this.pokemonListSubject$.getValue();
          this.pokemonListSubject$.next([...currentList, ...pokemonInfo]);
        }),
        catchError((err) => {
          console.log(err);
          return of([]);
        }),
        finalize(() => this.loadingSubject$.next(false))
      )
      .subscribe();
  }

  public fetchPokemonTypeRelations(pokemonTypes: string[]): Observable<any> {
    const requests = pokemonTypes.map((type) =>
      this.#http.get<IPokemonTypeResponse>(`${this.#url}/type/${type}`).pipe(
        map((data) => data.damage_relations),
        catchError((err) => of(null))
      )
    );
    return forkJoin(requests).pipe(
      map((demages) => {
        const no_demage = demages
          .map((d) => d?.no_damage_from.map((type) => type.name))
          .flat();

        no_demage.push(
          ...demages
            .map((d) => d?.half_damage_from.map((type) => type.name))
            .flat()
        );

        const damagesFrom = demages
          .map((res) => res?.double_damage_from.map((d) => d?.name))
          .flat()
          .filter((val, i, arr) => {
            return i > arr.indexOf(val, i + 1) && !no_demage.includes(val);
          });

        return damagesFrom;
      })
    );
  }

  get pokemonListLength() {
    return this.pokemonListSubject$.getValue().length;
  }
}
