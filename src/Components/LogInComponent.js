import React, {useState} from 'react';
import {Modal,ModalBody,Form,FormGroup,Label,Input,Button,Col,Row} from 'reactstrap';
function LoginModal(props){
    let content;
    const [usernameLogin,setUsernameLogin] = useState();
    const [passwordLogin,setPasswordLogin] = useState();

    const [usernameSignup,setUsernameSignup] = useState();
    const [passwordSignup,setPasswordSignup] = useState();
    const [confirmPasswordSignup,setConfirmPasswordSignup] = useState();

    const setUsernameForLogin = (username) => setUsernameLogin(username);
    const setPasswordForLogin = (password) => setPasswordLogin(password);
    const signIn = () =>{
      console.log(JSON.stringify({
        username:usernameLogin,
        password:passwordLogin
      }))
      fetch('http://localhost:4000/users/login',{
        method:'POST',
        body:JSON.stringify({
          username:usernameLogin,
          password:passwordLogin
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if(response.success){
          localStorage.setItem("accessToken",response.accessToken);
          props.loginUser(response.user);
        }
      })
      .catch(error => console.log(error));
    }

    if(props.isLogin){
        content = <Login toggleLoginContent={props.toggleLoginContent} toggleSignupContent={props.toggleSignupContent} 
        toggleForgotPasswordContent ={props.toggleForgotPasswordContent} signIn={signIn} username={usernameLogin} password={passwordLogin} 
        setUsername={setUsernameForLogin} setPassword={setPasswordForLogin} /> 
    }
    else if(props.isSignup){
        content = <Signup toggleLoginContent={props.toggleLoginContent} toggleSignupContent={props.toggleSignupContent} />
    }
    else if(props.isForgotPassword){
        content = <ForgotPassword toggleLoginContent={props.toggleLoginContent} toggleForgotPasswordContent ={props.toggleForgotPasswordContent}/>
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
                            <Input type="email" name="username" id="username" value={props.username} onChange={(event)=>props.setUsername(event.target.value)} placeholder="Enter your username here"/>
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" value={props.password} onChange={(event)=>props.setPassword(event.target.value)} placeholder="Enter your password here"/>
                          </FormGroup>
                          <div className="d-flex justify-content-end">
                            <a href="#" onClick={() => {
                                props.toggleLoginContent();
                                props.toggleForgotPasswordContent();
                            }}>Forgot Your Password ?</a>
                          </div>
                          <br />
                          <FormGroup className="d-flex justify-content-center">
                            <Button name="login" className="login-button bg-success" onClick={props.signIn} >Log In <span className="fa fa-md fa-arrow-right " /></Button>
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

function ForgotPassword(props){
    return(
                <ModalBody>
                    <div className="d-flex justify-content-center">
                      <div><h1>Forgot Password?</h1></div>
                    </div>
                    <hr />
                        <Form>
                          <FormGroup>
                            <Label for="username">Enter your email</Label>
                            <Input type="email" name="username" id="username" placeholder="Enter your Email here"/>
                          </FormGroup>
                          <div className="d-flex justify-content-end">
                            <a href="#" onClick={()=>{
                                props.toggleForgotPasswordContent();
                                props.toggleLoginContent();
                            }} >Remembered your password?</a>
                          </div>
                          <br />
                          <FormGroup className="d-flex justify-content-center">
                            <Button name="login" className="bg-primary">Send Reset Link<span className="fa fa-md fa-arrow-right " /></Button>
                          </FormGroup>
                        </Form>
                </ModalBody>
    )
}

export default LoginModal;