import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -> Show
// CREATE -> Add Pet
// UPDATE -> Change Pet
// DELETE -> Set a pet free