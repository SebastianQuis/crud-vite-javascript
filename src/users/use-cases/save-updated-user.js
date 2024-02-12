//! CREAR Y ACTUALIZAR USUARIO
import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalhost } from "../mappers/user-localhost.mapper";

import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} userLike 
 */

export const SaveAndUpdateUser = async ( userLike ) => {
    const user = new User( userLike );
    
    // if( !user.firstName || !user.lastName ) throw 'El nombre y apellido son requeridos';
    if( !user.firstName || !user.lastName ) alert('El nombre y apellido son requeridos');

    const userToSave = userModelToLocalhost(user); // MODELAR COMO ESPERA EL BACKEND
    let newUser;
    if (user.id) {
        newUser = await updatedUser(userToSave);
    } else {
        newUser = await createUser(userToSave);
    }
    
    return localhostUserToModel(newUser); // localhostUserToModel PORQUE ESTO SE MANDARÁ AL DB.JSON LOCAL 
}


/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async ( user ) => {   
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch( url, { // POSTEAR EL NUEVO USUARIO
        method: 'POST',
        body: JSON.stringify(user),
        headers: headersType,
    }); // POST
    const newUser = await res.json();
    return newUser;
}


/**
 * 
 * @param {Like<User>} user 
 */
const updatedUser = async ( user ) => {   
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch( url, { // POSTEAR EL NUEVO USUARIO
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: headersType,
    }); // POST
    const updatedUser = await res.json();
    return updatedUser;
}


const headersType = {
    'Content-Type': 'application/json'
}