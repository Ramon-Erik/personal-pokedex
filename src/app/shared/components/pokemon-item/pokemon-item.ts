import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PokeApi } from '../../../core/pokedex/poke-api';

@Component({
  selector: 'app-pokemon-item',
  imports: [],
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.scss',
})
export class PokemonItem {
  #apiService = inject(PokeApi);
  public loading = signal(true);

  public pokemon = signal<any>(null);
  @Input({ required: true }) set pokemonData(pokemonData: any) {
    
    this.pokemon.set(pokemonData);
    this.loading.set(false)
  }

}
