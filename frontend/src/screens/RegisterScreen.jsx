import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; 
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState(null);

    const { name, email, password, confirmPassword } = formData;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';
    const { error, loading, userInfo } = useSelector(state => state.userRegister);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormInput
                    controlId='name'
                    label='Name'
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={handleInputChange}
                />

                <FormInput
                    controlId='email'
                    label='Email Address'
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={handleInputChange}
                />

                <FormInput
                    controlId='password'
                    label='Password'
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={handleInputChange}
                />

                <FormInput
                    controlId='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={handleInputChange}
                />

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? 
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

const FormInput = ({ controlId, label, type, placeholder, value, onChange }) => (
    <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            name={controlId}
            required
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </Form.Group>
);

export default RegisterScreen;





