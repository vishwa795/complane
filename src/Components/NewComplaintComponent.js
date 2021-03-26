import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Testing} from './Testing';
import {   Col,  Form,  FormGroup,  Label,  Input,  FormText} from "reactstrap";
import { Pattern, Match } from 'react-pattern-matching';

const NewComplaintComponent = (props) => {
  const {
    buttonLabel="Have an issue? Click here. . .",
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const Karnataka=["bengaluru","Mysore","Udupi"];
  console.log(Karnataka[0]);

  const Kerala=["Munnar","Munnar2","Munnar3"];

  const TamilNadu=["Chennai","Chennai2","Chennai3"];

  return (
    <div>
      
      <br/>
      <center><Button style={{width: "40%"}} color="dark" onClick={toggle}><b>{buttonLabel}</b></Button></center>
      <br/>
      <Modal isOpen={modal} toggle={toggle} size="lg" >
        <ModalHeader toggle={toggle}><center><b>Enter the details of your Issue!</b></center></ModalHeader>
        
        <ModalBody>
        <form>

        <FormGroup row>
          <Label for="state" sm={2}>
            State
          </Label>
          <Col sm={10}>
            <Input type="select" name="state" id="state">
              <option required disabled selected value="">Select your state</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="TamilNadu">Tamil Nadu</option>
            </Input>
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="destrict" sm={2}>
            Destrict
          </Label>
         
            <Col sm={10}>
            <Input type="select" name="destrict" id="destrict">
              <option required disabled selected value="">Select your destrict</option>
              <option value="Bengaluru">Karnataka</option>
              <option value="Mysore">Mysore</option>
              <option value="Udupi">Udupi</option>
            </Input>
          </Col>
          
        </FormGroup>  


         <FormGroup row>
          <Label for="Title" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input 
              required
              color="dark"
              type="text"
              name="title"
              id="title"
              placeholder="Enter the title"
            />
          </Col>
        </FormGroup>

        <FormGroup row >
          <Label for="description" sm={2}>
            Description
          </Label>
          <Col sm={10} style={{ height:"100%"}}>
            <textarea
              required
              style={{borderRadius:"3px", height:"100px"}}
              type="text"
              name="desciption"
              id="desciption"
              placeholder="Enter the desciption"
            />
          </Col>
        </FormGroup>

        




         {/* <label>
            Select your State :     
        </label>
        <br/>
        <select style={{borderRadius:"3px", width:"100%"}}>
            <option disabled selected value="" >Please choose your state</option>
            <option value="Andaman">Andaman and Nicobar Islands</option>
            <option value="Karnataka">Karnataka</option>
            <option value="TamilNadu">TamilNadu</option>
            <option value="Kerala">Kerala</option>
        </select>
        <br/><br/>
        
        <label>
            Select your District :     
        </label>
        <br/>
          <select style={{borderRadius:"3px",width:"100%"}}>
            <option disabled selected value="" >Please choose your District</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mysore">Mysore</option>
            <option value="Udupi">Udupi</option>
          </select>  
          <br/><br/>
         
          <label>
            Title :     
          </label>
         <input style={{borderRadius:"3px", width:"100%"}} type="text" name="title" id="title" placeholder="Enter the Title"/>
          
          <br/><br/>
          <label>
            Description :     
          </label>
          <textarea style={{bordMdDescriptionerRadius:"3px"}} name="description" id="description" placeholder="Enter the Description"></textarea>
          <br/><br/>
          <div className="col-md-6">
          
          </div> */} 
          
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

    