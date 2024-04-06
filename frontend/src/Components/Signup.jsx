import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import loginImg from "../images/arba-login.png"

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = () => {
        // e.preventDefault();
        const user = JSON.stringify({
            name, email, password
        })

        fetch(`http://localhost:8080/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: user,
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                window.location.href = "/login"
            })
    }

    return (
        <div className='flex'>
            <div>
                <img src={loginImg} alt="" />
            </div>
            <Container className="signup-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className="signup-form">
                            <h2>Sign Up</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        // name="name"
                                        // value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        // name="email"
                                        // value={formData.email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        // name="password"
                                        // value={formData.password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                                <div style={{ "textAlign": "center", "marginTop": "10px" }}> <p>Already an user ? </p>
                                    <Link to={"/login"}>Login</Link></div>
                                <br />
                                <Button variant="primary" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup
