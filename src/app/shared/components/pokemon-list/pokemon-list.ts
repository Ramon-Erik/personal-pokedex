import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PokeApi } from '../../../core/pokedex/poke-api';
import { PokemonItem } from '../pokemon-item/pokemon-item';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { ListFilter } from '../../interface/list-filter';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonItem, AsyncPipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  #pokeApiService = inject(PokeApi);
  #pokemonList$ = this.#pokeApiService.pokemonList$;

  public pokemonName = signal<ListFilter>({} as ListFilter);
  @Input({ required: true }) set selectedFilters(filters: ListFilter) {
    this.pokemonName.set(filters);
    this.filterPokemons(filters);
  }

  public filteredPokemons$ = this.#pokemonList$;
  public loading$ = this.#pokeApiService.loading$;

  public filterPokemons(filters: ListFilter) {
    
    if (filters) {
      this.filteredPokemons$ = this.#pokemonList$.pipe(
        map((pokemon) =>
          pokemon.filter(
            (p) => 
              ((p.name.includes(filters.name) ||
                p.id == parseInt(filters.name)) &&
                (filters.type != "Todos" ?  
                p.types
                  .map((type) => type.type.name)
                  .includes(filters.type.toLowerCase())
                : true))
            
          )
        )
      );
    }
  }

  public loadMorePokemons() {
    let currentLength = this.#pokeApiService.pokemonListLength;
    this.#pokeApiService.fetchPokemonList({ offset: currentLength, limit: 20 });
  }

  ngOnInit(): void {
    this.#pokeApiService.fetchPokemonList({ offset: 0, limit: 0 });
  }
}
