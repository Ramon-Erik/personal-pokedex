import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../shared/components/pokemon-list/pokemon-list';
import { FormsModule } from '@angular/forms';
import { ListFilter } from '../../shared/interface/list-filter';

@Component({
  selector: 'app-home',
  imports: [PokemonList, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public setFilter(text: string) {
    return text.toLowerCase();
  }

  public hideTypes = signal(false);

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

  public filters = signal<ListFilter>({
    name: '',
    type: 'Selecionar',
  });

  public updateFilters(updatedValue: Partial<ListFilter>) {
    this.filters.set({
      ...this.filters(),
      ...updatedValue,
    });
  }

  public clearFilters() {
    this.filters.set({
      name: '',
      type: 'Selecionar',
    });
  }
}
