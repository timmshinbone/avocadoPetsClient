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

// to redirect to a different component(page) we can use a hook from react-router
import { useNavigate } from 'react-router-dom'

const PetCreate = (props) => {
    // pull out our props for easy reference
    const { user, msgAlert } = props

    // to utilize the navigate hook from react-router-dom
    const navigate = useNavigate()

    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (e) => {
        // e is the placeholder for event
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
            
            // build the pet object, grab the attribute name from the field and assign it the respective value.
            const updatedPet = { [updatedName] : updatedValue }

            // keep all the old pet stuff and add the new pet stuff(each keypress)
            return {
                ...prevPet, ...updatedPet
            }
        })
    }

    const onSubmit = (e) => {
        // we're still using a form - the default behavior of a form is to refresh the page
        e.preventDefault()

        // we're making an api call here
        // so we want to handle the promise with then and catch
        // first we want to send our create request
        createPet(user, pet)
            // then navigate the user to the show page if successful
            .then(res => { navigate(`/pets/${res.data.pet.id}`)})
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createPetSuccess,
                    variant: 'success'
                })
            })
            // if it fails, keep the user on the create page and send a message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createPetFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <PetForm 
            pet={pet} 
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new pet!"
        />
    )
}

export default PetCreate