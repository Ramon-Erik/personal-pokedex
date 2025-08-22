import { Component, inject, OnInit, signal } from '@angular/core';
import { PokeApi } from '../../core/pokedex/poke-api';
import { PokemonList } from '../../shared/components/pokemon-list/pokemon-list';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [PokemonList, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  #pokeApiService = inject(PokeApi)
  public typesList = this.#pokeApiService.getTypesList
  public abilitiesList = this.#pokeApiService.getAbilitiesList

  ngOnInit(): void {
    this.#pokeApiService.httpTypesList$().subscribe()
    this.#pokeApiService.httpAbilitiesList$().subscribe()
  }
}
