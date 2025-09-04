import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { PokeApi } from '../../../core/pokedex/poke-api';
import { PokemonItem } from '../pokemon-item/pokemon-item';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonItem, AsyncPipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  #pokeApiService = inject(PokeApi);
  #pokemonList$ = this.#pokeApiService.pokemonList$

  public pokemonName = signal<string>('none');
  @Input({ required: true }) set selectedFilters(text: string) {
    this.pokemonName.set(text);
    this.filterPokemons(text)
  }

  public filteredPokemons$ = this.#pokemonList$
  public loading$  = this.#pokeApiService.loading$

  public filterPokemons(filterName: string) {
    if (filterName) {
      this.filteredPokemons$ = this.#pokemonList$.pipe(
        map(pokemon => pokemon.filter(p => p.name.includes(filterName) || p.id == parseInt(filterName)))
      )
    }
  }

  public loadMorePokemons() {
    let currentLength = this.#pokeApiService.pokemonListLength
    this.#pokeApiService.fetchPokemonList({offset: currentLength, limit: 20})
  }

  ngOnInit(): void {
    this.#pokeApiService.fetchPokemonList({offset: 0, limit: 0})
  }
}
