// this modal is rendered by PetShow component
// the state that controls this modal, whether the modal is open or not will live in the PetShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/PetForm'
import messages from '../shared/AutoDismissAlert/messages'

// this modal has its own props that it needs in order to open and close
// since we will be using the PetForm as well, we'll need those props

const EditPetModal = (props) => {
    const { user, show, handleClose, updatePet, msgAlert } = props

    const [pet, setPet] = useState(props.pet)

    // we'll use updatePet in our onSubmit
    const onChange = (e) => {
        e.persist()

        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PetForm 
                    pet={pet}
                    handleChange={onChange}
                    handleSubmit={null}
                    heading="Update Pet"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPetModal