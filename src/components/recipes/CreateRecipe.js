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

import {withRouter} from 'react-router-dom';

class CreateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            await sleep(300)
            const firestore = firebase.firestore();
            const id = { id: uuid() };
        
            firestore.collection('recipes').add({
              ...values, ...id
            }).then(() => {
                window.alert('Receita criada com sucesso!')
                this.props.history.replace("/")
        
            }).catch(err => {
                window.alert('Erro: ', err)
            });
        }

        return (
        <Form
            onSubmit={onSubmit}
            initialValues={{ }}
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
                    <h1>Criar Receita</h1>
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
                        <Col md='auto' style={{marginTop: '5px'}}>
                            <Button 
                            variant='primary' type='button' className='btn-circle' size='sm'
                            onClick={() => push('ingredients', undefined)}
                            hidden={(values.ingredients ? values.ingredients.length : 0) != 0}
                            >
                                <i className='fas fa-plus'></i>
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <FieldArray name="ingredients">
                        {({ fields }) =>(
                        <div>
                            {fields.map((name, index) => (
                                <Row key={name} className='align-row'>
                                    <Col md='auto' className=''>
                                        <label>Ing. {index + 1}</label>
                                    </Col>
                                    <Field
                                    name={`${name}.name`}
                                    component={InputIngName}
                                    placeholder="Nome"
                                    />
                                    <label>
                                    <Field
                                    name={`${name}.qb`}
                                    component="input"
                                    type="checkbox"
                                    placeholder="q.b."
                                    defaultValue={false}
                                    />
                                    q.b.?
                                    </label>
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
                                    <Col md={2}>
                                        <Button
                                        variant='primary' type='button'
                                        className='btn-circle' style={{marginRight: '2px'}} size='sm'
                                        onClick={() => push('ingredients', undefined)}
                                        >
                                            <i className='fas fa-plus'></i>
                                        </Button>
                                        <Button
                                        variant='outline-secondary' type='button'
                                        className='btn-circle' size='sm'
                                        onClick={() => fields.remove(index)}
                                        >
                                            <i className='fas fa-minus'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            </div>)
                        }
                    </FieldArray>
                    {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                    <Button
                    variant='primary' type='submit'
                    style={{marginRight: '5px'}}
                    >
                        Guardar
                    </Button>
                    <Button
                    variant='outline-secondary' type='button'
                    className=''
                    >
                        Cancelar
                    </Button>
                </form>
            )}
        />
        );
    }
}
 
export default withRouter(CreateRecipe);

const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  )

const InputRecipeName = ({ input, ...rest }) =>
    <Col md={4} {...input} {...rest}>
        <FormBS.Group controlId="recipeName">
            <FormBS.Label><strong>Nome da Receita</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} placeholder="ex: Esparguete à Bolonhesa" />
        </FormBS.Group>
    </Col>

const InputNrPeople = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="nrPeople">
            <FormBS.Label><strong>Nº Pessoas</strong></FormBS.Label>
            <FormBS.Control type="number" value={input.value} placeholder="Nº pessoas" />
        </FormBS.Group>
    </Col>

const InputCreatorName = ({ input, ...rest }) =>
    <Col md={{span: 2, offset: 2}} {...input} {...rest}>
        <FormBS.Group controlId="creator">
            <FormBS.Label><strong>Criado por</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} onChange={input.onChange} placeholder="O teu nome" />
        </FormBS.Group>
    </Col>

const InputIngName = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="ingName">
            <FormBS.Control type="text" value={input.value} placeholder="Nome" />
        </FormBS.Group>
    </Col>

const InputIngQnt = ({ input, ...rest }) =>
    <Col md={1} {...input} {...rest}>
        <FormBS.Group controlId="ingQtd">
            <FormBS.Control type="number" value={input.value} placeholder="Qtd." />
        </FormBS.Group>
    </Col>

const InputSelMeasure = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="selMeasure">
            <FormBS.Control as="select" value={input.value} >
            <option value=''>Sel. Medida</option>
            <option value='kg'>Kg</option>
            <option value='l'>Litros</option>
            <option value='un'>Unidades</option>
            </FormBS.Control>
        </FormBS.Group>
    </Col>