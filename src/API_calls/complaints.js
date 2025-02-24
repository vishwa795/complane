import { store } from 'react-notifications-component';
/*
List of constants in this script : 

complaints
userComplaints
activeComplaints
newComplaints
resolvedComplaints
newResolvedComplaints
activeComplaintsCount
resolvedComplaintsCount
activeTodayComplaintCount
resolvedTodayComplaintCount
complaintRegister
*/

const url ="http://localhost:4000"
const FlaskUrl = "http://localhost:5000"

export async function getAllComplaints(state="ALL", sort="default", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const complaints = await  fetch(url + `/complaints?state=${state}&sort=${sort}&dept=${dept}`).then(res => res.json());
      resolve(complaints);
    }
    catch(error){
      reject(error)
    }
  }) 
}


export async function getAllTrendingComplaints(TopicID) {
  return new Promise(async (resolve, reject)=>{
    try{
      const complaints = await  fetch(`http://localhost:4000/trendingTopics/${TopicID}`).then(res => res.json());
      resolve(complaints);
    }
    catch(error){
      reject(error)
    }
  }) 
}




export function getAllComplaintsForUser(uid, sort) {
  return new Promise(async (resolve, reject)=>{
    try{
      const userComplaints = await fetch(url + `/complaints/user/${uid}?sort=${sort}`).then(res => res.json())
      resolve(userComplaints);
    }
    catch(error){
      reject(error)
    }
  }) 
}


export function getAllActiveComplaints(state="ALL", sort="default", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const activeComplaints = await fetch(url+`/complaints/active?state=${state}&sort=${sort}&dept=${dept}`).then(res => res.json());
      resolve(activeComplaints);
    }
    catch(error){
      reject(error);
    }
  })
}

export function getAllNewComplaints(state="ALL", sort="default", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const newComplaints = await fetch(url + `/complaints/new?state=${state}&sort=${sort}&dept=${dept}`).then(res => res.json());
      resolve(newComplaints);
    }
    catch(error){
      reject(error);
    }
  })
    
}

export function getAllResolvedComplaints(state="ALL", sort="default", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const resolvedComplaints = await fetch(url + `/complaints/resolved?state=${state}&sort=${sort}&dept=${dept}`).then(res => res.json());
      resolve(resolvedComplaints);
    }
    catch(error){
      reject(error);
    }
  })
}

export function getAllNewResolvedComplaints(state="ALL", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const newResolvedComplaints = await fetch(url +`/complaints/resolvedToday?state=${state}&dept=${dept}`).then(res => res.json())
      resolve(newResolvedComplaints);
    }
    catch(error){
      reject(error);
    }
  })
}

export async function getActiveComplaintCount(state="ALL", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const activeComplaintsCount = await fetch(url + `/complaints/count/active?state=${state}&dept=${dept}`).then(res => res.json());
      resolve(activeComplaintsCount);
    }
    catch(error){
      reject(error);
    }
  })
}

export function getResolvedComplaintCount(state="ALL", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const resolvedComplaintsCount = await fetch(url + `/complaints/count/resolved?state=${state}&dept=${dept}`).then(res => res.json());
      resolve(resolvedComplaintsCount);
    }
    catch(error){
      reject(error);
    }
  })
    
}

export async function getActiveTodayComplaintCount(state="ALL", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const activeTodayComplaintCount = await fetch(url + `/complaints/count/active/today?state=${state}&dept=${dept}`).then(res => res.json());
      resolve(activeTodayComplaintCount);
    }
    catch(error){
      reject(error);
    }
  })
}

export function getResolvedTodayComplaintCount(state="ALL", dept="ALL") {
  return new Promise(async (resolve, reject)=>{
    try{
      const resolvedTodayComplaintCount = await fetch(url + `/complaints/count/resolved/today?state=${state}&dept=${dept}`).then(res => res.json())
      resolve(resolvedTodayComplaintCount);
    }
    catch(error){
      reject(error);
    }
  })
}

export async function postComplaintRegister(complaintObject) {
  return new Promise(async (resolve, reject)=>{
    try{
      const accessToken = localStorage.getItem('accessToken');
      const complaintRegister = await fetch(url + '/complaints/register',{
        method:"POST",
        body:JSON.stringify(complaintObject),
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+accessToken
        }
      }).then(res => res.json())
      store.addNotification({
        title: "Complaint Registered",
        message: "Your Complaint has been registered Successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      resolve(complaintRegister);
    }
    catch(error){
      store.addNotification({
        title: "Complaint Could not be Registered",
        message: "Your Complaint could not be registered. Please try again later",
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
      reject(error);
    }
  })
}

export function getDepartmentForComplaints(complaint) {
  return new Promise(async (resolve, reject)=>{
    try{
      const userComplaintsDepartment = await fetch(url + `/complaints/fastText`, {
        method:"POST",
        body:JSON.stringify({complaint: complaint}),
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res => res.json())
      resolve(userComplaintsDepartment);
    }
    catch(error){
      reject(error)
    }
  }) 
}

export const upvoteComplaint = async (complaintID) => {
  return new Promise((resolve,reject)=>{
      const accessToken = localStorage.getItem('accessToken');
      if(!accessToken){
        reject("Not logged in");
      }
      fetch(`${url}/complaints/vote/${complaintID}`, {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+accessToken
        }
      })
      .then(response => {
        if(response.ok){
          return response.json(); 
        }
      })
      .then(updatedComplaint => {
        resolve(updatedComplaint);
      })
      .catch(error => {
        reject(error);
      })
  })
} 

export const getSingleComplaintById = (complaintID) => {
  return new Promise((resolve,reject)=> {
    fetch(`${url}/complaints/${complaintID}`)
    .then(response => {
      if(response.ok){
        return response.json();
      }
    })
    .then(complaint => resolve(complaint))
    .catch(error => reject(error))
  })
}