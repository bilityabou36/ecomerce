import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen() {
    const [qty, setQty] = useState(1)
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductsDetails(id));
    }, [dispatch, id]);

    const addToCartHandler =()=>{
        navigate(`/cart/${id}?qty=${qty}`);
    }

    if (loading) return <Loader />;
    if (error) return <Message variant='warning'>{error}</Message>;
    if (!product) return <Message variant='danger'>Product not found</Message>;

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5>{product.name}</h5>
                        </ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>qty</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control as="select"
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            
                                            >
                                                {
                                                   [...Array(product.countInStock).keys()].map((x)=>
                                                       <option key={x+1} value={x+1}>
                                                            {x + 1}
                                                       </option>
                                                   ) 
                                                }

                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                            )}

                            <Button 
                                    onClick={addToCartHandler}
                                    className='btn-block' disabled={product.countInStock === 0} 
                                    type='button'>
                                    Add to Cart
                            </Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;


