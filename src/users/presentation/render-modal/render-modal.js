import modalHTML from './render-modal.html?raw';
import { getUserById } from '../../use-cases/get-user-by-id';
import { User } from '../../models/user';

import './render-modal.css'


let modal, form;
let loadedUser = {}; // TENDRÁ LA INFORMACION DE USUARIO SELECCIONADO

export const showModal = async ( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {}; // ASEGURAR QUE CUANDO SE MUESTRE EL MODAL, ESTÉ VACIO EL USUARIO CARGADO

    if(!id) return;
    const user = await getUserById(id);
    setFormValues(user);
}


export const hideModal = () => {
    modal?.classList.add('hide-modal'); // ESCONDE EL MODAL
    form?.reset(); // RESETEA EL FORMULARIO, BORRA LOS ELEMENTOS  DEL INPUT ESTABLECIDO
}


/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    // ESTABLECER VALORES DE FORMULARIO EN EL MODAL
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user; // ESTABLECER LOS VALORES DEL USUARIO EN EL USUARIO CARGADO
}


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback
 */
export const renderModal = ( element, callback ) => {
    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML; // SE AGREGA LO QUE VIENE DEL ARCHIVO .HTML
    modal.className = 'container-modal hide-modal' // NOMBRE DE CLASE A TODO EL MODALHTML

    form = modal.querySelector('form'); // OBTIENE EL FORM

    modal.addEventListener( 'click', (event) => { // ELIMINAR EL MODAL AL CLIKEAR FUERA DEL FORM
        if( event.target.className === 'container-modal' ) {
            hideModal();
        }
    });

    form.addEventListener( 'submit', async (event) => { // PRESIONA EL BUTTON SUBMIT
        event.preventDefault();  // NO ENVIAR EL POSTEO AL CLICKEAR EL SUBMIT
        const formData = new FormData( form );
        
        // PARA CAMBIAR DE TRUE A FALSE EL ISACTIVE
        loadedUser.isActive = ( form.querySelector("[name='isActive']").checked === "on" ? true : false );
        
        const userData = { ...loadedUser };
        
        for (const [key, value] of formData) {
            if(!userData['isActive']) userData['isActive'] = false;
            if(userData['isActive']) userData['isActive'] = true;
            
            if (key === 'balance') {
                userData[key] = Number(value); // ENVIAR NUMERO, ES LO QUE ESPERA EL BACKEND
                // userData[key] = +value; // OTRA OPCION DE CONVERTIR A UN NUMERO 
                continue;
            }

            userData[key] = value;
        }
        await callback( userData );

        hideModal(); // CERRAR MODAL Y RESETEAR LOS VALORES DE LOS INPUTS
    })

    element.append(modal);
}

