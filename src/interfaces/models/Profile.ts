import {Document} from 'mongoose';


export interface IProfile {

}

//Mongoose modal
export interface IDocIProfile extends Document, IProfile {
}