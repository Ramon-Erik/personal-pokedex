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
  public pokemonListLentgh = 20
  public filteredListLength = 0
  public lastFilteredListLength = 0

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
          this.filteredListLength = filteredList.length
          
          if (0 < filteredList.length && filteredList.length < 20 && filters.type != 'Todos') {
            this.lastFilteredListLength = 20 - filteredList.length
            console.log('ultimo: ', this.lastFilteredListLength);
            // console.log('quantidade de filtrados: ', filteredList.length);
            
            this.#pokeApiService.fetchPokemonsByType(filters.type, filteredList.length)
          }
        })
      );
    }
  }

  public loadMorePokemons() {
    let currentLength = this.#pokeApiService.pokemonListLength;
    this.pokemonListLentgh = currentLength + 20
    if (this.listFilters().type != 'Todos') {
      this.#pokeApiService.fetchPokemonsByType(this.listFilters().type, this.filteredListLength)

      this.lastFilteredListLength += 20
    } else {
      console.log(currentLength, this.filteredListLength, this.lastFilteredListLength) ;
      const unfilteredPage = currentLength - this.lastFilteredListLength
      console.log(unfilteredPage);
      this.#pokeApiService.fetchPokemonList({ offset: unfilteredPage, limit: 20 });
      this.lastFilteredListLength = 0
    }
  }

  ngOnInit(): void {
    this.#pokeApiService.fetchPokemonList({ offset: 0, limit: 0 });
  }
}
