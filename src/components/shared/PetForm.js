// this form will take several props, and be used by both Create and Update
// the action will be dependent upon the parent component(create or update)
// however, the form will look the same on both pages.
import { Form, Button, Container } from 'react-bootstrap'

const PetForm = (props) => {
    // we need several props for a working, reusable form
    // we need the object itself(pet), a handleChange, a handleSubmit
    // sometimes it's nice to have a custom heading (to diff b/w our components)
    const { pet, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your pet's name?"
                        id="name"
                        name="name"
                        value={ pet.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Type:</Form.Label>
                    <Form.Control 
                        placeholder="What type of pet is this?"
                        id="type"
                        name="type"
                        value={ pet.type }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Age:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How old is your pet?"
                        id="age"
                        name="age"
                        value={ pet.age }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this pet adoptable?"
                        name="adoptable"
                        defaultChecked={ pet.adoptable }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )

}

export default PetForm