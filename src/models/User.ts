import mongoose, { InferSchemaType, Query } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    select: false,
    default: false,
  },
  deletedAt: {
    type: Date,
    select: false,
    default: null,
  },
});

function excludeDeletedMiddleware(this: Query<any, any>) {
  this.where({ isDeleted: false });
}

userSchema.pre<Query<any, any>>("find", excludeDeletedMiddleware);
userSchema.pre<Query<any, any>>("findOne", excludeDeletedMiddleware);

const User = mongoose.model("User", userSchema);

export type TUser = InferSchemaType<typeof userSchema>;

export default User;
