import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-by-page";


//! USERS STORE FUNCIONES PRINCIPALES QUE TENDRÁ LA APLICACIÓN

const state = {
    currentPage: 0,
    users: []
}


const loadNextPage = async () => {
    const users = await loadUsersByPage( state.currentPage +1 );
    if( users.length === 0) return; // en paginaciones, el arreglo viene vacio
    
    state.currentPage += 1; // si no hay users, dirigir a la siguiente pagina
    state.users = users;
}


const loadPreviousPage = async () => {
    if( state.currentPage === 1 ) return;

    const users = await loadUsersByPage( state.currentPage - 1  );
    state.users = users;
    state.currentPage -=1;
}


const onUserChanged = (userUpdated) => {
    let wasFound = false;

    state.users = state.users.map(user => {
        if( user.id === userUpdated.id ) {
            wasFound = true;
            return userUpdated;
        }
        return user;
    });

    // SE AGREGÓ USUARIO Y SE ACTUALIZA DIRECTAMENTE EN LA TABLA, POR ESO LA CONDICION MENOR A 10
    if ( state.users.length < 10 && !wasFound ) {
        state.users.push(userUpdated);
    }
}


const reloadPage = async () => {
    const users = await loadUsersByPage( state.currentPage );
    if( users.length === 0) { // SE EVALUA LA LONGITUD POR PAGINACION, SI ES IGUAL A 0, SE VA A LA PAGINA ANTERIOR
        await loadPreviousPage();
        return;
    }
    state.users = users;
}


export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [ ...state.users ],
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}

