import React, {Component} from 'react';
import { ComplaintListCardComponent } from './complaintListCardComponent';
import Header from './navComponent';
import {Modal,ModalBody,Form,FormGroup,Label,Input,Button,Col,Row} from 'reactstrap';
import NewComplaintComponent from './NewComplaintComponent';
//import {InputPage} from './NewComplaintComponent';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

//Like Quora's homepage
//cardComponent
//modal with title and desc - https://reactstrap.github.io/components/modals/

export default class ComplaintListComponent extends Component{
    render(){
        return(
            <>
            <RemoveScrollBar />  
            <NewComplaintComponent />
            <div>
                
                <ComplaintListCardComponent/>
            </div>
            </>
        );
    }
}