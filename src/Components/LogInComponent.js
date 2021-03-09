import React, {Component} from 'react';
import {Modal,ModalBody,Form,FormGroup,Label,Input,Button,Col,Row} from 'reactstrap';
function LoginModal(props){
    let content;
    if(props.isLogin){
        content = <Login toggleLoginContent={props.toggleLoginContent} toggleSignupContent={props.toggleSignupContent} /> //TODO provide the methods created in navComponent.
    }
    else if(props.isSignup){
        content = <Signup toggleLoginContent={props.toggleLoginContent} toggleSignupContent={props.toggleSignupContent} />
    }
    return(
          <div>
              <Modal isOpen={props.isModalOpen} toggle={props.toggle}>
                  {content}
              </Modal>
          </div>
    )
  }
function Login(props){
    return(
                <ModalBody>
                    <div className="d-flex justify-content-center">
                      <h1>Login</h1>
                    </div>
                        <Form>
                          <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="email" name="username" id="username" placeholder="Enter your username here"/>
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password here"/>
                          </FormGroup>
                          <div className="d-flex justify-content-end">
                            <a href="#">Forgot Your Password ?</a>
                          </div>
                          <FormGroup className="d-flex justify-content-center">
                            <Button name="login" className="login-button bg-success">Log In <span className="fa fa-md fa-arrow-right " /></Button>
                          </FormGroup>
                          <div className="d-flex justify-content-center">
                            <span>Don't have an account? <a href="#" onClick={() => {
                                props.toggleLoginContent();
                                props.toggleSignupContent();
                            }}> Sign Up</a></span>
                          </div>
                        </Form>
                        <hr />
                        <Row>
                          <Col md={6} sm={12}>
                            <Button className="g-button m-1"><span className="fa fa-lg fa-google"></span> Login with Google </Button>
                          </Col>
                          <Col md={6} sm={12}>
                          <Button className="fb-button m-1"><span className="fa fa-lg fa-facebook"></span> Login with Facebook </Button>
                          </Col>
                        </Row>
                </ModalBody>
    )
}

function Signup(props){
    return(
        <ModalBody>
                    <div className="d-flex justify-content-center">
                      <h1>Sign Up</h1>
                    </div>
                        <Form>
                          <FormGroup>
                            <Label for="username">Enter your Username</Label>
                            <Input type="email" name="username" id="username" placeholder="Enter your username here"/>
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Enter your Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password here"/>
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Re-enter password"/>
                          </FormGroup>
                          <FormGroup className="d-flex justify-content-center">
                            <Button name="login" className="login-button bg-success">Sign up <span className="fa fa-md fa-arrow-right " /></Button>
                          </FormGroup>
                          <div className="d-flex justify-content-center">
                            <span>Already have an account? <a href="#" onClick={() => {
                                props.toggleLoginContent();
                                props.toggleSignupContent();
                            }}> Sign In</a></span>
                          </div>
                        </Form>
                        <hr />
                        <Row>
                          <Col md={6} sm={12}>
                            <Button className="g-button m-1"><span className="fa fa-lg fa-google"></span> Signup with Google </Button>
                          </Col>
                          <Col md={6} sm={12}>
                          <Button className="fb-button m-1"><span className="fa fa-lg fa-facebook"></span> Signup with Facebook </Button>
                          </Col>
                        </Row>
                      </ModalBody>
    )
}


export default LoginModal;