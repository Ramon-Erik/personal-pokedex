import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../shared/components/pokemon-list/pokemon-list';

@Component({
  selector: 'app-home',
  imports: [PokemonList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public setFilter(text: string) {
    return text.toLowerCase();
  }

  public hideTypes = signal(false)

  public pokemonTypes = [
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy',
  ];
}
