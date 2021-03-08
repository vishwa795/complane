import React, {Component} from 'react';
import {Modal,ModalBody,Form,FormGroup,Label,Input,Button,Col,Row} from 'reactstrap';
function LoginModal(props){
    return(
          <div>
              <Modal isOpen={props.isModalOpen} toggle={props.toggle}>
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
                            <span>Don't have an account? <a href="#"> Sign Up</a></span>
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
              </Modal>
          </div>
    )
  }

export default LoginModal;