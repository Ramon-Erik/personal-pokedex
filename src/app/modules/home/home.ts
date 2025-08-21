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
  public filters = signal({
    id: '',
    type: "invalid",
    weakness: "invalid",
    ability: "invalid",
    height: "invalid",
    weight: "invalid"
  })

  public changeListFilters(pokeId: string, type: string, weakness: string, ability: string, height: string, weight: string,) {
    this.filters.set({id: pokeId,
type,
weakness,
ability,
height,
weight});
    
  }

  ngOnInit(): void {
    this.#pokeApiService.httpTypesList$().subscribe()
    this.#pokeApiService.httpAbilitiesList$().subscribe()
  }
}
