import express from "express";
import {
  fetchPokemonByIdOrName,
  fetchPokemonFormByIdOrName,
} from "../../services/pokemon";

const router = express.Router();

/* GET pokemon listing. */
router.get("/:idOrName", async (req, res, next) => {
  const pokemon = await fetchPokemonByIdOrName(req.params.idOrName);

  if (!pokemon) {
    res.status(404).json({ error: "This is Broken" });

    return;
  }

  const pokemonForm = await fetchPokemonFormByIdOrName(pokemon.id.toString());

  const data = {
    form: pokemonForm.form_name,
    name: pokemon?.name ?? "",
  };

  res.status(200).json(data);
});

export default router;
