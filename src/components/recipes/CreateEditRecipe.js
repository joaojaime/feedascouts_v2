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

class CreateEditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: this.props.match.params.id ? true : false,
            currRecipe: {},
            currRecipeId: this.props.match.params.id ? this.props.match.params.id : ''
        }
    }

    componentDidMount() {
        let isEditMode = this.state.isEditMode;
        let currRecipeId = this.state.currRecipeId;

        if(isEditMode){
            let currRecipe;

            const db = firebase.firestore();
            db.collection('recipes').doc(currRecipeId)
                .get()
                .then(response => {
                    currRecipe = {
                        ...response.data(),
                        id: response.id
                    };

                    this.setState({ 
                        currRecipe: currRecipe 
                    });
                }).catch( err => {
                    console.log('Erro: ', err)
                }); 
        }
    }
    

    render() {

        let currRecipe = this.state.currRecipe;
        let currRecipeId = this.state.currRecipeId;
        let isEditMode = this.state.isEditMode;

        let extraQbFieldFeature = isEditMode ? {} : { defaultValue: false }
        console.log('extra: ', extraQbFieldFeature)

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onCreate = async values => {
            await sleep(300)
            const firestore = firebase.firestore();
        
            firestore.collection('recipes').add({
              ...values
            }).then(() => {
                window.alert('Receita criada com sucesso!')
                this.props.history.replace("/recipes")
        
            }).catch(err => {
                window.alert('Erro: ', err)
            });
        }

        const onEdit = async values => {
            await sleep(300)
            const firestore = firebase.firestore();
        
            firestore.collection('recipes').doc(currRecipeId).update({
              ...values
            }).then(() => {
                window.alert('Receita editada com sucesso!')
                this.props.history.replace("/recipes")
        
            }).catch(err => {
                window.alert('Erro: ', err)
            });
        }

        return (
        <Form
            onSubmit={isEditMode ? onEdit : onCreate}
            initialValues={{
                ...currRecipe
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
                    <h1>{isEditMode ? 'Editar Receita' : 'Criar Receita'}</h1>
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
                                    {...extraQbFieldFeature}
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
                        {isEditMode ? 'Guardar' : 'Criar'}
                    </Button>
                    <Button
                        variant='outline-secondary' type='button'
                        onClick={ () => this.props.history.replace("/recipes") }
                    >
                        Cancelar
                    </Button>
                </form>
            )}
        />
        );
    }
}
 
export default withRouter(CreateEditRecipe);

export const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  )

export const InputRecipeName = ({ input, ...rest }) =>
    <Col md={4} {...input} {...rest}>
        <FormBS.Group controlId="recipeName">
            <FormBS.Label><strong>Nome da Receita</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} placeholder="ex: Esparguete à Bolonhesa" />
        </FormBS.Group>
    </Col>

export const InputNrPeople = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="nrPeople">
            <FormBS.Label><strong>Nº Pessoas</strong></FormBS.Label>
            <FormBS.Control type="number" value={input.value} placeholder="Nº pessoas" />
        </FormBS.Group>
    </Col>

export const InputCreatorName = ({ input, ...rest }) =>
    <Col md={{span: 2, offset: 2}} {...input} {...rest}>
        <FormBS.Group controlId="creator">
            <FormBS.Label><strong>Criado por</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} onChange={input.onChange} placeholder="O teu nome" />
        </FormBS.Group>
    </Col>

export const InputIngName = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="ingName">
            <FormBS.Control type="text" value={input.value} placeholder="Nome" />
        </FormBS.Group>
    </Col>

export const InputIngQnt = ({ input, ...rest }) =>
    <Col md={1} {...input} {...rest}>
        <FormBS.Group controlId="ingQtd">
            <FormBS.Control type="number" value={input.value} placeholder="Qtd." />
        </FormBS.Group>
    </Col>

export const InputSelMeasure = ({ input, ...rest }) =>
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