import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeToy } from '../../api/toy'
import { removeToySuccess, removeToyFailure } from '../shared/AutoDismissAlert/messages'
import EditToyModal from './EditToyModal'

const ToyShow = (props) => {
    const { toy, msgAlert, triggerRefresh, user, pet } = props

    // hook/piece of state that displays the editToyModal
    const [editModalShow, setEditModalShow] = useState(false)

    // we're going to build a function that reads the toy's condition
    // then sets a style based on that condition
    // we'll just change the background color, but you can really do anything
    // we'll return and pass the results of this function to an inline style
    const setBgCondition = (cond) => {
        // a toy can either be new, used, or disgusting
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    const destroyToy = () => {
        // we want to remove the pet
        removeToy(user, pet._id, toy._id)
            // send a success message
            .then(() =>
                msgAlert({
                    heading: `Toy Deleted!`,
                    message: removeToySuccess,
                    variant: 'success',
                })
            )
            // triggerRefresh
            .then(() => triggerRefresh())
            // send a fail message if there is an error
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: removeToyFailure,
                    variant: 'danger',
                })
            )
    }

    return (
        <>
            <Card className='m-2' style={setBgCondition(toy.condition)}>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small><br/>
                    <small>{toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}</small><br/>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {toy.condition}</small><br/>
                    {
                        user && pet.owner && user._id === pet.owner._id
                        ?
                        <>
                            <Button 
                                className="m-2" variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Toy
                            </Button>
                            <Button 
                                className="m-2" variant="danger"
                                onClick={() => destroyToy()}
                            >
                                Delete Toy
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditToyModal 
                user={user}
                pet={pet}
                toy={toy}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ToyShow