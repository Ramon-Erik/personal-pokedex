export interface TypeRelation {
  name: string;
  url: string;
}

export interface DamageRelations {
  double_damage_from: TypeRelation[];
  double_damage_to: TypeRelation[];
  half_damage_from: TypeRelation[];
  half_damage_to: TypeRelation[];
  no_damage_from: TypeRelation[];
  no_damage_to: TypeRelation[];
}

export interface PokemonTypeResponse {
  damage_relations: DamageRelations;
}