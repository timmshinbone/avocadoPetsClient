// this modal is rendered by PetShow component
// the state that controls this modal, whether the modal is open or not will live in the PetShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import { createToySuccess, createToyFailure } from '../shared/AutoDismissAlert/messages'
import { createToy } from '../../api/toy'
// this modal has its own props that it needs in order to open and close
// since we will be using the ToyForm as well, we'll need those props

const NewToyModal = (props) => {
    const { pet, show, handleClose, msgAlert, triggerRefresh } = props

    const [toy, setToy] = useState({})

    // we'll use updatePet in our onSubmit
    const onChange = (e) => {
        e.persist()

        setToy(prevToy => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }

            const updatedToy = { [updatedName] : updatedValue }

            return {
                ...prevToy, ...updatedToy
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call -> createToy
        createToy(pet._id, toy)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: createToySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createToyFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${pet.name} a toy!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewToyModal