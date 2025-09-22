import express from "express";

import indexRouter from "../index";
import pokemonRouter from "./pokemon";
import usersRouter from "./users";
import auth from "./auth";

const router = express.Router();

router.use("/", indexRouter);
router.use("/users", usersRouter);
router.use("/pokemon", pokemonRouter);
router.use("/auth", auth);

export default router;
