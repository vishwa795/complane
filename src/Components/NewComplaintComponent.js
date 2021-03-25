// import React, {Component} from 'react';
// import { ComplaintListCardComponent } from './complaintListCardComponent';
// import Header from './navComponent';
// import {Modal,ModalBody,Form,FormGroup,Label,Input,Button,Col,Row} from 'reactstrap';


// export default class SearchComponent extends Component{
//     render(){
//         return(
//             <ModalBody>
//                     <div className="d-flex justify-content-center">
//                       <h1>Enter Query</h1>
//                     </div>
//                         <Form>
//                           <FormGroup>
//                             <Input type="text" name="title" id="title" placeholder="Enter the Title"/>
//                           </FormGroup>
//                           <FormGroup>
//                             <Input type="textarea" name="description" id="description" placeholder="Enter the Query's description"/>
//                           </FormGroup>
//                           <br />
                          
//                         </Form>
                        
                        
//                 </ModalBody>
            
//         );
//     }
// }


import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
      <center><Button style={{width: "40%"}} color="dark" onClick={toggle}><b>{buttonLabel}</b></Button></center>
      <br/>
      
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader style={{borderBottomWidth:"5px"}} toggle={toggle}>Enter the details of your Issue!</ModalHeader>
        <ModalBody>
        <div><input style={{borderRadius:"3px", width:"100%"}} type="text" name="title" id="title" placeholder="Enter the Title"/></div>
        <br/>
        <div><textarea style={{borderRadius:"3px"}} name="description" id="description" placeholder="Enter the Description"></textarea></div>
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

    