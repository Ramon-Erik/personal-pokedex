import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IPokemon } from '../../../interface/pokemon-item.interface';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokeApi } from '../../../../core/pokedex/poke-api';
import { IDamageRelations } from '../../../interface/pokemon-type-relations';

@Component({
  selector: 'app-pokemon-dialog',
  imports: [MatDialogModule, MatProgressBarModule],
  templateUrl: './pokemon-dialog.html',
  styleUrl: './pokemon-dialog.scss'
})
export class PokemonDialog implements OnInit {
  #pokeApiService = inject(PokeApi);

  constructor(
    private _dialogRef: MatDialogRef<PokemonDialog>,
    @Inject(MAT_DIALOG_DATA) private _data: IPokemon) {
  }

  public getPokemon = signal<IPokemon>({} as IPokemon)

  public closeModal() {
    this._dialogRef.close()
  }

  private maxStats = {
    'hp': 255,
    'attack': 190,
    'defense': 230,
    'special-attack': 194,
    'special-defense': 230,
    'speed': 200
  };

  public calculateStatsPercentage(stats: number, nameStats: string): number {
    const maxStat = this.maxStats[nameStats as keyof typeof this.maxStats] || 100
    return (stats / maxStat) * 100
  }

  public getPokemonTypes(pokemon: IPokemon) {
    return pokemon.types.map(type => type.type.name)
  }

  public getPokemonWeaknesses(pokemonTypeRelations: IDamageRelations[]) {
    const damagesFrom = pokemonTypeRelations.map(res => res.double_damage_from)
    console.log(damagesFrom);
    
  }

  ngOnInit(): void {
    this.getPokemon.set(this._data)
    this.#pokeApiService.fetchPokemonTypeRelations(this.getPokemonTypes(this.getPokemon())).subscribe(res => this.getPokemonWeaknesses(res)
    )
  }

}
