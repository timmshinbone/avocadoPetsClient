// PetCreate is going to render a form
// this form will build a pet object in state
// the form will submit an axios POST request when submitted
// we should send a success or failure message
// on success, redirect to the new pet show page
// on failure, component should send the message and remain visible
import { useState } from 'react'
import { createPet } from '../../api/pet'
import { createPetSuccess, createPetFailure } from '../shared/AutoDismissAlert/messages'
import PetForm from '../shared/PetForm'

const PetCreate = (props) => {
    // pull out our props for easy reference
    const { user, msgAlert } = props

    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (e) => {
        e.persist()

        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // the above is enough for string inputs
            // but we have a number and a boolean to handle
            if (e.target.type === 'number') {
                // if the target type is a number - updateValue must be a number
                updatedValue = parseInt(e.target.value)
            }

            // to handle our checkbox, we need to tell it when to send a true, and when to send a false. we can target it by the unique name(adoptable) and handle it the way checkboxes are meant to be handled.
            // a checkbox only sends the value 'checked' not the boolean we need
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            const updatedPet = { [updatedName] : updatedValue }

            return {
                ...prevPet, ...updatedPet
            }
        })
    }

    return (
        <PetForm 
            pet={pet} 
            handleChange={onChange}
            handleSubmit={null}
            heading="Add a new pet!"
        />
    )
}

export default PetCreate