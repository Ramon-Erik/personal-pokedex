import { Component, inject, OnInit } from '@angular/core';
import { PokeApi } from '../../core/pokedex/poke-api';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  #pokeApiService = inject(PokeApi)
  public typesList = this.#pokeApiService.getTypesList

  ngOnInit(): void {
    this.#pokeApiService.httpTypesList$().subscribe()
  }
}
