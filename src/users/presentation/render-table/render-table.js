import { deleteUserByID } from "../../use-cases/delete-user-by-id";
import { showModal } from "../render-modal/render-modal";

import usersStore from "../../store/users-store";

import "./render-table.css";

let table;

const createTable = () => {    
    const table = document.createElement('table'); // crear tabla
    const tableHeaders = document.createElement('thead'); // crear encabezados de tabla
    tableHeaders.innerHTML = `
        <tr>
            <th> ID </th>
            <th> Balance </th>
            <th> First name </th>
            <th> Last name </th>
            <th> Active </th>
            <th> Actions </th>
        </tr>
    `;

    const tableBody = document.createElement('tbody'); // crear body de la tabla
    table.append( tableHeaders, tableBody );
    return table;
}


// SELECCIONAR UN USUARIO Y ENVIAR AL MODAL
/**
 * 
 * @param {MouseEvent} event 
 */
const userSelectListener = ( event ) => {
    const element = event.target.closest('.select-user'); // CLICK EN BOTON CON CLASS SELECT-USER
    if (!element) return;

    const id = element.getAttribute('data-id'); // OBTENER VALOR DEL DATA-ID
    showModal(id);
}


// ELIMINAR UN USUARIO DESDEL LA TABLA CON EL BOTON DELETE
/**
 * 
 * @param {MouseEvent} event 
 */
const userDeleteListener = async ( event ) => {
    const element = event.target.closest('.delete-user'); // CLICK EN BOTON CON CLASS SELECT-USER
    if (!element) return;
    const id = element.getAttribute('data-id'); // OBTENER VALOR DEL DATA-ID

    try {
        await deleteUserByID(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page-id').innerText = usersStore.getCurrentPage();
        renderTable();
    } catch (error) {
        console.log('No se pudo eliminar el usuario, CATCH!!');
        alert(`${error}`)
    }
}




/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {
    const users = usersStore.getUsers();
    if( !table ) {
        table = createTable();
        element.append(table);
    
        // SELECCIONAR UN USUARIO
        table.addEventListener('click', ( event ) => { userSelectListener(event); });
        // ELIMINAR UN USUARIO
        table.addEventListener('click', ( event ) => { userDeleteListener(event); });
    }
        
    let tableHTML = '';
    users.forEach( user => {1
        tableHTML += `
        <tr>
            <td> ${user.id} </td11>
            <td> ${user.balance} </td>
            <td> ${user.firstName} </td>
            <td> ${user.lastName} </td>
            <td> ${user.isActive} </td>
            <td>
                <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                |
                <a href="#/" class="delete-user" data-id="${ user.id }">Delete</a>
            </td>
        </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;    
}