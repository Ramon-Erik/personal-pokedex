import { Component, inject, Input, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokemonDialog } from '../dialogs/pokemon-dialog/pokemon-dialog';
import { Pokemon } from '../../interface/pokemon-item.interface';

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

  public openDialog(data: Pokemon) {
    this.#dialog.open(PokemonDialog, { data })
  }

  public pokemon = signal<Pokemon>({} as Pokemon);
  @Input({ required: true }) set pokemonData(pokemonData: Pokemon) {
    this.pokemon.set(pokemonData);
    this.loading.set(false)
  }

}
