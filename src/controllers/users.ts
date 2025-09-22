import mongoose from "mongoose";
import {
  createSingleUser,
  getAllUsers,
  getSingleUser,
  softDeleteUser,
  updateSingleUser,
} from "../services/users";

// Get Users
export async function getUsers(req, res) {
  const users = await getAllUsers();

  res.json(users);
}

// Get User
export async function getUser(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await getSingleUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Create User
export async function createUser(req, res) {
  const newUser = await createSingleUser(req.body);

  await newUser.save();

  res.status(201).json(newUser);
}

// Update User
export async function updateUser(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const updatedUser = await updateSingleUser(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: "Failed to update" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete User
export async function deleteUser(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const deletedUser = await softDeleteUser(id);

    if (!deleteUser) {
      return res.status(404).json({ error: "Failed to delete user" });
    }

    res.json(deletedUser);
  } catch (err) {
    console.error("Error finding user:", err);

    res.status(500).json({ error: "Internal server error" });
  }
}
