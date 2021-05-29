import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {   Col,  Form,  FormGroup,  Label,  Input,  FormText} from "reactstrap";
import { Pattern, Match } from 'react-pattern-matching';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewComplaintFormComponent from './NewComplaintFormComponent'

const NewComplaintComponent = (props) => {
  const {
    buttonLabel="Have an issue? Click here. . .",
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

   return (
    <div>
      
      <br/> 
      <center><Button id="new_complaint_button" color="dark" onClick={toggle}><b>{buttonLabel}</b></Button></center>
      <br/>
      <Modal isOpen={modal} toggle={toggle} size="lg" >
        <ModalHeader toggle={toggle}><center><b>Enter the details of your Issue!</b></center></ModalHeader>
        <ModalBody>
        <form>
          <NewComplaintFormComponent />
        </form> 
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


export default NewComplaintComponent;

    