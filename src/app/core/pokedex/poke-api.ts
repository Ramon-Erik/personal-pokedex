import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { IPokemonApiRequest } from '../../shared/interface/pokemon-types-list';

@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  #http = inject(HttpClient);
  #url = 'https://pokeapi.co/api/v2';

  private readonly pokemonListSubject$ = new BehaviorSubject<Array<any>>([])
  public readonly pokemonList$ = this.pokemonListSubject$.asObservable()
  public fetchPokemonList(range: {offset: number, limit: number}) {
    const url = `${this.#url}/pokemon?offset=${range.offset}&limit=${range.limit}`

    return this.#http.get<IPokemonApiRequest>(url).pipe(
      switchMap(res => {
        const requests = res.results.map(pokemon => this.#http.get<{}>(pokemon.url)) 
        return forkJoin(requests)
      }),
      tap(pokemonInfo => this.pokemonListSubject$.next(pokemonInfo))
    )
  }
}