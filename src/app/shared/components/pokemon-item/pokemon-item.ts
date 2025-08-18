import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PokeApi } from '../../../core/pokedex/poke-api';

@Component({
  selector: 'app-pokemon-item',
  imports: [],
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.scss',
})
export class PokemonItem implements OnInit {
  #apiService = inject(PokeApi);

  public loading = signal(true);
  public pokemon = signal<any>(null);
  @Input({ required: true }) set pokemonUrl(url: string) {
    this.pokemon.set(url);
  }

  ngOnInit(): void {
    this.#apiService.httpPokemon$(this.pokemon()).subscribe((res) => {
      this.pokemon.set(res);
      this.loading.set(false)
    });
  }
}
