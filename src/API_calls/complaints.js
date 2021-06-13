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

export async function getAllComplaints(state, sort) {
  return new Promise(async (resolve, reject)=>{
    try{
      const complaints = await  fetch(url + `/complaints?state=${state}&sort=${sort}`).then(res => res.json());
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


export function getAllActiveComplaints(state, sort) {
  return new Promise(async (resolve, reject)=>{
    try{
      const activeComplaints = await fetch(url+`/complaints/active?state=${state}&sort=${sort}`).then(res => res.json());
      resolve(activeComplaints);
    }
    catch(error){
      reject(error);
    }
  })
}

export function getAllNewComplaints(state, sort) {
  return new Promise(async (resolve, reject)=>{
    try{
      const newComplaints = await fetch(url + `/complaints/new?state=${state}&sort=${sort}`).then(res => res.json());
      resolve(newComplaints);
    }
    catch(error){
      reject(error);
    }
  })
    
}

export function getAllResolvedComplaints(state, sort) {
  return new Promise(async (resolve, reject)=>{
    try{
      const resolvedComplaints = await fetch(url + `/complaints/resolved?state=${state}&sort=${sort}`).then(res => res.json());
      resolve(resolvedComplaints);
    }
    catch(error){
      reject(error);
    }
  })
}

export function getAllNewResolvedComplaints(state) {
  return new Promise(async (resolve, reject)=>{
    try{
      const newResolvedComplaints = await fetch(url +`/complaints/resolvedToday?state=${state}`).then(res => res.json())
      resolve(newResolvedComplaints);
    }
    catch(error){
      reject(error);
    }
  })
}

export async function getActiveComplaintCount(state) {
  return new Promise(async (resolve, reject)=>{
    try{
      const activeComplaintsCount = await fetch(url + `/complaints/count/active?state=${state}`).then(res => res.json());
      resolve(activeComplaintsCount);
    }
    catch(error){
      reject(error);
    }
  })
}

export function getResolvedComplaintCount(state) {
  return new Promise(async (resolve, reject)=>{
    try{
      const resolvedComplaintsCount = await fetch(url + `/complaints/count/resolved?state=${state}`).then(res => res.json());
      resolve(resolvedComplaintsCount);
    }
    catch(error){
      reject(error);
    }
  })
    
}

export async function getActiveTodayComplaintCount(state) {
  return new Promise(async (resolve, reject)=>{
    try{
      const activeTodayComplaintCount = await fetch(url + `/complaints/count/active/today?state=${state}`).then(res => res.json());
      resolve(activeTodayComplaintCount);
    }
    catch(error){
      reject(error);
    }
  })
}

export function getResolvedTodayComplaintCount(state) {
  return new Promise(async (resolve, reject)=>{
    try{
      const resolvedTodayComplaintCount = await fetch(url + `/complaints/count/resolved/today?state=${state}`).then(res => res.json())
      resolve(resolvedTodayComplaintCount);
    }
    catch(error){
      reject(error);
    }
  })
}

async function postComplaintRegister(complaintObject) {
  return new Promise(async (resolve, reject)=>{
    try{
      const complaintRegister = await fetch(url + '/complaints/register',{
        method:"POST",
        body:JSON.stringify(complaintObject)
      }).then(res => res.json())
      resolve(complaintRegister);
    }
    catch(error){
      reject(error);
    }
  })
}