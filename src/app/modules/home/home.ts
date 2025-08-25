import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../shared/components/pokemon-list/pokemon-list';

@Component({
  selector: 'app-home',
  imports: [PokemonList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public setFilter(text: string) {
    return text.toLowerCase()
  }
}
