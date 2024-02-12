
import { localhostUserToModel } from '../mappers/localhost-user.mapper';

import { User } from "../models/user";

/**
 * 
 * @param {String|Number} id
 * @return {Promise<User>} regresa una promera con un user como un arreglo
 */

export const getUserById = async ( id ) => {
    const url = import.meta.env.VITE_BASE_URL;
    const res = await fetch(`${url}/users/${id}`);
    
    const data = await res.json();
    const user = localhostUserToModel(data);
    return user; // USER
}

