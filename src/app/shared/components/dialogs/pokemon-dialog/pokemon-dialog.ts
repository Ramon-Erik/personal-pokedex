import { Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IPokemon } from '../../../interface/pokemon-item.interface';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pokemon-dialog',
  imports: [MatDialogModule, MatProgressBarModule],
  templateUrl: './pokemon-dialog.html',
  styleUrl: './pokemon-dialog.scss'
})
export class PokemonDialog implements OnInit{
  constructor(
    private _dialogRef: MatDialogRef<PokemonDialog>,
    @Inject(MAT_DIALOG_DATA) private _data: IPokemon) {
  }

  public getPokemon = signal<IPokemon>({} as IPokemon)

  public closeModal() {
    this._dialogRef.close()
  }
  
  ngOnInit(): void {
    this.getPokemon.set(this._data)
    console.log(this.getPokemon());
  }

}
