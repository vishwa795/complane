import React,{Component} from 'react';
import Header from './navComponent'
import Home from './HomeComponent';
import DetailedComplaint from './detailedComplaintComponent';
import {complaintsData} from '../shared/exampleData';
import {Route,Redirect,withRouter, Switch} from 'react-router-dom';
import ComplaintListComponent from './complaintListComponent';
class Main extends Component{
    constructor(props){
        super(props);
        this.state= {
            isNavOpen : false,
            isModalOpen: false,
            isLogin:true,
            isSignup:false,
            isForgotPassword:false,

            user:null,
            isUsedLoggedIn:true,
            isUserLoading:false,
            userError:false,

            complaintsData:null,
            isComplaintsLoading:true,
            complaintsError:false,

            isTrendingTopicsLoading:false,
            trendingTopics:null,
            trendingTopicsError:false,



        }
    }
    togglenav = () => this.setState({isNavOpen : !this.state.isNavOpen});
    toggle = () => this.setState({isModalOpen:!this.state.isModalOpen});
    toggleLoginContent = () => this.setState({isLogin:!this.state.isLogin});
    toggleSignupContent =() => this.setState({isSignup:!this.state.isSignup});
    toggleForgotPasswordContent = () => this.setState({isForgotPassword:!this.state.isForgotPassword});

    render(){
        const DetailedComplaintLocal = ({match}) =>{
            //TODO: change == to === once mongoDB is set because both lhs and RHS will be in form of string
            return(
            <DetailedComplaint complaint={complaintsData.filter((complaint) => complaint.id == match.params.complaintID)[0]} />
            )
        }
        return(
            <div className="Main">
                <Header isNavOpen={this.state.isNavOpen} togglenav={this.togglenav} isModalOpen={this.state.isModalOpen} toggle={this.toggle}
                 isLogin={this.state.isLogin} toggleLoginContent={this.toggleLoginContent} isSignup={this.state.isSignup} toggleSignupContent={this.toggleSignupContent}
                  isForgotPassword={this.state.isForgotPassword} toggleForgotPasswordContent={this.toggleForgotPasswordContent} />
                  
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