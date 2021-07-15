import React, {useEffect,useState} from 'react';
import Wordcloud from './WordCloud'
import TrendingComplaintsCards from './TrendingComplaintsCards'
import Select from 'react-select';
import {Col, Spinner} from "reactstrap";
import WordCloudCards from './WordCloudCards';

import dept_list from '../shared/dept_list'

const MapTrendingTopics = (props) =>{
    return(
        props.trendingTopics.map((topic) =>{
        return(
            <WordCloudCards topic={topic} />
        )
    })
    )
}

const TrendingComplaints = (props) => {
    const [trendingTopics,setTrendingTopics] = useState([]);
    const [selectedDept,setSelectedDept] = useState({label:'Department_of_Telecommunications', value:'Department_of_Telecommunications'});
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        fetch("http://localhost:4000/trendingTopics?dept="+selectedDept.value)
        .then(res=>res.json())
        .then((response) =>{
            console.log(response);
            setTrendingTopics(response);
            setIsLoading(false);
        })
    },[selectedDept])
    if(isLoading){
        return(
            <div className="container">
                <div className="text-center mt-5">
                    <Spinner color="primary" />
                </div>
            </div>
            )
    }
        return(
            <div className="card-bg">
                <div id="trendingcomponentmain" className="text-center">
                    <h1 color="white" style={{fontSize:"250%"}}><u>Trending Topics</u></h1>
                    <br/>
                    <div className="col-md-3"></div>
                    <div className="text-center col-md-6" style={{textAlign:"center", marginLeft:"auto",marginRight:"auto"}}>
                        <Col id="dept_list" sm={12}>
                            <h4>Please select the desired <b>Department : </b></h4>
                        </Col>
                        <Col sm={12}>
                            <b id="dept_list_dropdown" color="black" style={{color:"#4c4c4c", width:"100%", textAlign:"left"}} ><Select value={selectedDept} onChange={setSelectedDept} options={dept_list}/></b>
                        </Col>
                    </div>
                    <div className="col-md-3"></div>

                </div>
                <div className="container">
                    <hr />
                    {trendingTopics.length>0?
                    <div className="text-center">
                    <MapTrendingTopics trendingTopics={trendingTopics} {...props} />
                    </div>
                    :
                    <div className="text-center text-danger mt-3">
                        <h3>No Popular topics found for this Department</h3>
                    </div>
                    }
                </div>
                
            </div>    
        );
    
}

export default TrendingComplaints;