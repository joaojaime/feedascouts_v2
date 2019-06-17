import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const RecipeAddCard = (props) => {
    let { recipeObj, handleClick, handleRecipeNrPeople, handleTitleClick } = props;
    let recipe = recipeObj.recipe;

    return(
        <div className="col-xl-11 col-md-11 mb-4">
            <div className="card border-left-secondary shadow h-100">
                <div className="card-body">
                    <div className="row no-gutters">
                        <Col md={8} >
                            <div className="text-xs font-weight-bold text-primary mb-1">by: {recipe.creator}</div>
                            <a href='#'><div className="h5 mb-0 font-weight-bold text-gray-800" onClick={() => handleTitleClick(recipe.id)}>{recipe.name}</div></a>
                        </Col>
                        <Col md={4} >
                            <Row >
                                <Col md={8}>
                                <Form.Group controlId="menuName">
                                    <Form.Label><strong>Nº Pess.</strong></Form.Label>
                                    <Form.Control type="number" placeholder="Nº pess."
                                        name={recipe.name} onChange={handleRecipeNrPeople} />
                                </Form.Group>
                                </Col>
                                <Col md={4}>
                                <Button variant='primary' size='sm' className='btn-circle' style={{marginTop: '20px'}} onClick={() => handleClick(recipe.name)}>
                                    <i className='fas fa-plus'></i>
                                </Button>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const RecipeRmvCard = (props) => {
    let { recipeObj, handleClick, nrPeople } = props;
    let recipe = recipeObj.recipe;

    return(
        <div className="col-xl-11 col-md-11 mb-4">
            <div className="card border-left-primary shadow h-100">
                <div className="card-body">
                    <div className="row no-gutters">
                        <Col md={8} >
                            <div className="text-xs font-weight-bold text-primary mb-1">by: {recipe.creator}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{recipe.name}</div>
                        </Col>
                        <Col md={4} >
                            <Row >
                                <Col md={8}>
                                <Form.Group controlId="menuName">
                                    <Form.Label><strong>Nº Pess.</strong></Form.Label>
                                    <Form.Control type="number" value={recipeObj.menuNrPeople ? recipeObj.menuNrPeople : 0} placeholder="Nº pess." disabled/>
                                </Form.Group>
                                </Col>
                                <Col md={4}>
                                <Button variant='secondary' size='sm' className='btn-circle' style={{marginTop: '20px'}} onClick={() => handleClick(recipe.name, nrPeople)}>
                                    <i className='fas fa-minus'></i>
                                </Button>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    );
}