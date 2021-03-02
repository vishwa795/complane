import react,{Component} from 'react';
import Typist from 'react-typist';
import SvgComponent from './mapComponent';
function Home(props){
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-5">
                    <div class="svg-container">
                        <SvgComponent />
                    </div>
                </div>
                <div className="col-12 col-md-7">
                    <Typist>
                    <div className="top-text">
                        <br/>
                        <h1>781 Districts. 26 States. 1 Stop for all Complaints</h1>
                    </div>
                    <div className="mid-text">
                        <br/>
                        <h1 className="">Register Your Complaints</h1>
                    </div>
                    <div className="bottom-text m-4">
                        <br/>
                        <span>
                        <h1>Active: 347<small>(+34)</small></h1>
                        <br />
                        <h1>Resolved Today: 29</h1>
                        </span>
                    </div>
                    </Typist>
                    <div class="pie-chart">    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;