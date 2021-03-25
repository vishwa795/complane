import React, {Component} from 'react';
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

    upvote=(id)=>{
        // var item=this.state.data[id];
        // console.log(item)
        // item.upvotes+=1;
        // this.state.data[id]=item;
    }

    componentDidMount(){
        console.log(this.state.data[0]);
    }

    

    render(){
        const renderComments = this.state.data.map((c) =>{
          return(
            
            <div className="col-md-5 p-1 m-1" key={c.id.toString()}> 
            <Card style={{flex:1, backgroundColor:'#343a40'}}>
            <CardBody>
            <CardTitle>
            <div color="dark" className="row">
            <div className="col-md-9">
            <div> 
                <a href="/complaints/${c.id}"> 
                    <b style={{color:"white"}}>
                        {c.title}
                    </b>
                </a>
            </div>
            <br />
            </div> 
            <div className="col-md-3" onClickFunction={this.upvote(c.id)}>
                <b style={{color:"white"}}>{c.upvotes} <BiUpvote/></b>
            </div>   
            </div>
            </CardTitle>
            <p style={{color:"white"}}>
                <WordLimit limit={100}>{c.description}</WordLimit> 
            </p>
            </CardBody>
            </Card>
            </div>
            
            
          );
        } )
    

    return(
        <div className="row">
        
        {renderComments}
        
            
        </div>
    );

}
}