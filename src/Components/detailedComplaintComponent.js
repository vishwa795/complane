import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {Button, Row, Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

function LabelMaker(props){
    return props.keywords.map((keyword) => {
        return(
            <div className="label-keyword m-1 p-2">
              {keyword.keyword}
            </div>
        )
    })
}
export default function DetailedComplaint(props){
    const openStatus = <Button color="success" disabled>
        <span class="fa fa-lg fa-unlock-alt mr-1"></span>
        Open
        </Button>
    const closedStatus = <Button color="danger" disabled>
        <span class="fa fa-lg fa-lock mr-1"></span>
        Closed</Button>
    const [popUpStatus1,setPopUpStatus1] = useState(false);

    const [popUpStatus2,setPopUpStatus2] = useState(false);

    const [popUpStatus3,setPopUpStatus3] = useState(false);

    return(
        <div className="detailedComplaint">
            <div className="jumbotron bg-dark languages">
                <div className="container">
                    <h1><Link to="/complaints">{props.complaint.state} / {props.complaint.district}</Link></h1>
                </div>
            </div>
            <div className="container">
                <div className="row m-1">
                    <h1>{props.complaint.title}</h1>
                </div>
                <div className="row m-1">
                    {props.complaint.isResolved ?
                        closedStatus: openStatus 
                    }
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-9 p-2">
                        <div className="card complaint-card mb-3">
                            <div className="card-body">
                                <h4>{props.complaint.desc}</h4>
                            </div>
                        </div>
                        <div className="card complaint-card">
                            <div className="card-body">
                                <div className="container">
                                <div className="status-header">
                                    <h3>Status</h3>
                                </div>
                                <ProgressBar
                                    percent={0*100/3}
                                    filledBackground="linear-gradient(to right, rgba(63, 138, 204, 0.767), rgba(0, 116, 217, 0.767))"
                                >
                                    <Step transition="scale">
                                    {({ accomplished }) => (
                                        <div>
                                        <div
                                        id="Popover1" onMouseOver={()=>setPopUpStatus1(true)} onMouseLeave={()=>setPopUpStatus1(false)} className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                      >
                                          <Popover placement="bottom" isOpen={popUpStatus1} target="Popover1" className="bg-dark" >
                                                <PopoverHeader>Complaint Registered</PopoverHeader>
                                                <PopoverBody>Your Complaint has been registered into our portal. Concerned Authorities will soon look into the complaint and update the status.</PopoverBody>
                                            </Popover>
                                    </div>
                                    </div>
                                    )}
                                    </Step>
                                    <Step transition="scale">
                                    {({ accomplished }) => (
                                        <div>
                                            <div
                                            id="Popover2" onMouseOver={()=>setPopUpStatus2(true)} onMouseLeave={()=>setPopUpStatus2(false)} className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                            >
                                                <Popover placement="bottom" isOpen={popUpStatus2} target="Popover2">
                                                        <PopoverHeader>Issue Identified</PopoverHeader>
                                                        <PopoverBody>Issue has been Identified and verified by the Government personnel and the complaint is currently being resolved.</PopoverBody>
                                                </Popover>
                                            </div>
                                        </div>
                                    )}
                                    </Step>
                                    <Step transition="scale">
                                    {({ accomplished }) => (
                                        <div>
                                            <div
                                                id="Popover3" onMouseOver={()=>setPopUpStatus3(true)} onMouseLeave={()=>setPopUpStatus3(false)} className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                            >
                                            <Popover placement="bottom" isOpen={popUpStatus3} target="Popover3">
                                                    <PopoverHeader>Issue Resolved</PopoverHeader>
                                                    <PopoverBody>Complaint is resolved by the concerned Authorities and verified.</PopoverBody>
                                                </Popover>
                                            </div>
                                    </div>
                                    )}
                                    </Step>
                                </ProgressBar>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 p-2">
                            <div className="card complaint-card">
                                <div className="card-body">
                                <div className="container">
                                <Row className="mb-2">
                                Assigned to:
                                </Row>
                                <Row>
                                    <h5>{props.complaint.departmentTag.replaceAll("_"," ")}</h5>
                                </Row>
                                <hr />
                                <Row className="mb-2">
                                Labels:
                                </Row>
                                <Row>
                                    <LabelMaker keywords={props.complaint.keywordSet} />
                                </Row>
                                <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

