import { Component, inject, Input, OnInit } from '@angular/core';
import { PokeApi } from '../../../core/pokedex/poke-api';
import { PokemonItem } from "../pokemon-item/pokemon-item";

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonItem],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  // @Input() filters: null

  #pokeApiService = inject(PokeApi)

  public pokemonList = this.#pokeApiService.getPokemonList

  public next() {
    console.log('next');

  }

  public prev() {
    console.log('prev');
    
  }

  ngOnInit(): void {
    this.#pokeApiService.httpPokemonList$(null).subscribe()
  }
}
