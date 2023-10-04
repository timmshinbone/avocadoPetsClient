import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -> Show
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}

// CREATE -> Add Pet
// UPDATE -> Change Pet
// DELETE -> Set a pet free