// types/pokemon.ts

interface NamedAPIResource {
  name: string;
  url: string;
}

interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

interface HeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  order: number | null;
  version_group: NamedAPIResource;
}

interface Move {
  move: NamedAPIResource;
  version_group_details: MoveVersionGroupDetail[];
}

interface Cries {
  latest: string;
  legacy: string;
}

interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
    dream_world?: {
      front_default: string | null;
      front_female: string | null;
    };
    home?: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown?: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

interface Type {
  slot: number;
  type: NamedAPIResource;
}

export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: NamedAPIResource[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  sprites: Sprites;
  species: NamedAPIResource;
  stats: Stat[];
  types: Type[];
  cries?: Cries;
}