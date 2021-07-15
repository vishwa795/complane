import React,{Component} from 'react';
import Header from './navComponent'
import Home from './HomeComponent';
import DetailedComplaint from './detailedComplaintComponent';
import TrendingComplaints from './TrendingComplaints';
import {Route,Redirect,withRouter, Switch} from 'react-router-dom';
import ComplaintListComponent from './complaintListComponent';
import {authorizeUser} from '../API_calls/user';
import {getAllComplaints, getAllTrendingComplaints, upvoteComplaint} from '../API_calls/complaints';
import TrendingTopicsComplaintsPage from './TrendingTopicsComplaintsPage';
import ProtectedRoute from './PrivateRoute';


class Main extends Component{
    constructor(props){
        super(props);
        this.state= {
            isNavOpen : false,
            isModalOpen: false,
            isLogin:true,
            isSignup:false,
            isForgotPassword:false,
            isLoading:true,

            user:{_id:"NOT_LOGGED_IN"},
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
    setComplaints = async (state="ALL") => {
        const complaints = await getAllComplaints(state);
        this.setState({complaintsData:complaints,isComplaintsLoading:false});
    }
    loginUser = (user) => {
        this.setState({user:user,isUserLoggedIn:true});
    }
    logoutUser = () => {
        this.setState({isUserLoggedIn:false,user:{_id:"NOT_LOGGED_IN"}});
        localStorage.removeItem('accessToken');
    }
    upvoteHandler = async (complaintID) => {
        const complaint = await upvoteComplaint(complaintID);
        let complaintsData = this.state.complaintsData;
        let updatedComplaintsData = complaintsData.map((oldComplaint)=>{
            if(oldComplaint._id === complaintID){
                return complaint;
            }
            return oldComplaint;
        });
        this.setState({complaintsData:updatedComplaintsData});
    }
    async componentDidMount(){
        this.setState({isLoading:true});
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            await authorizeUser(accessToken,this.loginUser);
        }
        this.setState({isComplaintsLoading:true});
        this.setComplaints();
        this.setState({isLoading:false});
    }

    async setTrendingComplaints(topicId){
        this.setState({isComplaintsLoading:true})
        const complaints = await getAllTrendingComplaints(topicId);
        this.setState({complaintsData : complaints, isComplaintsLoading:false});
    }

    render(){
        const DetailedComplaintLocal = ({match,...props}) =>{
            //TODO: change == to === once mongoDB is set because both lhs and RHS will be in form of string
            return(
            <DetailedComplaint {...props} user={this.state.user} complaintID={match.params.complaintID} />
            )
        }
        return(
            <div className="Main">
                <Header isNavOpen={this.state.isNavOpen} togglenav={this.togglenav} isModalOpen={this.state.isModalOpen} toggle={this.toggle}
                 isLogin={this.state.isLogin} toggleLoginContent={this.toggleLoginContent} isSignup={this.state.isSignup} toggleSignupContent={this.toggleSignupContent}
                  isForgotPassword={this.state.isForgotPassword} toggleForgotPasswordContent={this.toggleForgotPasswordContent}
                  loginUser={this.loginUser} logoutUser={this.logoutUser} isUserLoggedIn={this.state.isUserLoggedIn} />
                  
                    <Switch location={this.props.location}>
                        
                        <Route path="/home" component={Home} />
                        
                        <ProtectedRoute isAuthenticationReq={false} isLoading={this.state.isLoading} exact path="/complaints" component={(props) =>  <ComplaintListComponent user={this.state.user} upvoteHandler={this.upvoteHandler} isUserLoggedIn={this.state.isUserLoggedIn} toggleLoginModal={this.toggle} complaints={this.state.complaintsData} setComplaints={this.setComplaints} />} />
                        
                        <ProtectedRoute isAuthenticationReq={false} isLoading={this.state.isLoading} path="/complaints/:complaintID" component={(props) =><DetailedComplaintLocal upvoteHandler={this.upvoteHandler} {...props} />} />
                        
                        <ProtectedRoute isAuthenticationReq={false} isLoading={this.state.isLoading} path="/trendingcomplaints" name="trendingcomplaints" component={props => <TrendingComplaints {...props} Wordcloud={this.state.Wordcloud} />} />
                        
                        <ProtectedRoute isAuthenticationReq={false} isLoading={this.state.isLoading} path="/trendingtopics/:topicId" component={(props) => <TrendingTopicsComplaintsPage isUserLoggedIn={this.state.isUserLoggedIn} user={this.state.user} topicId={props.match.params.topicId} /> }/> 
                        
                        <Redirect to ="/home" />

                    </Switch>
            </div>
        )
    }
}

export default withRouter(Main);