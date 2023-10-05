import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

import { Container, Card, Button } from 'react-bootstrap'

// we'll need to import an api function to grab an individual pet
import { getOnePet } from '../../api/pet'

import messages from '../shared/AutoDismissAlert/messages'

// we're going to use route parameters to get the id of the pet we're trying to retrieve from the server.
// then we use that id with our api call function
// when we finally retrieve the pet, render the details on the screen

const PetShow = (props) => {
    const [pet, setPet] = useState(null)

    // we need to pull the id from the url
    // localhost:3000/pets/<pet_id>
    // to retrieve our id, we can use something from react-router-dom called useParams
    // this is called id, because that's how it is declared in our Route component in App.js
    const { id } = useParams()
    const { user, msgAlert } = props

    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pet',
                    message: messages.showPetsFailure,
                    variant: 'danger'
                })
            })
    }, [])

    if(!pet) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
                <Card>
                    <Card.Header>{ pet.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Age: {pet.age}</small><br/>
                            <small>Type: {pet.type}</small><br/>
                            <small>
                                Adoptable: {pet.adoptable ? 'yes' : 'no'}
                            </small><br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            pet.owner && user && pet.owner._id === user._id
                            ?
                            <>
                                <Button className="m-2" variant="warning">
                                    Edit
                                </Button>
                                <Button className="m-2" variant="danger">
                                    Delete
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default PetShow