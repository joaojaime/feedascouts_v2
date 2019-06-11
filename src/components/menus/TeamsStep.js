import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormBS from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class TeamsStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    calculateTeamsTotalNr = (teamsList) => {
        let total = 0;
        if(teamsList){
            teamsList.forEach(item => {
                if(item && item.nrPeople)
                    total += parseInt(item.nrPeople)
            })
        }

        return total;
    }

    render() { 

        let { values, push } = this.props;

        return (
            <>
            <Row>
                <Field
                name="name"
                component={InputMenuName}
                type="text"
                />
                <Field
                name="creator"
                component={InputCreatorName}
                type="text"
                />
            </Row>
            <Row>
                <Col md='auto' style={{marginTop: '7px'}}>
                    <span><strong>Equipas</strong></span>
                </Col>
            </Row>
            <Row>
                <Col md='auto' style={{marginLeft: '15px', marginTop:'8px'}}>
                    <Button 
                    variant='primary' type='button' className='btn-circle'
                    onClick={() => push('teams', undefined)}
                    hidden={(values.teams ? values.teams.length : 0) != 0}
                    >
                        <i className='fas fa-plus'></i>
                    </Button>
                </Col>
            </Row>
            <br/>
            <FieldArray name="teams">
                {({ fields }) =>(
                <div>
                    {fields.map((name, index) => (
                        <Row key={name} className='align-row'>
                            <Col md='auto' className=''>
                                <label>{index + 1}.</label>
                            </Col>
                            <Field
                            name={`${name}.name`}
                            component={InputTeamName}
                            placeholder="Nome"
                            />
                            <Field
                            name={`${name}.nrPeople`}
                            component={InputNrPeople}
                            placeholder="nrPeople"
                            />                                                            
                            <Col md={2}>
                                <Button
                                variant='primary' type='button' size='sm'
                                className='btn-circle' style={{marginRight: '2px'}}
                                onClick={() => push('teams', undefined)}
                                >
                                    <i className='fas fa-plus'></i>
                                </Button>
                                <Button
                                variant='outline-secondary' type='button' size='sm'
                                className='btn-circle'
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
            <Row>
                <Col>
                    <span>Nº total de pessoas: <strong>{this.calculateTeamsTotalNr(values.teams)}</strong></span>
                </Col>
            </Row>
            <br/>
            </>
        );
    }
}
 
export default TeamsStep;

const InputMenuName = ({ input, ...rest }) =>
    <Col md={6} {...input} {...rest}>
        <FormBS.Group controlId="menuName">
            <FormBS.Label><strong>Nome da Ementa</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} onChange={input.onChange} placeholder="ex: Kandersteg 2020" />
        </FormBS.Group>
    </Col>

const InputCreatorName = ({ input, ...rest }) =>
    <Col md={{span: 2, offset: 2}} {...input} {...rest}>
        <FormBS.Group controlId="creatorName">
            <FormBS.Label><strong>Criado por</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} onChange={input.onChange} placeholder="O teu nome" />
        </FormBS.Group>
    </Col>

const InputTeamName = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="teamName">
            <FormBS.Control type="text" value={input.value} placeholder="Nome da equipa" />
        </FormBS.Group>
    </Col>

const InputNrPeople = ({ input, ...rest }) =>
    <Col md={2} {...input} {...rest}>
        <FormBS.Group controlId="nrPeople">
            <FormBS.Control type="number" value={input.value} placeholder="Nº pessoas" />
        </FormBS.Group>
    </Col>