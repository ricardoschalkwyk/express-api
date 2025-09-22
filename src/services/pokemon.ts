import Api from "../api/index";
import type { Pokemon } from "../types/pokemon";

export async function fetchPokemonByIdOrName(
  idOrName: string
): Promise<Pokemon | null> {
  const response = await Api.get(`/pokemon/${idOrName}/`);

  return response;
}

export async function fetchPokemonFormByIdOrName<T>(idOrName: string) {
  const response = await Api.get(`/pokemon-form/${idOrName}/`);

  return response;
}
