import React, {Component, useState} from 'react';
import {Card,CardTitle, CardBody, CardImg, CardText} from 'reactstrap';
import {complaintsData} from "../shared/exampleData";
import WordLimit from 'react-word-limit';  ///to find a character limit
import {BiUpvote} from 'react-icons/bi'; //For the upvote icon





export class ComplaintListCardComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            data:complaintsData,

        }
    }

    // upvote=(id)=>{
    //      var item=this.state.data[id];
    //      console.log(item)
    //      item.upvotes+=1;
    //      this.state.data[id]=item;
    // }

    

    increment = () => {
        this.setState({ clicks: this.state.clicks + 1 });
      }


    componentDidMount(){
        console.log(this.state.data[0]);
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
        <div style={{padding:"20px 20px 0px 20px"}} className="col-md-6" key={props.complaint.id.toString()}> 
            <Card style={{flex:1, backgroundColor:'#343a40'}}>
            <CardBody>
            <CardTitle>
            <div color="dark" className="row">
            <div className="col-md-9">
            <div> 
                <a href="/complaints/`props.complaint.id`"> 
                    <b style={{color:"white"}}>
                        {props.complaint.title}
                    </b>
                </a>
            </div>
            <br />
            </div> 
            <div className="col-md-3" >
            <b style={{color:"white"}}>{upvotes} </b><span onClick={increment} ><BiUpvote id="upvote" className={isClicked ? "upvote-button" : null} /></span>
            </div>   
            </div>
            </CardTitle>
            <p style={{color:"white"}}>
                <WordLimit limit={100}>{props.complaint.description}</WordLimit> 
            </p>
            </CardBody>
            </Card>
            </div>
    )
}