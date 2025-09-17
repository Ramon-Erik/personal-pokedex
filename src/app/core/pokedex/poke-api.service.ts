import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
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
import { PokemonApiRequest, ITypeResponse } from '../../shared/interface/pokemon-list.interface';
import { PokemonTypeResponse } from '../../shared/interface/pokemon-type-relations.interface';
import { Pokemon } from '../../shared/interface/pokemon-item.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  #http = inject(HttpClient);
  #destroyRef = inject(DestroyRef)
  #url = 'https://pokeapi.co/api/v2';

  private readonly pokemonListSubject$ = new BehaviorSubject<Pokemon[]>([]);
  public readonly pokemonList$ = this.pokemonListSubject$.asObservable();
  private readonly loadingSubject$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject$.asObservable();

  public fetchPokemonList(range: { offset: number; limit: number }) {  
    if (this.loadingSubject$.getValue()) {
      return;
    }

    const url = `${this.#url}/pokemon?offset=${range.offset}&limit=${range.limit}`;

    this.loadingSubject$.next(true);

    this.#http
      .get<PokemonApiRequest>(url)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        switchMap((res) =>
          forkJoin(
            res.results.map((pokemon) => this.#http.get<Pokemon>(pokemon.url))
          )
        ),
        tap((pokemonInfo) => {
          const currentList = this.pokemonListSubject$.getValue()
          
          const filteredPokemons = pokemonInfo.filter(newPokemon => 
            !currentList.some(pokeInfo => newPokemon.id === pokeInfo.id)
          )

          this.pokemonListSubject$.next([...currentList, ...filteredPokemons].sort((a, b) => a.id - b.id));
        }),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => this.loadingSubject$.next(false))
      )
      .subscribe();
  }

  public fetchPokemonTypeRelations(pokemonTypes: string[]): Observable<any> {
    const requests = pokemonTypes.map((type) =>
      this.#http.get<PokemonTypeResponse>(`${this.#url}/type/${type}`).pipe(
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

  public fetchPokemonsByType(type: string, start: number) {
    if (this.loadingSubject$.getValue() && type != 'Todos') {
      return;
    }
    
    this.loadingSubject$.next(true);
    const url = `${this.#url}/type/${type}`;
    const end = start < 20 ? 20 : 20 + start

    this.#http
      .get<ITypeResponse>(url)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        switchMap((res) =>
          forkJoin(
            res.pokemon.slice(0, end).map((pokemon) => this.#http.get<Pokemon>(pokemon.pokemon.url))
          )
        ),
        tap((pokemonInfo) => {
          const currentList = this.pokemonListSubject$.getValue()
          
          const filteredPokemons = pokemonInfo.filter(newPokemon => 
            !currentList.some(pokeInfo => newPokemon.id === pokeInfo.id)
          )

          this.pokemonListSubject$.next([...currentList, ...filteredPokemons].sort((a, b) => a.id - b.id));
        }),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => this.loadingSubject$.next(false))
      )
      .subscribe();

  }

  get pokemonListLength() {
    return this.pokemonListSubject$.getValue().length;
  }
}
