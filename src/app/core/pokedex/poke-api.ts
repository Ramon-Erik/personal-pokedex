import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { IPokemonApiRequest } from '../../shared/interface/pokemon-types-list';

@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  #http = inject(HttpClient);
  #url = 'https://pokeapi.co/api/v2';

  #setTypesList = signal<IPokemonApiRequest | null>(null);
  get getTypesList() {
    return this.#setTypesList.asReadonly();
  }
  public httpTypesList$(): Observable<IPokemonApiRequest> {
    this.#setTypesList.set(null);
    return this.#http.get<IPokemonApiRequest>(`${this.#url}/type/`).pipe(
      shareReplay(),
      tap(res => this.#setTypesList.set(res))
    );
  }

  #setAbilitiesList = signal<IPokemonApiRequest | null>(null);
  get getAbilitiesList() {
    return this.#setAbilitiesList.asReadonly();
  }
  public httpAbilitiesList$(): Observable<IPokemonApiRequest> {
    this.#setAbilitiesList.set(null);
    return this.#http.get<IPokemonApiRequest>(`${this.#url}/ability/`).pipe(
      shareReplay(),
      tap((res) => this.#setAbilitiesList.set(res))
    );
  }

  #setPokemonList = signal<IPokemonApiRequest | null>(null);
  get getPokemonList() {
    return this.#setPokemonList.asReadonly();
  }
  public httpPokemonList$(range: { offset: number; limit: number } | null): Observable<IPokemonApiRequest> {
    let customUrl: string
    if (range) {
      customUrl = `${this.#url}/pokemon?$offset=${range?.offset}&limit=${range?.limit}`
    } else {
      customUrl = `${this.#url}/pokemon`
    } 
    return this.#http.get<IPokemonApiRequest>(customUrl).pipe(
      shareReplay(),
      tap(res => this.#setPokemonList.set(res))
    )
  }

    
  #setPokemon = signal<any>(null);
  get getPokemon() {
    return this.#setPokemon.asReadonly();
  }
  public httpPokemon$(pokemon: string): Observable<any> {
    return this.#http.get<any>(pokemon)
  }
}
