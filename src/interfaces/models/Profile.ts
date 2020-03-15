import {Document} from 'mongoose';


export interface IProfile {

}

//Mongoose modal
export interface IDocProfile extends Document, IProfile {
}