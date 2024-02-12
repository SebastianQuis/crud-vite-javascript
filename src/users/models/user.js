
//! SE CREA EL MODELO, DONDE SE HACEN LOS PARSEOS DEL BACKEND COMO 
//! PARA FIRST_NAME ES EN LOS MAPPERS.

export class User {

    /**
     * 
     * @param {Like<Object>} userDataLike 
     */

    constructor({ id, isActive, balance, avatar, firstName, lastName, gender }) {
        this.id = id,
        this.isActive = isActive,
        this.balance = balance,
        this.avatar = avatar,
        this.firstName = firstName,
        this.lastName = lastName,
        this.gender = gender
    }

}

