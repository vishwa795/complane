import react,{Component} from 'react';
import Typist from 'react-typist';
import SvgComponent from './mapComponent';
import {stateData} from '../shared/exampleData';
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
        console.log("HERE is whats inside ",stateCode,stateData[stateCode]);
        this.setState({
            hoveredState:stateData[stateCode],
            isHovered:true
        },()=>{
            console.log("mouse in",this.state)
        });
    }
    mouseOut = () =>{
        this.setState({
            isHovered:!this.state.isHovered
        },()=>console.log("After Mouse Out",this.state))
    } 
    render(){
        var isHovered = this.state.isHovered;
        return(
            <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-7 large-screen-text">
                    <Typist>
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
                        <span>
                            {isHovered ? 
                            <h1>Active: {this.state.hoveredState.active} 
                                <small>(+{this.state.new_today})</small> 
                            </h1> 
                            : 
                            <h1>Active: {this.state.active} 
                                <small>(+{this.state.new_today})</small>
                            </h1>}
                        <br />
                        <h1>Resolved Today: {this.state.res_today}</h1>
                        </span>
                    </div>
                    </Typist>
                    <div class="pie-chart">    
                    </div>
                </div>
                <div className="col-12 col-md-5">
                    <div>
                        <SvgComponent changeOnHover={this.changeOnHover} mouseOut={this.mouseOut}/>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Home;