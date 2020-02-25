import {Document} from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: string;
    avatar?: string;
    date?: Date;
}

//Mongoose modal
export interface IDocUser extends Document, IUser {
}