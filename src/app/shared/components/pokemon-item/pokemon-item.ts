import { Component, inject, Input, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokemonDialog } from '../dialogs/pokemon-dialog/pokemon-dialog';
import { IPokemon } from '../../interface/pokemon-item.interface';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.scss',
})
export class PokemonItem {
  public loading = signal(true);
  #dialog = inject(MatDialog)

  public openDialog(data: IPokemon) {
    this.#dialog.open(PokemonDialog, { data })
  }

  public pokemon = signal<IPokemon>({} as IPokemon);
  @Input({ required: true }) set pokemonData(pokemonData: IPokemon) {
    this.pokemon.set(pokemonData);
    this.loading.set(false)
  }

}
