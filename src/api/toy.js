import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE -> Add Toy
// '/toys/:petId'
export const createToy = (petId, newToy) => {
    return axios({
        url: `${apiUrl}/toys/${petId}`,
        method: 'POST',
        data: { toy: newToy }
    })
}

// UPDATE -> Change Pet
// '/toys/:petId/:toyId'
export const updateToy = (user, petId, updatedToy) => {
    return axios({
        url: `${apiUrl}/toys/${petId}/${updatedToy._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { toy: updatedToy }
    })
}

// DELETE -> Set a pet free
// '/toys/:petId/:toyId'
export const removeToy = (user, petId, toyId) => {
    return axios({
        url: `${apiUrl}/toys/${petId}/${toyId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}