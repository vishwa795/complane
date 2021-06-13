import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {Col, Input} from "reactstrap";
import {state_list} from '../shared/state_list';

function NewComplaintFormComponent(){
    
    
    const [result,TestingValue]=useState(state_list);
    

    const TestingHandler = e =>{
        TestingValue(e.value);
    }

    const [result2,Testing] = useState(result);
    const TestingHandler2 = e =>{
        Testing(e);
    }
    
    
    return(
        <>
       
        <Col id="modal_state_name" sm={6}>
           Please select your <b>State : </b>
        </Col>
        
        <Col sm={12}>
          <b id="modal_state_name_dropdown" ><Select options={state_list} onChange={TestingHandler}/></b>
        </Col>
        
        <br/>
        
   
        {result?
            <>

                <Col id="modal_district_name" >
                    Please select your <b>District : </b>
                </Col>

                <Col>
                    <b id="modal_district_name_dropdown">
                        <Select options={result}onChange={TestingHandler2} />
                    </b>
                </Col>
                {result2?<>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mx-auto">
                            
                            <br/><br/>
                                                        
                            <div className="form-group">
                                <input type="text" id="title" className="form-control" required></input>
                                <label className="form-control-placeholder" for="title" >Enter the <b>Title</b></label>
                                
                            </div>
                            <br/>
                            <div className="form-group">
                                <textarea type="text" id="description" className="form-control" required></textarea>
                                <label className="form-control-placeholder" for="description">Enter the <b>Description</b></label>
                            </div>
                        </div>
                    </div>
                </div>
                </>:<p/>}    
            
            </>:<p/>
        }
           
        
        
        </>
    )
}

export default NewComplaintFormComponent;