import {Document} from 'mongoose';
import {RoleType} from "../../utilities/roles";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: RoleType;
    date?: Date;
}

//Mongoose modal
export interface IDocUser extends Document, IUser {
}