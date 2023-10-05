// this form will take several props, and be used by both Create and Update
// the action will be dependent upon the parent component(create or update)
// however, the form will look the same on both pages.
import { Form, Button, Container } from 'react-bootstrap'

const ToyForm = (props) => {
    // we need several props for a working, reusable form
    // we need the object itself(pet), a handleChange, a handleSubmit
    // sometimes it's nice to have a custom heading (to diff b/w our components)
    const { toy, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the toy's name?"
                        id="name"
                        name="name"
                        value={ toy.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Type:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of toy is this?"
                        id="description"
                        name="description"
                        value={ toy.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this toy squeaky?"
                        name="isSqueaky"
                        defaultChecked={ toy.isSqueaky }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select 
                        aria-label="toy condition"
                        name="condition"
                        defaultValue={ toy.condition }
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value="new">new</option>
                        <option value="used">used</option>
                        <option value="disgusting">disgusting</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )

}

export default ToyForm