import React, {Component, useState} from 'react';
import {Card,CardTitle, CardBody} from 'reactstrap';
import {complaintsData} from "../shared/exampleData";
import WordLimit from 'react-word-limit';  ///to find a character limit
import {BiUpvote} from 'react-icons/bi'; //For the upvote icon
import {Link} from 'react-router-dom';




export class ComplaintListCardComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            data:complaintsData,

        }
    }

    render(){
        const renderComplaints = this.state.data.map((c) =>{
          return(
            <ComplaintCard complaint={c} />
          )
        } )
    

    return(
        <div className="row">
        {renderComplaints}
        </div>
    );
    }

}

function ComplaintCard(props){
    const [upvotes,updateUpvotes]=useState(props.complaint.upvotes);
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
        <div id="card_div" className="col-md-6" key={props.complaint.id.toString()}> 
            <Card id="card">
            <CardBody>
            <CardTitle>
            <div color="dark" className="row">
            <div className="col-md-9">
            <div> 
                <Link to={`/complaints/${props.complaint.id}`}> 
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
                <WordLimit limit={100}>{props.complaint.description}</WordLimit> 
            </p>
            </CardBody>
            </Card>
            </div>
    )
}