import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import EditPetModal from './EditPetModal'
import ToyShow from '../toys/ToyShow'
import { useNavigate } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

// we'll need to import an api function to grab an individual pet
import { getOnePet, updatePet, removePet } from '../../api/pet'

import { showPetsFailure, showPetsSuccess, removePetSuccess, removePetFailure } from '../shared/AutoDismissAlert/messages'

// we're going to use route parameters to get the id of the pet we're trying to retrieve from the server.
// then we use that id with our api call function
// when we finally retrieve the pet, render the details on the screen

const toyCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const PetShow = (props) => {
    const [pet, setPet] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    // this is a boolean that we can alter to trigger a page re-render
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    // we need to pull the id from the url
    // localhost:3000/pets/<pet_id>
    // to retrieve our id, we can use something from react-router-dom called useParams
    // this is called id, because that's how it is declared in our Route component in App.js
    const { id } = useParams()
    const { user, msgAlert } = props

    // useEffect takes two arguments
    // the callback function
    // the dependency array
    // the dependency array determines when useEffect gets called
    // if any piece of state inside the dependency array changes
    // this triggers the useEffect to run the callback function again
    // NEVER EVER EVER EVER EVER EVER EVER put a piece of state in the dependency array that gets updated by the useEffect callback function
    // doing this causes an infinite loop
    // react will kill your application if this happens
    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pet',
                    message: showPetsFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    const setPetFree = () => {
        // we want to remove the pet
        removePet(user, pet._id)
            // send a success message
            .then(() =>
                msgAlert({
                    heading: `${pet.name} has been set free!`,
                    message: removePetSuccess,
                    variant: 'success',
                })
            )
            // navigate the user to the home page(index)
            .then(() => navigate('/'))
            // send a fail message if there is an error
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: removePetFailure,
                    variant: 'danger',
                })
            )
    }

    let toyCards
    if (pet) {
        if (pet.toys.length > 0) {
            toyCards = pet.toys.map(toy => (
                <ToyShow 
                    key={toy.id}
                    toy={toy}
                />
            ))
        } else {
            toyCards = <p>Pet has no toys, ain't that sad?</p>
        }
    }

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
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setPetFree()}
                                >
                                    Delete
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className='m-2' style={toyCardContainerLayout}>
                {toyCards}
            </Container>
            <EditPetModal 
                user={user}
                show={editModalShow}
                updatePet={updatePet}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
                pet={pet}
            />
        </>
    )
}

export default PetShow