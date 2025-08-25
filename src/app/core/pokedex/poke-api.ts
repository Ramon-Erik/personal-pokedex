import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { IPokemonApiRequest } from '../../shared/interface/pokemon-types-list';

@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  #http = inject(HttpClient);
  #url = 'https://pokeapi.co/api/v2';

  #setPokemonList = signal<Array<any>>([]);
  get getPokemonList() {
    return this.#setPokemonList.asReadonly();
  }
  public httpPokemonList$(range: { offset: number; limit: number } | null): Observable<any> {
    let customUrl: string
    if (range) {
      customUrl = `${this.#url}/pokemon?offset=${range?.offset}&limit=${range?.limit}`
    } else {
      customUrl = `${this.#url}/pokemon?limit=20&offset=0`
    } 
      return this.#http.get<IPokemonApiRequest>(customUrl).pipe(
        switchMap(res => {
          const requests = res.results.map(p => this.#http.get<{}>(p.url))
          return forkJoin(requests)
        }),
        tap(details => {
          console.log("detalhes adicionados na lista");
          this.#setPokemonList.set(details)
        })
      )
  }
    
  #setPokemon = signal<any>(null);
  get getPokemon() {
    return this.#setPokemon.asReadonly();
  }
  public httpPokemon$(pokemon: string): Observable<any> {
    return this.#http.get<any>(pokemon).pipe(
      shareReplay()
    )
  }
}
