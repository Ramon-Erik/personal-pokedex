export interface PokemonApiRequest {
  count: number;
  next: string;
  previous: null;
  results: Array<{ name: string; url: string }>;
}
