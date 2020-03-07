import {Document} from 'mongoose';
import {RoleType} from "../roles";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: RoleType;
    rolePriority?: number;
    date?: Date;
}

//Mongoose modal
export interface IDocUsers extends Document, IUser {
}