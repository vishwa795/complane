import React,{useState} from "react";
import Select from 'react-select';
import {Form,Button} from 'reactstrap';
import {Col,Spinner} from "reactstrap";
import {state_list} from '../shared/state_list';
import dept_list from '../shared/dept_list';

import {postComplaintRegister, getDepartmentForComplaints} from '../API_calls/complaints'

function NewComplaintFormComponent(props){
    
    
    const [result,TestingValue]=useState();
    const [isDeptLoading,setIsDeptLoading] = useState(false);
    
    const [stateCode,setStateCode] = useState();

    const TestingHandler = e =>{
        TestingValue(e.value);
        setStateCode(e.stateCode);
    }

    const [result2,Testing] = useState(result);
    const TestingHandler2 = e =>{
        console.log('React Select ',e);
        Testing(e);
    }

    
    const [title,setTitle] = useState();
    const [description,setDescription] = useState();
    
    
    const[optionState,setOptionState]= useState();
   
    const deptHandler = (dept) => {
        setOptionState(dept);
    }

    const submitComplaint = () =>{
        let complaintObject ={};
        complaintObject.title = title;
        complaintObject.desc = description;
        complaintObject.state = stateCode;
        complaintObject.district = result2.value;
        complaintObject.deptName = optionState.value;
        console.log(complaintObject)
        postComplaintRegister(complaintObject);
   }

   const continueComplaint = async () =>{
    try{
        setIsDeptLoading(true);
        let complaintObject ={};
        complaintObject.title = title;
        complaintObject.desc = description;
        complaintObject.state = stateCode;
        complaintObject.district = result2.value;
        const dept = await getDepartmentForComplaints(complaintObject.title+" "+complaintObject.desc);
        const deptName = dept.department_predicted;
        console.log(deptName);
        const deptObject = {
            label:deptName,
            value:deptName
        }
        //    alert(JSON.stringify(complaintObject));

        setOptionState(deptObject);
        setIsDeptLoading(false);
        console.log(deptName);
    }
    catch(error){
        setIsDeptLoading(false);
        console.log(error);
    }
}

    return(
       <>
        {console.log(optionState)}
        <Col id="modal_state_name" sm={6}>
           Please select your <b>State : </b>
        </Col>
        
        <Col sm={12}>
          <b id="modal_state_name_dropdown" ><Select options={state_list} onChange={TestingHandler}/></b>
        </Col>
        
        <br/>
        
   
        {result?
            <>
            <Form>
                <Col id="modal_district_name" >
                    Please select your <b>District : </b>
                </Col>

                <Col>
                    <b id="modal_district_name_dropdown">
                        <Select options={result} onChange={TestingHandler2} />
                    </b>
                </Col>
                {result2?<>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mx-auto">
                            
                            <br/><br/>
                                                        
                            <div className="form-group">
                                <input type="text" id="title" className="form-control" value={title} onChange={(event)=>setTitle(event.target.value)} required></input>
                                <label className="form-control-placeholder" for="title" >Enter the <b>Title</b></label>
                                
                            </div>
                            <br/>
                            <div className="form-group">
                                <textarea type="text" id="description" value={description} onChange={(event)=>setDescription(event.target.value)} className="form-control" required></textarea>
                                <label className="form-control-placeholder" for="description">Enter the <b>Description</b></label>
                            </div>
                            <div className="text-center">
                                {isDeptLoading?
                                <Spinner color="primary" />
                                :
                                <Button color="primary" outline onClick={continueComplaint}>Continue</Button>
                                }
                                {/* <Button color="danger" outline onClick={props.toggle}>Cancel</Button> */}
                            </div>
                            {optionState&&
                            <>  
                                <Col id="modal_dept_name" sm={12}>
                                    <b>Department : </b>
                                </Col>
                                
                                <Col sm={12}>
                                    <b id="modal_dept_name_dropdown" ><Select options={dept_list} onChange={deptHandler} value={optionState} /></b>
                                </Col>

                                <br/>
                                <div className="text-center">
                                    <Button color="primary" outline onClick={submitComplaint}>Submit</Button>{' '}
                                    <Button color="danger" outline onClick={props.toggle}>Cancel</Button>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
                </>:<p/>}    
                </Form>
            </>:<p/>
        }
           
        
        
        </>
    )
}

export default NewComplaintFormComponent;