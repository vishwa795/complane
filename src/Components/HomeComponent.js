import React,{Component} from 'react';
import Typist from 'react-typist';
import SvgComponent from './mapComponent';
import {stateData} from '../shared/exampleData';
import {ComplaintListCardComponent} from './complaintListCardComponent';
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isHovered:false,
            active:"347",
            res_today:"29",
            new_today:"16",
            hoveredState:null
        }
    }
    changeOnHover = (stateCode) =>{
        this.setState({
            hoveredState:stateData[stateCode],
            isHovered:true
        });
    }
    mouseOut = () =>{
        this.setState({
            isHovered:!this.state.isHovered
        })
    } 
    render(){
        var isHovered = this.state.isHovered;
        return(
            <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-7 large-screen-text">
                    <div className="top-text">
                        <br/>
                        <h1>781 Districts. 26 States. 1 Stop for all Complaints</h1>
                    </div>
                    <div className="mid-text">
                        <br/>
                        <h1 className="">Register Your Complaints</h1>
                    </div>
                    <div className="bottom-text">
                        <br/>
                            {isHovered ? 
                            <div>
                            <h1>Active: {this.state.hoveredState.active} 
                                <small>(+{this.state.hoveredState.new_today})</small> 
                            </h1> 
                            <br />
                            <h1>Resolved Today: {this.state.hoveredState.res_today}</h1>
                            </div>
                            : 
                            <div>
                            <h1>Active: {this.state.active} 
                                <small>(+{this.state.new_today})</small> 
                            </h1> 
                            <br />
                            <h1>Resolved Today: {this.state.res_today}</h1>
                            </div>}
                    </div>
                    <div class="pie-chart">    
                    </div>
                </div>
                <div className="col-12 col-md-5">
                    <div>
                        <SvgComponent changeOnHover={this.changeOnHover} mouseOut={this.mouseOut}/>
                    </div>
                </div>
            </div>
            <ComplaintListCardComponent/>
        </div>
        )
    }
}

export default Home;