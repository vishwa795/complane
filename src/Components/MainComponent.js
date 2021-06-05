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
        super(props)
        this.state={
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
                        <Route path="/trendingcomplaints" name="trendingcomplaints" render={props => <TrendingComplaints {...props} Wordcloud={this.state.Wordcloud} />} />
                        {/* <Route path="/wordcloud" name="wordcloud" render={props => <Wordcloud {...props} Wordcloud={this.state.Wordcloud} />} /> */}
                        
                        <Redirect to ="/home" />
                        
                    </Switch>
            </div>
        )
    }
}

export default withRouter(Main);