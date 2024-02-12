
import { showModal } from "../render-modal/render-modal";
import "./render-float-button.css";

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const renderFloatButton = ( element ) => {
    const button = document.createElement( 'button' );
    button.innerHTML = '+';
    button.className = 'float-button-add';

    element.append(button);

    button.addEventListener('click', () => {
        showModal();
    });
} 



// FLOAT BUTTON REUTILIZABLE, EL CSS QUEDA IGUAL, SE DEBERÍA OPTIMIZAR

// /**
//  * 
//  * @param {HTMLDivElement} element 
//  * @param {() => void} callback 
//  */
// export const typeRenderFloatButon = (element, callback) => {
//     const button = document.createElement( 'button' );
//     button.innerHTML = 'Agregar user';
//     button.className = 'float-button-add';

//     element.append(button);

//     button.addEventListener('click', () => {
//          if (!callback) return;
//          callback();
//     });
// }