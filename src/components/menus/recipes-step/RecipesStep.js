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
import TeamsStep from '../TeamsStep';
import { RecipeAddCard, RecipeRmvCard } from './RecipeCards';


class RecipesStep extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loaded: false,
            recipesList: props.recipesList,
            recipesForSelection: [],
            recipesSelected: [],
            totalTeamsNrPeople: 0
        }
    }

    addRecipeToMenu = (name) =>
        this.props.addRecipeToMenu(name)

    rmvRecipeFromMenu = (name) =>
        this.props.rmvRecipeFromMenu(name)

    renderRecipesForSelection = () => 
        this.props.recipesForSelection.map( item => 
            <RecipeAddCard key={item.recipe.id} recipeObj={item}
                handleClick={this.addRecipeToMenu} handleRecipeNrPeople={this.props.handleRecipeNrPeople} 
            /> )

    renderRecipesSelected = () => 
        this.props.recipesSelected.map( item => 
            <RecipeRmvCard key={item.recipe.id} recipeObj={item} handleClick={this.rmvRecipeFromMenu} handleRecipeNrPeople={this.props.handleRecipeNrPeople} /> )

    render() {
        let loaded = this.props.loaded;

        return (
            <>
            <Row>
                <Col md={6}>
                    <h6><strong>Receitas disponíveis</strong></h6>
                    {loaded && this.renderRecipesForSelection()}
                </Col>
                <Col md={6}>
                    <h6><strong>Receitas selecionadas</strong></h6>
                    {loaded && this.renderRecipesSelected()}
                </Col>
            </Row>
            </>
        );
    }
}
 
export default RecipesStep;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    const firestore = firebase.firestore();
    firestore.collection('recipes').add({
      ...values
    }).then(() => {
        window.alert('Receita criada com sucesso!')
        this.props.history.replace("/")

    }).catch(err => {
        window.alert('Erro: ', err)
    });
}

const InputMenuName = ({ input, ...rest }) =>
    <Col md={6} {...input} {...rest}>
        <FormBS.Group controlId="menuName">
            <FormBS.Label><strong>Nome da Ementa</strong></FormBS.Label>
            <FormBS.Control type="text" value={input.value} placeholder="Introduzir nome (ex: Acampamento de Verão)" />
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