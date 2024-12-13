import {
  Document,
  FilterQuery,
  PopulateOptions,
  Query,
  QueryOptions,
  Schema,
  Types,
  UpdateQuery,
} from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }
  findUserWithPasswordById(id: string) {
    return UserModel.findById(id).select("+password");
  }

  private findExtendedUser(
    filter: FilterQuery<IUser>,
    includePassword: boolean,
    activeOnly: boolean
  ) {
    const match = activeOnly ? { status: true } : {};
    const options = includePassword ? { select: "+password" } : {};
    return UserModel.findOne(filter, {}, options).populate({
      path: "roles",
      match,
      populate: {
        path: "permissions",
        match,
      },
    });
  }

  findExtendedUserById(
    id: string,
    includePassword: boolean = false,
    activeOnly: boolean = false
  ) {
    return this.findExtendedUser({ _id: id }, includePassword, activeOnly);
  }

  findExtendedUserByUsername(
    username: string,
    includePassword: boolean = false,
    activeOnly: boolean = false
  ) {
    return this.findExtendedUser({ username }, includePassword, activeOnly);
  }

  findUserByUsername(username: string) {
    return UserModel.findOne({ username });
  }

  findUserByRefreshToken(refreshToken: string) {
    return UserModel.findOne({ refreshToken, status: true });
  }

  updateUserRefreshToken(id: string, refreshToken: string) {
    return UserModel.findByIdAndUpdate(
      id,
      { refreshToken },
      { timestamps: false }
    );
  }

  async createUser(userData: Partial<IUser>) {
    // Kiểm tra xem tên người dùng có được cung cấp không
    if (!userData.username) {
      throw new Error("Username is required");
    }

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await this.findUserByUsername(userData.username);
    if (existingUser) {
      throw new Error(
        `User with username '${userData.username}' already exists.`
      );
    }

    try {
      // Tạo mới user, điền các giá trị mặc định nếu chưa được cung cấp
      const user = new UserModel({
        _id: new Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...userData,
      });

      await user.save(); // Lưu vào cơ sở dữ liệu

      return user; // Trả về user vừa tạo
    } catch (error) {
      throw new Error(`Error creating user: ${(error as Error).message}`);
    }
  }
}
