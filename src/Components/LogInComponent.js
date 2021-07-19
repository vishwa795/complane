import React, {useState} from 'react';
import {Modal,ModalBody,Form,FormGroup,Label,Input,Button,Col,Row} from 'reactstrap';
import { store } from 'react-notifications-component';
function LoginModal(props){
    let content;
    const [usernameLogin,setUsernameLogin] = useState();
    const [passwordLogin,setPasswordLogin] = useState();

    const [usernameSignup,setUsernameSignup] = useState();
    const [passwordSignup,setPasswordSignup] = useState();
    const [confirmPasswordSignup,setConfirmPasswordSignup] = useState();

    const setUsernameForLogin = (username) => setUsernameLogin(username);
    const setPasswordForLogin = (password) => setPasswordLogin(password);
    const signUp = async () => {
      try{
        if(passwordSignup !== confirmPasswordSignup){
          store.addNotification({
            title: "Password does not match",
            message: "Please make sure the passwords entered by you match.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
          return;
        }
        console.log({
          username:usernameSignup,
          password:passwordSignup
        });
        const response = await fetch('http://localhost:4000/users/signup',{
          method:"POST",
          body:JSON.stringify({
            username:usernameSignup,
            password:passwordSignup
          }),
          headers:{
            "Content-Type":"application/json"
          }
        }).then(response => response.json())
        if(response.success){
          store.addNotification({
            title: "Signup SuccessFull",
            message: "You have Successfully Signed Up!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
          setUsernameSignup('');
          setPasswordSignup('');
          setConfirmPasswordSignup('');
        }
        else{
          store.addNotification({
            title: "Signup Unsuccessful",
            message: response.err.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
      }
      catch(error){
        console.log(error);
      }
    }
    const signIn = () =>{
      console.log('COming heer');
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
        if(response.success){
          console.log("coming here also");
          localStorage.setItem("accessToken",response.accessToken);
          store.addNotification({
            title: "Login SuccessFull",
            message: "You have Successfully Logged in!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
          props.loginUser(response.user);
          props.toggle();
        }
        else{
          store.addNotification({
            title: "Login Unuccessful",
            message: response.err.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
      },(error)=>{
        store.addNotification({
          title: "Login UnuccessFull",
          message: error.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      })
      .catch(error =>{
        store.addNotification({
          title: "Login UnuccessFull",
          message: error.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
    }

    if(props.isLogin){
        content = <Login toggleLoginContent={props.toggleLoginContent} toggleSignupContent={props.toggleSignupContent} 
        toggleForgotPasswordContent ={props.toggleForgotPasswordContent} signIn={signIn} username={usernameLogin} password={passwordLogin} 
        setUsername={setUsernameForLogin} setPassword={setPasswordForLogin} /> 
    }
    else if(props.isSignup){
        content = <Signup usernameSignup={usernameSignup} signUp={signUp} setUsernameSignup={setUsernameSignup} passwordSignup={passwordSignup} setPasswordSignup={setPasswordSignup} confirmPasswordSignup={confirmPasswordSignup} setConfirmPasswordSignup={setConfirmPasswordSignup} toggleLoginContent={props.toggleLoginContent} toggleSignupContent={props.toggleSignupContent} />
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
                          {/* <div className="d-flex justify-content-end">
                            <a href="#" onClick={() => {
                                props.toggleLoginContent();
                                props.toggleForgotPasswordContent();
                            }}>Forgot Your Password ?</a>
                          </div> */}
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
                        {/* <Row>
                          <Col md={6} sm={12}>
                            <Button className="g-button m-1"><span className="fa fa-lg fa-google"></span> Login with Google </Button>
                          </Col>
                          <Col md={6} sm={12}>
                          <Button className="fb-button m-1"><span className="fa fa-lg fa-facebook"></span> Login with Facebook </Button>
                          </Col>
                        </Row> */}
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
                            <Input type="email" name="username" id="username" placeholder="Enter your username here" value={props.usernameSignup} onChange={(e)=>props.setUsernameSignup(e.target.value)}/>
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Enter your Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password here" value={props.passwordSignup} onChange={(e)=>props.setPasswordSignup(e.target.value)} />
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Re-enter password" value={props.confirmPasswordSignup} onChange={(e)=>props.setConfirmPasswordSignup(e.target.value)} />
                          </FormGroup>
                          <FormGroup className="d-flex justify-content-center">
                            <Button name="login" className="login-button bg-success" onClick={async()=>{await props.signUp();}}>Sign up <span className="fa fa-md fa-arrow-right " /></Button>
                          </FormGroup>
                          <div className="d-flex justify-content-center">
                            <span>Already have an account? <a href="#" onClick={() => {
                                props.toggleLoginContent();
                                props.toggleSignupContent();
                            }}> Sign In</a></span>
                          </div>
                        </Form>
                        <hr />
                        {/* <Row>
                          <Col md={6} sm={12}>
                            <Button className="g-button m-1"><span className="fa fa-lg fa-google"></span> Signup with Google </Button>
                          </Col>
                          <Col md={6} sm={12}>
                          <Button className="fb-button m-1"><span className="fa fa-lg fa-facebook"></span> Signup with Facebook </Button>
                          </Col>
                        </Row> */}
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