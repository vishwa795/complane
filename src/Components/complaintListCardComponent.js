import React, {Component, useState} from 'react';
import {Card,CardTitle, CardBody} from 'reactstrap';
import WordLimit from 'react-word-limit';  ///to find a character limit
import {BiUpvote} from 'react-icons/bi'; //For the upvote icon
import {Link} from 'react-router-dom';
import {state_list} from '../shared/state_list';
import Select from 'react-select';
import {Col} from "reactstrap";
import {getAllComplaints} from '../API_calls/complaints';
import {complaintsData} from "../shared/exampleData";



export class ComplaintListCardComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            complaints:[],
            stateList:[{label:'ALL',value:'ALL'}].concat(state_list),
            selectedState:{label:'ALL',value:'ALL'}
        }
    }
    async componentDidMount(){
        const complaints = await getAllComplaints();
        this.setState({complaints:complaints}); 
    }
    setComplaints = async (state="ALL") =>{
        const complaints = await getAllComplaints(state);
        this.setState({complaints:complaints});
    }
    stateSelect = (option) =>{
        if(option.stateCode){
            this.setComplaints(option.stateCode);
            console.log("Has StateCode");
            this.setState({selectedState:option},()=>console.log(this.state));
        }
        else{
            this.setState({selectedState:{label:'ALL',value:'ALL'}});
            this.setComplaints();
        }
    }

    render(){
        let renderComplaints;

        if(this.state.complaints.length >0){
            
            renderComplaints = (
                <>
                <div className="row">
                {this.state.complaints.map((c) =>{
                  return(
                  <ComplaintCard complaint={c} />
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
    const [isClicked, setIsClicked] = useState(false);
    const increment = () => {
        if(isClicked){
            updateUpvotes(upvotes-1);
        }
        else{
            updateUpvotes(upvotes+1);
        }
        setIsClicked(!isClicked);
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
