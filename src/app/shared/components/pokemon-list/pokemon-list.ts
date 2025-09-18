import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PokeApi } from '../../../core/pokedex/poke-api.service';
import { PokemonItem } from '../pokemon-item/pokemon-item';
import { AsyncPipe } from '@angular/common';
import { map, tap } from 'rxjs';
import { ListFilter } from '../../interface/list-filter.interface';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonItem, AsyncPipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  #pokeApiService = inject(PokeApi);
  #pokemonList$ = this.#pokeApiService.pokemonList$;

  public listFilters = signal<ListFilter>({} as ListFilter);
  @Input({ required: true }) set selectedFilters(filters: ListFilter) {
    this.listFilters.set(filters);
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
              ((p.name.includes(filters.name.toLowerCase()) ||
                p.id == parseInt(filters.name)) &&
                (filters.type != "Todos" ?  
                p.types
                  .map((type) => type.type.name)
                  .includes(filters.type.toLowerCase())
                : true))
          )
        ),
        tap(filteredList => {
          this.typeRequestStart = filteredList.length
          
          if (filteredList.length < 20 && filters.type != 'Todos') {
            this.#pokeApiService.fetchPokemonsByType(filters.type, filteredList.length)
            this.increaseListLength(20 - this.typeRequestStart)
          }
        })
      );
    }
  }

  public pokemonListLentgh = 20
  public searchOffset = 0
  public typeRequestStart = 0

  private increaseListLength(amount: number) {
    let currentLength = this.#pokeApiService.pokemonListLength;
    this.pokemonListLentgh = currentLength + amount
  }

  public loadMorePokemons() {
    if (this.listFilters().type != 'Todos') {
      this.#pokeApiService.fetchPokemonsByType(this.listFilters().type, this.typeRequestStart)
    } else {
      this.#pokeApiService.fetchPokemonList({ offset: this.searchOffset, limit: 20 });
      this.searchOffset += 20
    }
    this.increaseListLength(20)
  }

  ngOnInit(): void {
    this.#pokeApiService.fetchPokemonList({ offset: this.searchOffset, limit: 20 });
    this.searchOffset += 20
  }
}
