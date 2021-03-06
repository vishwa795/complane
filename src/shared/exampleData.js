import React,{Component} from 'react';
class Example extends Component{
    constructor(props){
        super(props);
        this.state={
            isHovered:false,
            hoverData:123,
            nonHoverData:456
        }
    }
    mouseOver = ()=>{
        this.setState({isHovered:true});
    }
    mouseLeave = ()=>{
        this.setState({isHovered:false});
    }
    render(){
       return(
        <div>
            <div className="box" onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
            </div>
            <div className="databox">
                <h1>Data is : {this.state.isHovered ? this.state.hoverData : this.state.nonHoverData}</h1> 
            </div>
        </div>
       )}
}













export const stateData ={
    "IN-AN": {
        active:"10",
        new_today:"68",
        res_today:"17"
    },
    "IN-AP":{
        active:"14",
        new_today:"45",
        res_today:"78",
    },
    "IN-TN":{
        active:"19",
        new_today:"87",
        res_today:"76",
    },
    "IN-KA":{
        active:"69",
        new_today:"69",
        res_today:"69",
    },
    "IN-KL":{
        active:"12",
        new_today:"13",
        res_today:"14",
    }
}