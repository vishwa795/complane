import React, {Component, useState} from 'react';
import {Card,CardTitle, CardBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {state_list} from '../shared/state_list';
import Select from 'react-select';
import {getAllTrendingComplaints} from '../API_calls/complaints';
import {complaintsData} from "../shared/exampleData";
import {BiUpvote} from 'react-icons/bi'; //For the upvote icon



export class TrendingTopicsComplaintsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            complaints:[],
            stateList:[{label:'ALL',value:'ALL'}].concat(state_list),
            selectedState:{label:'ALL',value:'ALL'}
        }
    }
    async componentDidMount(){
        const complaints = await getAllTrendingComplaints(this.props.topicId);
        this.setState({complaints:complaints}); 

    }
    render(){
        let renderComplaints;

        if(this.state.complaints.length >0){
            
            renderComplaints = (
                <>
                <div className="row">
                {this.state.complaints.map((c) =>{
                  return(
                  <TrendingTopicsComplaintsPageFun complaint={c} />
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
                {props.complaint.desc}
            </p>
            </CardBody>
            </Card>
            </div>
    )
}


export default TrendingTopicsComplaintsPage;