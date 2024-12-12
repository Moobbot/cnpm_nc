import mongoose from "mongoose";
import { PermissionService } from "../repositories/permission.repository";
import { RoleService } from "../repositories/role.repository";
import { UserService } from "../repositories/user.repository";
import { Permissions } from "../enums/permissions.enum";
import { connectToDB } from "../config/mongoose";
import readline from "readline";
import bcrypt from "bcryptjs";

// Các icon hiển thị trên console
const ICONS = {
  success: "✅",
  info: "ℹ️",
  error: "❌",
  question: "❓",
};

// Hàm hỏi Yes/No
const askQuestion = (question: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${ICONS.question} ${question} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
};

// Thêm các Permission
const addPermissions = async () => {
  const add = await askQuestion("Do you want to add Permissions?");
  if (!add) {
    console.log(`${ICONS.info} Skipped adding Permissions.`);
    return;
  }

  const permissions = Object.values(Permissions).map((permission) => ({
    name: permission,
    description: `Description for ${permission}`,
  }));

  for (const permission of permissions) {
    try {
      await PermissionService.createPermission(permission);
    } catch (err) {
      console.log(
        `${ICONS.info} Permission '${permission.name}' already exists.`
      );
    }
  }
  console.log(`${ICONS.success} Permissions added or verified successfully.`);
};

// Tạo các Role
const addRoles = async () => {
  const add = await askQuestion("Do you want to add Roles?");
  if (!add) {
    console.log(`${ICONS.info} Skipped adding Roles.`);
    return;
  }

  const allPermissions = await PermissionService.findAllPermissions();
  const permissionsMap = Object.fromEntries(
    allPermissions.map((perm) => [perm.name, perm])
  );

  const roles = [
    {
      name: "Admin",
      permissions: [],
      description: "Đây là role Admin, có tất cả các quyền.",
      grantAll: true,
    },
    {
      name: "Bác Sỹ CNXN",
      permissions: [
        permissionsMap[Permissions.LIST_ALL_USERS],
        permissionsMap[Permissions.GET_USER],
        permissionsMap[Permissions.EDIT_USER],
      ],
      description: "Đây là role Bác Sỹ CNXN",
      grantAll: false,
    },
    {
      name: "KTV lấy mẫu",
      permissions: [permissionsMap[Permissions.LIST_ALL_ACCESS_HISTORY]],
      description: "Đây là role KTV lấy mẫu",
      grantAll: false,
    },
    {
      name: "KTV xét nghiệm",
      permissions: [
        permissionsMap[Permissions.LIST_ALL_PERMISSIONS],
        permissionsMap[Permissions.GET_PERMISSION],
      ],
      description: "Đây là role KTV xét nghiệm",
      grantAll: false,
    },
  ];

  for (const role of roles) {
    try {
      await RoleService.createRole(role);
    } catch (err) {
      console.log(`${ICONS.info} Role '${role.name}' already exists.`);
    }
  }
  console.log(`${ICONS.success} Roles added or verified successfully.`);
};

// Tạo các User
const addUsers = async () => {
  const add = await askQuestion("Do you want to add Users?");
  if (!add) {
    console.log(`${ICONS.info} Skipped adding Users.`);
    return;
  }

  const roles = await RoleService.findAllRoles();
  const roleMap = Object.fromEntries(roles.map((role) => [role.name, role]));

  const users = [
    {
      username: "admin_user",
      password: "123456",
      roles: [roleMap["Admin"]],
      detail_user: {
        user_code: "ADMIN001",
        name: "Admin User",
        birth_date: new Date("1980-01-01"),
        address: "Admin Address",
        gender: "Male",
      },
    },
    {
      username: "doctor_user",
      password: "123456",
      roles: [roleMap["Bác Sỹ CNXN"]],
      detail_user: {
        user_code: "DOCTOR001",
        name: "Doctor User",
        birth_date: new Date("1985-02-02"),
        address: "Doctor Address",
        gender: "Female",
      },
    },
    {
      username: "ktv_sample",
      password: "123456",
      roles: [roleMap["KTV lấy mẫu"]],
      detail_user: {
        user_code: "SAMPLE001",
        name: "Sample Technician",
        birth_date: new Date("1990-03-03"),
        address: "Technician Address",
        gender: "Male",
      },
    },
    {
      username: "ktv_test",
      password: "123456",
      roles: [roleMap["KTV xét nghiệm"]],
      detail_user: {
        user_code: "TEST001",
        name: "Testing Technician",
        birth_date: new Date("1995-04-04"),
        address: "Testing Address",
        gender: "Other",
      },
    },
  ];

  for (const user of users) {
    try {
      const existingUser = await UserService.findUserByName(user.username);
      if (existingUser) {
        console.log(`${ICONS.info} User '${user.username}' already exists.`);
        continue;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;

      await UserService.createUser(user);
      console.log(
        `${ICONS.success} User '${user.username}' added successfully.`
      );
    } catch (err: any) {
      console.error(
        `${ICONS.error} Error adding user '${user.username}':`,
        err.message
      );
    }
  }
};

// Main function
const main = async () => {
  await connectToDB();
  await addPermissions();
  await addRoles();
  await addUsers();
  console.log(`${ICONS.success} Setup completed.`);
  process.exit(0);
};

main().catch((err) => {
  console.error(`${ICONS.error} Error in setup:`, err.message);
  process.exit(1);
});
