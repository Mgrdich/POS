import * as express from "express";
import {
    register,
    login,
    currentUser,
    registerUser,
    getUsers,
    changePassword,
    editUser,
    deleteUser, getUsersChat, getUsersRole
} from "../controllers/users";
import {isAuth,isAuthorized} from "../middlewares/authorisation";
import {ROLES_SUPER_ADMIN_MANAGER, ROLES_SUPER_ADMIN_MANAGER_CASHIER} from "../roles";
import {
    changePasswordValidation, deleteUserValidation,
    editUserValidation,
    registerUserValidation,
    registerValidation, usersRoleValidation
} from "../validations/users";

const router = express.Router();

router.get("/",isAuth(),isAuthorized(ROLES_SUPER_ADMIN_MANAGER),getUsers);

router.get("/role/:role",isAuth(),isAuthorized(ROLES_SUPER_ADMIN_MANAGER_CASHIER),usersRoleValidation,getUsersRole);

router.get("/chat",isAuth(),getUsersChat);

router.put("/register", registerValidation, register);

router.post("/login", login);

router.put('/register-user',isAuth(),isAuthorized(ROLES_SUPER_ADMIN_MANAGER),registerUserValidation,registerUser);

router.put('/edit-user',isAuth(),isAuthorized(ROLES_SUPER_ADMIN_MANAGER),editUserValidation,editUser);

router.patch('/change-password',isAuth(),changePasswordValidation,changePassword);

router.get("/current", isAuth(),isAuthorized(ROLES_SUPER_ADMIN_MANAGER),currentUser);

router.delete('/:id',isAuth(),isAuthorized(ROLES_SUPER_ADMIN_MANAGER),deleteUserValidation,deleteUser);

export default router;