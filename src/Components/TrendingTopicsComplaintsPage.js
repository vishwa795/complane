import React, {Component, useState} from 'react';
import {Card,CardTitle, CardBody, Spinner} from 'reactstrap';
import {Link} from 'react-router-dom';
import {state_list} from '../shared/state_list';
import Select from 'react-select';
import {getAllTrendingComplaints, upvoteComplaint} from '../API_calls/complaints';
import {complaintsData} from "../shared/exampleData";
import {BiUpvote} from 'react-icons/bi'; //For the upvote icon
import { store } from 'react-notifications-component';



export class TrendingTopicsComplaintsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            complaints:[],
            stateList:[{label:'ALL',value:'ALL'}].concat(state_list),
            selectedState:{label:'ALL',value:'ALL'},
            isLoading:true
        }
    }
    async componentDidMount(){
        this.setState({isLoading:true});
        const complaints = await getAllTrendingComplaints(this.props.topicId);
        this.setState({complaints:complaints,isLoading:false}); 

    }
    render(){
        let renderComplaints;
        if(this.state.isLoading){
            console.log("is loading");
            return(
            <div className="container">
                <div className="text-center mt-5">
                    <Spinner color="primary" />
                </div>
            </div>
            )
        }
        else if(this.state.complaints.length >0){
            
            renderComplaints = (
                <>
                <div className="row">
                {this.state.complaints.map((c) =>{
                  return(
                  <TrendingTopicsComplaintsPageFun user={this.props.user} complaint={c} />
                )
              })}
              </div>
              </>
            )  
        }
        else{
            renderComplaints = (
                <div className="container">
                    <div className="text-center mt-3">
                        <h2>No Complaints Found</h2>
                    </div>
                </div>
            )
        }
    

    return(
        <div className = "container-fluid">
            <div className="card-bg">
                <div id="state_name_dropdown_col" className="container">
                    <b>
                        {/* <span className="text-primary">Filter</span> */}
                        {/* <Select options={this.state.stateList} value={this.state.selectedState} 
                        onChange={this.stateSelect} minMenuHeight="300" placeholder="Select State..."/> */}
                    </b>
                </div> 
                <div>
                {renderComplaints}
                </div>
            </div>
        </div>                
    );
    }

}

function TrendingTopicsComplaintsPageFun(props){
    const [upvotes,updateUpvotes]=useState(props.complaint.votes.length);
    const userID = props.user._id;
    const [isClicked, setIsClicked] = useState(props.complaint.votes.indexOf(userID)!==-1);
    const increment = async () => {
        if(userID!="NOT_LOGGED_IN" && !props.complaint.isResolved){
            if(isClicked){
                updateUpvotes(upvotes-1);
            }
            else{
                updateUpvotes(upvotes+1);
            }
            setIsClicked(!isClicked);
            console.log(props.complaint._id);
            await upvoteComplaint(props.complaint._id);
        }
        else if(props.complaint.isResolved){
            store.addNotification({
                title: "Complaint Already Resolved",
                message: "The Complaint you are trying to upvote has already been resolved",
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
        }
        else{
            store.addNotification({
                title: "Login for Upvoting",
                message: "You cannot upvote complaints while not logged in. Kindly login to upvote",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
        }
    }
    
    return(
            
            <div id="card_div" className="col-md-6" key={props.complaint._id.toString()}> 
            <Card id="card">
            <CardBody>
            <CardTitle>
            <div color="dark" className="row">
            <div className="col-md-9">
            <div> 
                <Link to={`/complaints/${props.complaint._id}`}> 
                    <b id="card_title">
                        {props.complaint.title}
                    </b>
                </Link>
            </div>
            <br />
            </div> 
            <div className="col-md-3" >
            <b id="upvote_number" >{upvotes} </b><span onClick={increment} ><BiUpvote id="upvote" className={isClicked ? "upvote-button" : null} /></span>
            </div>   
            </div>
            </CardTitle>
            <p id="min_description">
                {props.complaint.desc}
            </p>
            </CardBody>
            </Card>
            </div>
    )
}


export default TrendingTopicsComplaintsPage;