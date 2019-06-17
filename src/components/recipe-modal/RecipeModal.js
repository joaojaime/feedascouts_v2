import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays';
import firebase from 'firebase/app';
import uuid from 'uuid';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormBS from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class RecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            currRecipe: this.props.recipe ? this.props.recipe : {}
        }
    }

    render() { 

        let currRecipe = this.state.currRecipe;

        return (

            <Modal 
                show={this.state.show} onHide={this.props.handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><strong>{currRecipe.name}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                    onSubmit={()=>null}
                    initialValues={{
                        name: currRecipe.name,
                        nrPeople: currRecipe.nrPeople,
                        creator: currRecipe.creator,
                        ingredients: currRecipe.ingredients
                    }}
                    mutators={{
                        ...arrayMutators
                    }}
                    render={({ 
                        handleSubmit, 
                        form: {
                            mutators: { push, pop }
                        }, // injected from final-form-arrays above, 
                        submitting, pristine, values 
                    }) => 
                    (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Row>
                                <Field
                                    name="name"
                                    component={InputRecipeName}
                                    type="text"
                                />
                                <Field
                                    name="nrPeople"
                                    component={InputNrPeople}
                                    type="text"
                                />
                                <Field
                                    name="creator"
                                    component={InputCreatorName}
                                    type="text"
                                />
                                </Row> 
                            </div>
                            <Row>
                                <Col md='auto' style={{marginTop: '7px'}}>
                                <span><strong>Ingredientes</strong></span>
                                </Col>
                            </Row>
                            <Row className='align-row'>
                                <Col md={{span: 3}} style={{marginTop: '10px', marginLeft: '40px'}} >
                                    <span>Nome</span>
                                </Col>
                                <Col md='4' style={{marginTop: '10px'}}>
                                    <span>Quantidade</span>
                                </Col>
                            </Row>
                            <br/>
                            <FieldArray name="ingredients">
                                {({ fields }) =>(
                                <div>
                                    {fields.map((name, index) => (
                                        <Row key={name} className='align-row'>
                                            <Col md='auto' className=''>
                                                <label>{index + 1}.</label>
                                            </Col>
                                            <Field
                                            name={`${name}.name`}
                                            component={InputIngName}
                                            placeholder="Nome"
                                            />
                                            
                                            <Condition when={`${name}.qb`} is={true}>
                                                <Field
                                                name={`${name}.qbLabel`}
                                                component={InputIsQb}
                                                />
                                            </Condition>
                                            
                                            <Condition when={`${name}.qb`} is={false}>
                                                <Field
                                                name={`${name}.qtd`}
                                                component={InputIngQnt}
                                                placeholder="Qtd"
                                                />
                                            </Condition>                                   
                                            <Condition when={`${name}.qb`} is={false}>
                                                <Field 
                                                name={`${name}.measure`}
                                                component={InputSelMeasure}
                                                >
                                                </Field>
                                            </Condition>                                  
                                        </Row>
                                    ))}
                                    </div>)
                                }
                            </FieldArray>
                        </form>
                    )}
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
        );
    }
}
 
export default RecipeModal;

export const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  )

export const InputRecipeName = ({ input, ...rest }) =>
    <Col md={4} {...input} {...rest}>
        <FormBS.Group controlId="recipeName">
            <FormBS.Label><strong>Nome</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} placeholder="" disabled />
        </FormBS.Group>
    </Col>

export const InputNrPeople = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="nrPeople">
            <FormBS.Label><strong>Nº Pessoas</strong></FormBS.Label>
            <FormBS.Control type="number" value={input.value} placeholder="" disabled />
        </FormBS.Group>
    </Col>

export const InputCreatorName = ({ input, ...rest }) =>
    <Col md={{span: 2, offset: 2}} {...input} {...rest}>
        <FormBS.Group controlId="creator">
            <FormBS.Label><strong>Criado por</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} onChange={input.onChange} placeholder="" disabled />
        </FormBS.Group>
    </Col>

export const InputIngName = ({ input, ...rest }) =>
    <Col md={3} {...input} {...rest}>
        <FormBS.Group controlId="ingName">
            <FormBS.Control type="text" value={input.value} placeholder="" disabled />
        </FormBS.Group>
    </Col>

export const InputIsQb = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="ingQb">
            <FormBS.Control type="text" value={'q.b.'} placeholder="" disabled />
        </FormBS.Group>
    </Col>

export const InputIngQnt = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="ingQtd">
            <FormBS.Control type="number" value={input.value} placeholder="" disabled />
        </FormBS.Group>
    </Col>

export const InputSelMeasure = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="selMeasure">
            <FormBS.Control as="select" value={input.value} disabled >
            <option value=''>Sel. Medida</option>
            <option value='kg'>Kg</option>
            <option value='l'>Litros</option>
            <option value='un'>Unidades</option>
            </FormBS.Control>
        </FormBS.Group>
    </Col>