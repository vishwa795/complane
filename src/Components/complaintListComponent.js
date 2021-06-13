import React, {Component} from 'react';
import { ComplaintListCardComponent } from './complaintListCardComponent';
import NewComplaintComponent from './NewComplaintComponent';
import {RemoveScrollBar} from 'react-remove-scroll-bar';
import Select from 'react-select';
import {state_list} from '../shared/state_list';   //list of states

//Like Quora's homepage
//cardComponent
//modal with title and desc - https://reactstrap.github.io/components/modals/

export default class ComplaintListComponent extends Component{
    
    render(){
        return(
            <div id="complaint_list_page">
                <NewComplaintComponent isUserLoggedIn={this.props.isUserLoggedIn} toggleLoginModal={this.props.toggleLoginModal} />
            <div>
            
            {/* <div id="state_name_dropdown_main_div" className="container">    
                <b id="state_name_dropdown_main"><Select options={state_list} placeholder="To get state-wise complaints, select the State... "/></b>
            </div> */}

            <ComplaintListCardComponent />
            </div>
            </div>
        );
    }
}

