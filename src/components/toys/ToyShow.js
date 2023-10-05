import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

const ToyShow = (props) => {
    const { toy } = props

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

    return (
        <>
            <Card className='m-2' style={setBgCondition(toy.condition)}>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small><br/>
                    <small>{toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}</small><br/>
                </Card.Body>
                <Card.Footer>Condition: {toy.condition}</Card.Footer>
            </Card>
        </>
    )
}

export default ToyShow