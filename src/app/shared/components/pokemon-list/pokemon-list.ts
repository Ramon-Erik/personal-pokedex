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
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonItem, AsyncPipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  #pokeApiService = inject(PokeApi);
  public pokemonList$ = this.#pokeApiService.pokemonList$
  public loading$  = this.#pokeApiService.loading$

  public itemsPerPage = 20;
  public currentPage = 1;

  public pokemonName = signal<string>('none');
  @Input({ required: true }) set selectedFilters(text: string) {
    this.pokemonName.set(text);
  }

  public loadMorePokemons() {
    let currentLength = this.#pokeApiService.pokemonListLength
    this.#pokeApiService.fetchPokemonList({offset: currentLength, limit: 20})
    
  }

  ngOnInit(): void {
    this.#pokeApiService.fetchPokemonList({offset: 0, limit: 0})
  }
}
