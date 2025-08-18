import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-pokemon-item',
  imports: [],
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.scss'
})
export class PokemonItem {
  public pokemon = signal<string | null>(null)
  @Input({ required: true }) set pokemonUrl(url: string) {
    this.pokemon.set(url)
  } 
}
