export interface PokemonApiRequest {
  count: number;
  next: string;
  previous: null;
  results: Array<{ name: string; url: string }>;
}


export interface PokemonEntry {
  pokemon: { name: string; url: string };
  slot: number;
}

export interface ITypeResponse {
  pokemon: PokemonEntry[];
}