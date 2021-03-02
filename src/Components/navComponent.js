import react, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Input,
    Button
  } from 'reactstrap';
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavOpen : false
        }
    }
    togglenav = () => this.setState({isNavOpen : !this.state.isNavOpen})
    render(){
        return(
    <div>
      <Navbar className="navbar-dark" dark expand="md" id="sidebar" >
        <div className="container-fluid">
        <NavbarBrand href="/">CompLane</NavbarBrand>
        <NavbarToggler onClick={this.togglenav} />
        <Collapse isOpen={this.state.isNavOpen} navbar>
          <Nav className="mr-auto" navbar>
            <div className="sidebar-list">
            <NavItem className="side-item">
              <NavLink href="#">Home</NavLink>
            </NavItem>
            </div>
            <div className="sidebar-list">
            <NavItem className="side-item">
              <NavLink href="#">Login</NavLink>
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
                    <Input type="text" name="query" placeholder="Search" className="mr-2"/>{'   '}
                    <Button outline color="primary" id="searchButton"> Search </Button>
                </FormGroup>
            </Form> 
        </Collapse>
        </div>
      </Navbar>
      </div>
        )
    }
}
export default Header;