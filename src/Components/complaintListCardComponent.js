import React, {Component, useState} from 'react';
import {Card,CardTitle, CardBody, Spinner} from 'reactstrap';
import WordLimit from 'react-word-limit';  ///to find a character limit
import {BiUpvote} from 'react-icons/bi'; //For the upvote icon
import {Link} from 'react-router-dom';
import {state_list} from '../shared/state_list';
import Select from 'react-select';
import {Col} from "reactstrap";
import {getAllComplaints, upvoteComplaint} from '../API_calls/complaints';
import {complaintsData} from "../shared/exampleData";
import { store } from 'react-notifications-component';



export class ComplaintListCardComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            complaints:[],
            stateList:[{label:'ALL',value:'ALL'}].concat(state_list),
            selectedState:{label:'ALL',value:'ALL'},
            isLoading:false
        }
    }
    setComplaints = (complaints) => {
        let resolvedComplaints = complaints.filter((complaint)=>complaint.isResolved);
        let unresolvedComplaints = complaints.filter((complaint)=>!complaint.isResolved);
        this.setState({complaints:[...unresolvedComplaints,...resolvedComplaints]}); 
    }

    async componentDidMount(){
        this.setState({isLoading:true});
        const complaints = await getAllComplaints();
        this.setComplaints(complaints);
        console.log("In complaintListCardComponent", complaints)
        this.setState({isLoading:false});
    }

    fetchAndSetComplaints = async (state="ALL") =>{
        this.setState({isLoading:true});
        const complaints = await getAllComplaints(state);
        this.setComplaints(complaints);
        this.setState({isLoading:false});
    }

    stateSelect = (option) =>{
        if(option.stateCode){
            this.fetchAndSetComplaints(option.stateCode);
            console.log("Has StateCode");
            this.setState({selectedState:option},()=>console.log(this.state));
        }
        else{
            this.setState({selectedState:{label:'ALL',value:'ALL'}});
            this.fetchAndSetComplaints();
        }
    }

    upvoteHandler = async (complaintID) => {
        const complaint = await upvoteComplaint(complaintID);
        console.log(complaint);
    }

    render(){
        let renderComplaints;
        if(this.state.isLoading){
            return(
                <div className="container">
                    <div className="mt-5 text-center">
                        <Spinner color="primary" />
                    </div>
                </div>
            )
        }
        else if(this.state.complaints.length >0){
            
            renderComplaints = (
                <div className="container-fluid">
                    <div className="row">
                    {this.state.complaints.map((c) =>{
                    return(
                    <ComplaintCard upvoteHandler={this.upvoteHandler} user={this.props.user} complaint={c} />
                    )
                })}
                </div>
              </div>
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
        <div className="card-bg">
            <div id="state_name_dropdown_col" className="container">
                <b>
                    <span className="text-primary">Filter</span>
                    <Select options={this.state.stateList} value={this.state.selectedState} 
                    onChange={this.stateSelect} minMenuHeight="300" placeholder="Select State..."/>
                </b>
            </div> 
            <div>
            {renderComplaints}
            </div>
        </div>
    );
    }

}

function ComplaintCard(props){
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
            await props.upvoteHandler(props.complaint._id);
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
                <WordLimit limit={100}>{props.complaint.desc}</WordLimit> 
            </p>
            </CardBody>
            </Card>
            </div>
    )
}
