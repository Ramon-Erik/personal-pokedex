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

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonItem, AsyncPipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  #pokeApiService = inject(PokeApi);
  public pokemonList$ = this.#pokeApiService.pokemonList$

  public itemsPerPage = 20;
  public currentPage = 1;

  public pokemonName = signal<string>('none');
  @Input({ required: true }) set selectedFilters(text: string) {
    this.pokemonName.set(text);
  }

  ngOnInit(): void {
    this.#pokeApiService.fetchPokemonList({offset: 0, limit: 0})
  }
}
