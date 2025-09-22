import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User, { TUser } from "../models/User";

export async function verify(data: TUser) {
  let token = "";

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) {
    return { user, verified: false };
  }

  if (!(await bcrypt.compare(data.password, user.password))) {
    return { user, verified: false };
  }

  let userData = user?.toObject();

  const { username, email, _id } = userData;

  const payload = {
    username,
    email,
    sub: _id,
  };

  console.log(payload);

  token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });

  return {
    verified: true,
    token,
    payload,
  };
}
