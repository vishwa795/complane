/* THIS PAGE IS NOT REQUIRED */

import React, {Component} from 'react';
import {complaintsData} from "../shared/exampleData";
import {Link} from 'react-router-dom';


function LabelMaker(props){
    return props.keywords.map((keyword) => {
        return(
            <div className="m-1" style={{display:"inline-block"}}>
                <span class="badge badge-light">
                    {keyword}
                </span>
            </div>
        )
    })
}

export class TrendingComplaintCards extends Component{
    constructor(props){
        super(props);
        this.state={
            data:complaintsData,

        }
    }

    render(){
        const renderComplaints = this.state.data.map((c) =>{
          return(
            <ComplaintCards complaint={c} />
          )
        } )
    

    return(
        <div className="row" style={{marginRight: "0px"}}>  {/*Removes the horizontal scrolling*/}
        {renderComplaints}
        </div>
    );
    }

}


function ComplaintCards(props){
    return(
        <>
        <div className="card  bg-dark" style={{width:"75%", marginLeft:"10%",marginBottom:"1%",marginRight: "0px", backgroundColor:"dark"}}>
            <div className="card-header" style={{fontSize:"150%"}}>
                <Link to={`/complaints/${props.complaint.id}`}><b id="card_title">{props.complaint.title}</b></Link>
                <p style={{float:"right", marginBottom:"0px"}}><LabelMaker keywords={props.complaint.keywords}/></p> 
            </div>
            <div className="card-body">
                <p className="card-text">{props.complaint.description}</p>
            </div>
        </div>
        
        </>
        
    )
}

export default TrendingComplaintCards;