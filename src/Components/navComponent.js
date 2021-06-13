import React, {Component} from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,Form,FormGroup,Input,Button } from 'reactstrap';
  import {NavLink} from 'react-router-dom';
  import LoginModal from './LogInComponent';
class Header extends Component{
    render(){
        return(
    <div>
      <Navbar className="navbar-dark" dark expand="lg" id="sidebar" >
        <div className="container-fluid">
        <NavbarBrand href="/">CompLane</NavbarBrand>
        <NavbarToggler onClick={this.props.togglenav} />
        <Collapse isOpen={this.props.isNavOpen} navbar>
          <Nav className="mr-auto" navbar>
            <div className="sidebar-list">
            <NavItem className="side-item">
              <NavLink className="nav-link" to="/home"><span className="fa fa-lg fa-home"/> Home</NavLink>
            </NavItem>
            </div>

            
            <div className="sidebar-list">
            <NavItem className="side-item">
              <NavLink className="nav-link" to="/trendingcomplaints"><span className="fa fa-lg fa-rocket " /> Trending Topics</NavLink>
            </NavItem>
            </div>
            

            <div className="sidebar-list">
            <NavItem className="side-item">
              <NavLink className="nav-link" to="/complaints"><span className="fa fa-lg fa-comments-o " /> Complaints</NavLink>
            </NavItem>
            </div>
          </Nav>
          <Form className="form-inline">
                <FormGroup>
                    <Input type="text" name="query" placeholder="Search" className="m-1 ml-auto"/>{'   '}
                    <Button outline color="primary" id="searchButton" className="m-1 ml-auto mb-auto" ><span className="fa fa-lg fa-search " /> Search </Button>
                </FormGroup>
            </Form>
            <span>
              <Button outline color="success" id="login-button" onClick={this.props.toggle} ><span className="fa fa-lg fa-sign-in " /> Login </Button>
            </span>
        </Collapse>
        </div>
      </Navbar>
      <LoginModal isModalOpen={this.props.isModalOpen} toggle={this.props.toggle} isLogin={this.props.isLogin} toggleLoginContent={this.props.toggleLoginContent}
       isSignup={this.props.isSignup} toggleSignupContent={this.props.toggleSignupContent} isForgotPassword={this.props.isForgotPassword}
        toggleForgotPasswordContent={this.props.toggleForgotPasswordContent} loginUser={this.props.loginUser} />
      
      </div>
      
        )
    }
}
export default Header;