import usersStore from "../../store/users-store";
import { renderTable } from "../render-table/render-table";
import "./render-buttons.css";


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {
    const space = document.createElement( 'br' );

    const previousButton = document.createElement( 'button' );
    previousButton.innerHTML = '< Prev ';
    
    const nextButton = document.createElement( 'button' );
    nextButton.innerHTML = ' Next >';

    const currentPageLabel = document.createElement( 'label' );
    currentPageLabel.id = 'current-page-id';
    currentPageLabel.innerHTML = usersStore.getCurrentPage();

    element.append( space, previousButton, currentPageLabel, nextButton );


    nextButton.addEventListener('click', async () => {
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });
    
    previousButton.addEventListener('click', async () => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });

    
}

