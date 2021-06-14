import React, {Component, useState} from 'react';
import {Card,CardTitle, CardBody} from 'reactstrap';
import WordLimit from 'react-word-limit';  ///to find a character limit
import {BiUpvote} from 'react-icons/bi'; //For the upvote icon
import {Link} from 'react-router-dom';
import {state_list} from '../shared/state_list';
import Select from 'react-select';
import {Col} from "reactstrap";
import {complaintsData} from "../shared/exampleData";



export class ComplaintListCardComponent extends Component{


    constructor(props){
        super(props);
        this.state={
            data:complaintsData,

        }
    }
    componentDidMount(){
        // fetch('http://localhost:4000/complaints',{
        //     method:'GET',
        //     headers:{
        //         "Access-Control-Allow-Origin":"*"
        //     }
        // })
        // .then(res=>res.json())
        // .then(complaints =>{
        //     console.log('Here are the complaints ',complaints);
        //     this.setState({data:complaints})
        // }, error => console.log('Rejected',error.message))
        // .catch(error => console.log(error.message))
    }



    render(){
        let renderComplaints;

        if(this.state!=null && this.state.data.length >0){
            
            renderComplaints = (
                <>
                <Col id="state_name_dropdown_col" className="container">
                    <b id="state_name_dropdown" ><Select options={state_list} placeholder="To get state-wise complaints, select State..."/></b>
                </Col> 
                <div className="row">
                {this.state.data.map((c) =>{
                console.log(c);
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
                    <div className="text-center">
                        <h2>No Complaints Found</h2>
                    </div>
                </div>
            )
        }
    

    return(
        <>
        {renderComplaints}
        </>
    );
    }

}

function ComplaintCard(props){
    const [upvotes,updateUpvotes]=useState(props.complaint.votes);
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