import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// api function call from our api file
import { getAllPets } from '../../api/pet'

// we need our messages from the autodismiss alert messaged file
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PetsIndex = (props) => {
    const [pets, setPets] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    // useEffect takes two arguments
    // first a callback function
    // second a 'dependency array'
    useEffect(() => {
        getAllPets()
            .then(res => {
                // console.log('the pets?', res.data.pets)
                setPets(res.data.pets)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Pets',
                    message: messages.indexPetsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // we need to account for multiple potential states of our data
    // if we have an error
    if (error) {
        return <p>Error!</p>
    }

    // if the pets aren't even loaded yet
    if (!pets) {
        return <p>Loading....</p>
    // if we have NO pets
    } else if (pets.length === 0) {
        return <p>No pets yet, go add some!</p>
    }
    // console.log('the pets in PetsIndex', pets)

    const petCards = pets.map(pet => (
        <Card key={ pet.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ pet.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>{ pet.name }</Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { petCards }
        </div>
    )
}

// export our component
export default PetsIndex