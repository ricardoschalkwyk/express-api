// Get Users

import { verify } from "../services/auth";
import { createSingleUser } from "../services/users";

// User SignIn
export async function signIn(req, res) {
  let message = "Success";

  try {
    const { payload, verified, token } = await verify(req.body);

    if (!payload) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!verified) {
      message = "Email or password is incorrect";
      res.status(401).json({ verified, message, token });
    }

    return res.json({
      verified: verified,
      message,
      token,
    });
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function registerUser(req, res) {
  const newUser = await createSingleUser(req.body);

  await newUser.save();

  res.status(201).json(newUser);
}
