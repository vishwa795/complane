import React, {Component} from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,Form,FormGroup,Input,Button } from 'reactstrap';
  import {NavLink} from 'react-router-dom';
  import LoginModal from './LogInComponent';
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavOpen : false,
            isModalOpen: false,
            isLogin:true,
            isSignup:false,
            isForgotPassword:false
        }
    }
    togglenav = () => this.setState({isNavOpen : !this.state.isNavOpen});
    toggle = () => this.setState({isModalOpen:!this.state.isModalOpen});
    toggleLoginContent = () => this.setState({isLogin:!this.state.isLogin});
    toggleSignupContent =() => this.setState({isSignup:!this.state.isSignup});
    toggleForgotPasswordContent = () => this.setState({isForgotPassword:!this.state.isForgotPassword});
    render(){
        return(
    <div>
      <Navbar className="navbar-dark" dark expand="lg" id="sidebar" >
        <div className="container-fluid">
        <NavbarBrand href="/">CompLane</NavbarBrand>
        <NavbarToggler onClick={this.togglenav} />
        <Collapse isOpen={this.state.isNavOpen} navbar>
          <Nav className="mr-auto" navbar>
            <div className="sidebar-list">
            <NavItem className="side-item">
              <NavLink className="nav-link" to="/home"><span className="fa fa-lg fa-home"/> Home</NavLink>
            </NavItem>
            </div>
            <div className="sidebar-list">
            <NavItem className="side-item">
              <NavLink className="nav-link" to="/login"><span className="fa fa-lg fa-rocket " /> Trending Topics</NavLink>
            </NavItem>
            </div>
            <div className="sidebar-list">
            <UncontrolledDropdown nav inNavbar className="side-item">
              <DropdownToggle nav caret>
                Complaints
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Add New Complaints
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Status
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </div>
          </Nav>
          <Form className="form-inline">
                <FormGroup>
                    <Input type="text" name="query" placeholder="Search" className="m-1 ml-auto"/>{'   '}
                    <Button outline color="primary" id="searchButton" className="m-1 ml-auto mb-auto" ><span className="fa fa-lg fa-search " /> Search </Button>
                </FormGroup>
            </Form>
            <span>
              <Button outline color="success" id="login-button" onClick={this.toggle} ><span className="fa fa-lg fa-sign-in " /> Login </Button>
            </span>
        </Collapse>
        </div>
      </Navbar>
      <LoginModal isModalOpen={this.state.isModalOpen} toggle={this.toggle} isLogin={this.state.isLogin} toggleLoginContent={this.toggleLoginContent} isSignup={this.state.isSignup} toggleSignupContent={this.toggleSignupContent} isForgotPassword={this.state.isForgotPassword} toggleForgotPasswordContent={this.toggleForgotPasswordContent} />
      
      </div>
      
        )
    }
}
export default Header;