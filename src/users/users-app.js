
import { SaveAndUpdateUser } from './use-cases/save-updated-user';
import { renderModal } from './presentation/render-modal/render-modal';
import { renderTable } from './presentation/render-table/render-table';
import { renderButtons } from './presentation/render-button/render-buttons';
import { renderFloatButton } from './presentation/render-float-button/render-float-button';

import userStore from './store/users-store';

//! FUNCION PRINCIPAL PARA QUE LA APLICACIÓN COMIENCE

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async ( element ) => {
    element.innerHTML = 'Loading...';
    await userStore.loadNextPage();
    element.innerHTML = '';

    renderTable(element);
    renderButtons(element);
    renderFloatButton(element);
    renderModal(element, async ( likeUser ) => {
        const user = await SaveAndUpdateUser(likeUser); // CAPTANDO EL USUARIO MODIFICADO O GRABADO
        userStore.onUserChanged(user); // SE AGREGÓ O MODIFICÓ EL USUARIO
        renderTable(); // RENDERIZANDO LA DATA EN LA TABLA
    });
}