import React from "react";
import WordCloud from "./WordCloud"

const WordCloudCards = (props) => {
    return(
        <div id="wordcloudcard" className="card  bg-dark" >
            <div className="card-header" style={{fontSize:"150%"}}>
               <b color="#DAD6D6">Topic Name</b>
            </div>
            <div className="card-body">
                <p className="card-text"><WordCloud {...props}/></p>
            </div>
        </div>
        
    )
}


export default WordCloudCards;