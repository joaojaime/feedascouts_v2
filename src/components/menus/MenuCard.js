import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

export const MenuCard = (props) => {
    let { menu } = props;
    let recipes = menu.recipe;

    console.log(menu)

    return(
        <div className="col-xl-4 col-md-4 mb-4">
            <div className="card border-left-secondary shadow h-100">
                <div className="card-body">
                    <div className="row no-gutters">
                        <Col md={8} >
                            <div className="text-xs font-weight-bold text-primary mb-1">by: {menu.creator}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{menu.name}</div>
                            {/* <Form.Group controlId="menuName">
                                    <Form.Label><i className="fas fa-user" style={{fontSize: '12px'}}></i><i></i></Form.Label>
                            </Form.Group> */}
                        </Col>
                        <Col md={{span: 1, offset: 3}} >
                            <Link to={`menus/${menu.id}/edit`}>
                                <Button  variant='primary' size='sm' className='btn-circle' style={{marginTop: '10px'}} >
                                    <i className="fas fa-edit"></i>
                                </Button>
                            </Link>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    );
}