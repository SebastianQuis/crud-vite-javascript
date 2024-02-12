
//! FUNCIONES ASINCRONAS DE LA DATA

import { localhostUserToModel } from "../mappers/localhost-user.mapper";

import { User } from "../models/user";

/**
 * 
 * @param {Number} page
 * @return {Promise<User[]>} regresa una promera con un user como un arreglo
 */

export const loadUsersByPage = async ( page = 1 ) => {
    const url = import.meta.env.VITE_BASE_URL;
    const res = await fetch(`${url}/users?_page=${page}`);
    const data = await res.json();

    if(data.pages < page ) return [];

    const users = data.data.map( user => localhostUserToModel(user) ); // localhostUserToModel PORQUE USERS VA DIRETAMENTE AL STORE 
    return users;
}

