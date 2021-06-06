import React from "react";
import WordCloud from "./WordCloud"

const WordCloudCards = (props) => {
    return(
        <div className="card  bg-dark" style={{width:"75%", marginLeft:"10%",marginBottom:"2%",marginTop:"2%",marginRight: "0px", backgroundColor:"dark"}}>
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