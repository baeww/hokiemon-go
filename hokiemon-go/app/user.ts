import { ObjectId } from "mongodb";

export default interface User {
    name: string;
    birthday: number;
    username: string;
    password: string;
    id?: ObjectId;
}