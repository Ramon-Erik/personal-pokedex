export interface ITypeRelation {
  name: string;
  url: string;
}

export interface IDamageRelations {
  double_damage_from: ITypeRelation[];
  double_damage_to: ITypeRelation[];
  half_damage_from: ITypeRelation[];
  half_damage_to: ITypeRelation[];
  no_damage_from: ITypeRelation[];
  no_damage_to: ITypeRelation[];
}

export interface IPokemonTypeResponse {
  damage_relations: IDamageRelations;
}