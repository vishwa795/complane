import React, {Component} from 'react';
import { ComplaintListCardComponent } from './complaintListCardComponent';
import NewComplaintComponent from './NewComplaintComponent';


//Like Quora's homepage
//cardComponent
//modal with title and desc - https://reactstrap.github.io/components/modals/

export default class ComplaintListComponent extends Component{
    

    render(){

        return(
            <div id="complaint_list_page">
                <NewComplaintComponent isUserLoggedIn={this.props.isUserLoggedIn} toggleLoginModal={this.props.toggleLoginModal} />
            <div >
                <ComplaintListCardComponent upvoteHandler={this.props.upvoteHandler} user={this.props.user} />
            </div>
            </div>
        );
    }
}

