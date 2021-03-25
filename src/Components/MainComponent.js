import React,{Component} from 'react';
import Header from './navComponent'
import Home from './HomeComponent';
import DetailedComplaint from './detailedComplaintComponent';
import {complaintsData} from '../shared/exampleData';
import {Route,Redirect,withRouter, Switch} from 'react-router-dom';
import ComplaintListComponent from './complaintListComponent';
class Main extends Component{
    render(){
        const DetailedComplaintLocal = ({match}) =>{
            //TODO: change == to === once mongoDB is set because both lhs and RHS will be in form of string
            return(
            <DetailedComplaint complaint={complaintsData.filter((complaint) => complaint.id == match.params.complaintID)[0]} />
            )
        }
        return(
            <div className="Main">
                <Header/>
                    <Switch location={this.props.location}>
                        <Route path="/home" component={Home} />
                        <Route exact path="/complaints" component={ComplaintListComponent} />
                        <Route path="/complaints/:complaintID" component={DetailedComplaintLocal} />
                        <Redirect to ="/home" />
                    </Switch>
            </div>
        )
    }
}

export default withRouter(Main);