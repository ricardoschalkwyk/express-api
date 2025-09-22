import { hashPassword } from "../utils";
import User, { TUser } from "../models/User";

export async function getAllUsers() {
  return await User.find();
}

export async function getSingleUser(id: string) {
  try {
    return await User.findById(id);
  } catch (err) {
    console.error("Error finding user:", err);

    throw err;
  }
}

export async function createSingleUser(data: TUser) {
  const encryptedPassword = await hashPassword(data.password);

  const newData = {
    ...data,

    password: encryptedPassword,
  };

  const newUser = new User(newData);

  return newUser;
}

export async function updateSingleUser(id: string, data: TUser) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      return null;
    }

    const { password, ...rest } = updatedUser?.toObject();

    return rest;
  } catch (err) {
    console.error("Error finding user:", err);

    throw err;
  }
}

export async function softDeleteUser(id: string) {
  try {
    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    )
      .select("+isDeleted")
      .select("+deletedAt");

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser;
  } catch (error) {
    console.error("Error soft deleting user:", error);

    throw error;
  }
}
