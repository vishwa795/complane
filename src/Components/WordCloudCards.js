import React,{useState} from "react";
import WordCloud from "./WordCloud"
import {Link} from "react-router-dom";

const WordCloudCards = (props) => {
    const keywords = props.topic.keyword.relatedKeywords.map((keyword)=>{
        const res = {
            value:keyword.keyword.replace(" ","_"),
            count:keyword.mentions
        };
        return res;
    });
    return(
        <Link to={`/trendingtopics/${props.topic._id}` }>
        <div id="wordcloudcard" className="card  bg-dark" >
            <div className="card-header" style={{fontSize:"150%"}}>
               <b color="#DAD6D6">Total Mentions: {props.topic.totalMentions}</b>
            </div>
            <div className="card-body">
                <p className="card-text"><WordCloud keywords={keywords}/></p>
            </div>
        </div>
        </Link>
        
    )
}


export default WordCloudCards;