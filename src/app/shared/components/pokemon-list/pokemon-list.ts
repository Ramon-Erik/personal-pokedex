import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { PokeApi } from '../../../core/pokedex/poke-api';
import { PokemonItem } from '../pokemon-item/pokemon-item';
import { Pagination } from '../pagination/pagination';
import { IFilters } from '../../interface/filters';
import { filter } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonItem, Pagination],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  #pokeApiService = inject(PokeApi);
  public pokemonList = this.#pokeApiService.getPokemonList;

  public itemsPerPage = 20;
  public currentPage = 1;

  public listFilters = signal<IFilters>({
    id: '',
    type: '',
    weakness: '',
    ability: '',
    height: '',
    weight: '',
  });
  @Input({ required: true }) set selectedFilters(filters: IFilters) {
    this.listFilters.set(filters);
  }

  public filteredPokemonList = computed(() => {
    const list = this.pokemonList();
    const filters = this.listFilters();

    if (!list) {
      return [];
    }
    return list.filter((pokemon) => {
      if (filters.id && !pokemon.name.includes(filters.id)) return false
      // if (filters.id && !pokemon.id.toString().includes(filters.id)) return false
      return true
    });
  });

  public slicedList = computed(() => {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredPokemonList().slice(start, end)
  })

  ngOnInit(): void {
    this.#pokeApiService.httpPokemonList$(null).subscribe();
  }
}
