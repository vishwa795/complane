import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Button, Row, Popover,PopoverBody,PopoverHeader, Spinner} from 'reactstrap';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { getSingleComplaintById, upvoteComplaint } from '../API_calls/complaints';
import { BiUpvote } from 'react-icons/bi';
import { store } from 'react-notifications-component';

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
    const complaintID = props.complaintID;
    const [complaint,setComplaint] = useState({})
    const [isComplaintLoading,setComplaintLoading] = useState(true);
    useEffect(async ()=>{
        setComplaintLoading(true);
        const complaint = await getSingleComplaintById(props.complaintID);
        setComplaint(complaint);
        setComplaintLoading(false);
    },[])
    const userID = props.user._id;
    //from card list
    useEffect(()=>{
        if(complaint.votes){
            updateUpvotes(complaint.votes.length);
            setIsClicked(complaint.votes.indexOf(userID)!==-1)
        }
    },[complaint])
    const [upvotes,updateUpvotes]=useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const increment = async () => {
        if(userID!="NOT_LOGGED_IN" && !complaint.isResolved){
            if(isClicked){
                updateUpvotes(upvotes-1);
            }
            else{
                updateUpvotes(upvotes+1);
            }
            setIsClicked(!isClicked);
            console.log(complaint._id);
            await upvoteComplaint(complaint._id);
        }
        else if(complaint.isResolved){
            store.addNotification({
                title: "Complaint Already Resolved",
                message: "The Complaint you are trying to upvote has already been resolved",
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
        }
        else{
            store.addNotification({
                title: "Login for Upvoting",
                message: "You cannot upvote complaints while not logged in. Kindly login to upvote",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
        }
    }

    const openStatus = <Button color="success" disabled>
        <span class="fa fa-lg fa-unlock-alt mr-1"></span>
        Open
        </Button>
    const closedStatus = <Button color="danger" disabled>
        <span class="fa fa-lg fa-lock mr-1"></span>
        Closed</Button>
    if(isComplaintLoading){
        return(
            <div className="container text-center">
                <div className="mt-5">
                    <Spinner color="primary" />
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="detailedComplaint">
                <div className="jumbotron bg-dark languages">
                    <div className="container">
                        <h1><Link to="/complaints">{complaint.state} / {complaint.district}</Link></h1>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-9 p-2">
                            <div className="row m-1">
                                <h1>{complaint.title}</h1>
                            </div>
                            <div className="row m-1">
                                {complaint.isResolved ?
                                    closedStatus: openStatus 
                                }
                                <div className="ml-auto">
                                    <h3 id="upvote_number" >{upvotes} <span onClick={increment} ><BiUpvote id="upvote" className={isClicked ? "upvote-button" : null} /></span></h3>
                                </div>
                            </div>
                            <hr />
                            <div className="card complaint-card mb-3">
                                <div className="card-body">
                                    <h4>{complaint.desc}</h4>
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
                                        <h5>{complaint.departmentTag.replaceAll("_"," ")}</h5>
                                    </Row>
                                    <hr />
                                    <Row className="mb-2">
                                    Labels:
                                    </Row>
                                    <Row>
                                        <LabelMaker keywords={complaint.keywordSet} />
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
}

