import React, {Component} from 'react';
import Wordcloud from './WordCloud'
import TrendingComplaintsCards from './TrendingComplaintsCards'
import Select from 'react-select';
import {Col} from "reactstrap";
import WordCloudCards from './WordCloudCards';

import dept_list from '../shared/dept_list'


const TrendingComplaints = (props) => {
    
        return(
            <>
                <div id="trendingcomponentmain" className="text-center">
                    <h1 color="white" style={{fontSize:"250%"}}><u>Trending Topics</u></h1>
                    <br/>
                    <div className="col-md-3"></div>
                    <div className="text-center col-md-6" style={{textAlign:"center", marginLeft:"auto",marginRight:"auto"}}>
                        <Col id="dept_list" sm={12}>
                            <h4>Please select the desired <b>Department : </b></h4>
                        </Col>
                        <Col sm={12}>
                            <b id="dept_list_dropdown" color="black" style={{color:"#4c4c4c", width:"100%", textAlign:"left"}} ><Select options={dept_list}/></b>
                        </Col>
                    </div>
                    <div className="col-md-3"></div>

                </div>
                
                <hr/>
                
                <div className="text-center">
                    <WordCloudCards {...props}/> 
                    <WordCloudCards {...props}/>
                    <WordCloudCards {...props}/>

                    {/* <Wordcloud {...props}/> */} 
                </div>
                
            </>    
        );
    
}

export default TrendingComplaints;