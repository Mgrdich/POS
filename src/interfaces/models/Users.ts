import {Document} from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: 'superAdmin'|'admin'|'manager'|'employee'|'kitchen';
    date?: Date;
}

//Mongoose modal
export interface IDocUser extends Document, IUser {
}