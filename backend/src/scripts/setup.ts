import { validateEnv } from "../config/env.config";
import { connectToDB } from "../config/mongoose";
import { PermissionModel } from "../models/permission.model";
import { Permissions } from "../enums/permissions.enum";
import { RoleModel } from "../models/role.model";
import { UserModel } from "../models/user.model";
import rootRouter from "../routes/index.route";
import { getRoutes } from "./extractRoutes";
import readline from "readline";
import bcrypt from "bcryptjs";
import { disconnect } from "mongoose";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123456";
const ADMIN_NAME = "Admin";

const askQuestion = (query: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans);
        })
    );
};

const main = async () => {
    try {
        validateEnv();
        await connectToDB();

        const answer = await askQuestion(
            "Bạn có muốn xóa sạch dữ liệu hiện có trước khi thiết lập? (y/n): "
        );

        if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
            // Xóa sạch các collection
            await PermissionModel.deleteMany({});
            await RoleModel.deleteMany({});
            await UserModel.deleteMany({});
            console.log("🗑️  Đã xóa sạch dữ liệu hiện có.");
        } else {
            console.log(
                "⚠️  Không xóa dữ liệu hiện có. Script sẽ tiếp tục thêm mới các mục cần thiết."
            );
        }

        // Thêm các Permission vào DB
        const permissionsList = Object.values(Permissions);

        let permissionDocs: { [key: string]: any } = {};

        for (const perm of permissionsList) {
            const existingPerm = await PermissionModel.findOne({ name: perm });

            if (!existingPerm) {
                const newPerm = await PermissionModel.create({ name: perm });
                permissionDocs.perm = newPerm;
                console.log(`✅ Đã thêm Permission "${perm}"`);
            } else {
                console.log(`⚠️ Permission "${perm}" đã tồn tại`);
                permissionDocs.perm = existingPerm;
            }
        }

        console.log("✅ Đã thêm tất cả các Permission");

        const adminRole = new RoleModel({
            name: "ADMIN",
            grantAll: true,
        });
        await adminRole.save();
        console.log('✅ Đã tạo Role "ADMIN" với grantAll=true');

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        const adminUser = new UserModel({
            username: ADMIN_USERNAME,
            password: hashedPassword,
            name: ADMIN_NAME,
            roles: [adminRole._id],
            status: true,
        });
        await adminUser.save();
        console.log(`✅ Đã tạo tài khoản admin: ${ADMIN_USERNAME}`);

        console.log("🎉 Hoàn thành quá trình thiết lập");
    } catch (error) {
        console.error("❌ Lỗi trong quá trình thiết lập:", error);
    } finally {
        await disconnect();
        console.log("🔌 Ngắt kết nối MongoDB");
    }
};

main();
