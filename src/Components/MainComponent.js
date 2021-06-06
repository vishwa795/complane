import React,{Component} from 'react';
import Header from './navComponent'
import Home from './HomeComponent';
import DetailedComplaint from './detailedComplaintComponent';
import TrendingComplaints from './TrendingComplaints';
import {complaintsData} from '../shared/exampleData';
import {Route,Redirect,withRouter, Switch} from 'react-router-dom';
import ComplaintListComponent from './complaintListComponent';
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
            isUsedLoggedIn:true,
            isUserLoading:false,
            userError:false,

            complaintsData:null,
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
                        <Route path="/trendingcomplaints" name="trendingcomplaints" render={props => <TrendingComplaints {...props} Wordcloud={this.state.Wordcloud} />} />
                        {/* <Route path="/wordcloud" name="wordcloud" render={props => <Wordcloud {...props} Wordcloud={this.state.Wordcloud} />} /> */}
                        
                        <Redirect to ="/home" />
                        
                    </Switch>
            </div>
        )
    }
}

export default withRouter(Main);