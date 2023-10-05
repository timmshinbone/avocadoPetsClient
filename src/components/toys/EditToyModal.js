// this modal is rendered by ToyShow component
// the state that controls this modal, whether the modal is open or not will live in the ToyShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import { updateToySuccess, updateToyFailure } from '../shared/AutoDismissAlert/messages'
import { updateToy } from '../../api/toy'
// this modal has its own props that it needs in order to open and close
// since we will be using the ToyForm as well, we'll need those props

const EditToyModal = (props) => {
    const { user, pet, show, handleClose, msgAlert, triggerRefresh } = props

    const [toy, setToy] = useState(props.toy)

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
        updateToy(user, pet._id, toy)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: updateToySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: updateToyFailure,
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
                    heading="Update the Toy"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditToyModal