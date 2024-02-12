
/**
 * 
 * @param {String|Number} id
 */

export const deleteUserByID = async ( id ) => {   
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch( url, { // POSTEAR EL NUEVO USUARIO
        method: 'DELETE',
    }); // POST
    const deleteUser = await res.json();
    // console.log({deleteUser});
    return true;
}