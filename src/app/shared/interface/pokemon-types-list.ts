export interface IPokemonTypesList {
  count: number;
  next: string;
  previous: null;
  results: Array<{ name: string; url: string }>;
}
