import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { IPokemonTypesList } from '../../shared/interface/pokemon-types-list';

@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  #http = inject(HttpClient);
  #url = 'https://pokeapi.co/api/v2';

  #setTypesList = signal< IPokemonTypesList | null>(null);
  get getTypesList() {
    return this.#setTypesList.asReadonly();
  }
  public httpTypesList$(): Observable<IPokemonTypesList> {
    this.#setTypesList.set(null);
    return this.#http.get<IPokemonTypesList>(`${this.#url}/type/`).pipe(
      shareReplay(),
      tap((res) => this.#setTypesList.set(res))
    );
  }
}
