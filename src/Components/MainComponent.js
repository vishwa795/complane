import React,{Component} from 'react';
import Header from './navComponent'
import Home from './HomeComponent';
import DetailedComplaint from './detailedComplaintComponent';
import TrendingComplaints from './TrendingComplaints';
import {complaintsData} from '../shared/exampleData';
import {Route,Redirect,withRouter, Switch} from 'react-router-dom';
import ComplaintListComponent from './complaintListComponent';
import {authorizeUser} from '../API_calls/user';
import {getAllComplaints} from '../API_calls/complaints';

import Wordcloud from './WordCloud';
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
            isUserLoggedIn:false,
            isUserLoading:false,
            userError:false,

            complaintsData:[],
            isComplaintsLoading:true,
            complaintsError:false,

            isTrendingTopicsLoading:false,
            trendingTopics:null,
            trendingTopicsError:false,

            Wordcloud:{
                cloud : [
                  { value: 'Mango', count:  30},
                  { value: 'Apple', count: 30 },
                  { value: 'Orange', count: 28 },
                  { value: 'Solution', count: 25 },
                  { value: 'Money', count: 33 },
                  { value: 'Potholes', count: 18 },
                  { value: 'Godzilla', count: 40 },
                  { value: 'Electricity', count: 20 },
                  
                ]
              },



        }
    }
    togglenav = () => this.setState({isNavOpen : !this.state.isNavOpen});
    toggle = () => this.setState({isModalOpen:!this.state.isModalOpen});
    toggleLoginContent = () => this.setState({isLogin:!this.state.isLogin});
    toggleSignupContent =() => this.setState({isSignup:!this.state.isSignup});
    toggleForgotPasswordContent = () => this.setState({isForgotPassword:!this.state.isForgotPassword});
    setComplaints = async () => {
        const complaints = await getAllComplaints();
        this.setState({complaintsData:complaints,isComplaintsLoading:false});
    }
    loginUser = (user) => {
        console.log("Before Login",this.state);
        this.setState({user:user,isUserLoggedIn:true});
        console.log("after login",this.state);
    }
    logoutUser = () => {
        this.setState({isUserLoggedIn:false,user:null});
        localStorage.removeItem('accessToken');
    }
    componentDidMount(){
        const accessToken = localStorage.getItem('accessToken');
        console.log('accessToken is ',accessToken);
        if(accessToken){
            console.log('fetching');
            setTimeout(()=>{
               authorizeUser(accessToken,this.loginUser);
               console.log('lol');
            },0);
        }
        this.setState({isComplaintsLoading:true});
        this.setComplaints();
    }

    render(){
        const DetailedComplaintLocal = ({match}) =>{
            //TODO: change == to === once mongoDB is set because both lhs and RHS will be in form of string
            return(
            <DetailedComplaint complaint={this.state.complaintsData.filter((complaint) => complaint._id == match.params.complaintID)[0]} />
            )
        }
        return(
            <div className="Main">
                <Header isNavOpen={this.state.isNavOpen} togglenav={this.togglenav} isModalOpen={this.state.isModalOpen} toggle={this.toggle}
                 isLogin={this.state.isLogin} toggleLoginContent={this.toggleLoginContent} isSignup={this.state.isSignup} toggleSignupContent={this.toggleSignupContent}
                  isForgotPassword={this.state.isForgotPassword} toggleForgotPasswordContent={this.toggleForgotPasswordContent}
                  loginUser={this.loginUser} logoutUser={this.logoutUser} />
                  
                    <Switch location={this.props.location}>
                        <Route path="/home" component={Home} />
                        <Route exact path="/complaints" component={() =>  <ComplaintListComponent isUserLoggedIn={this.state.isUserLoggedIn} toggleLoginModal={this.toggle} complaints={this.state.complaintsData} />} />
                        <Route path="/complaints/:complaintID" component={(props) => this.state.isComplaintsLoading?<div>Loading</div>  :  <DetailedComplaintLocal {...props} />} />
                        <Route path="/trendingcomplaints" name="trendingcomplaints" render={props => <TrendingComplaints {...props} Wordcloud={this.state.Wordcloud} />} />
                        {/* <Route path="/wordcloud" name="wordcloud" render={props => <Wordcloud {...props} Wordcloud={this.state.Wordcloud} />} /> */}
                        
                        <Redirect to ="/home" />
                        
                    </Switch>
            </div>
        )
    }
}

export default withRouter(Main);