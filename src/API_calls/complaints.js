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

async function getAllComplaints(state, sort) {
  const complaints = await  fetch(url + '/complaints',
          state=state,
          sort=sort,
    )
      .then(res => res.json())
     //Console log complaints here will print complaints after they are fetched from db
}

async function getAllComplaintsForUser(uid, sort) {
    const userComplaints = await fetch(url + '/complaints/user/'+uid,
    sort=sort,
  )
      .then(res => res.json())
}


async function getAllActiveComplaints(state, sort) {
    const activeComplaints = await fetch(url + '/complaints/active',
    state=state,
    sort=sort,
    )
      .then(res => res.json())
}

async function getAllNewComplaints(state, sort) {
    const newComplaints = await fetch(url + '/complaints/new',
          state=state,
          sort=sort,
    )
    .then(res => res.json())
}

async function getAllResolvedComplaints(state, sort) {
    const resolvedComplaints = await fetch(url + '/complaints/resolved',
    state=state,
    sort=sort,
    )
      .then(res => res.json())
}

async function getAllNewResolvedComplaints(state) {
    const newResolvedComplaints = await fetch(url + '/complaints/resolvedToday',
    state=state,
    )
      .then(res => res.json())
}

async function getActiveComplaintCount(state) {
    const activeComplaintsCount = await fetch(url + '/complaints/count/active',
    state=state,
    )
      .then(res => res.json())
}

async function getResolvedComplaintCount(state) {
    const resolvedComplaintsCount = await fetch(url + '/complaints/count/resolved',
    state=state,
    )
      .then(res => res.json())
}

async function getActiveTodayComplaintCount(state) {
    const activeTodayComplaintCount = await fetch(url + '/complaints/count/active/today',
    state=state,
    )
      .then(res => res.json())
}

async function getResolvedTodayComplaintCount(state) {
    const resolvedTodayComplaintCount = await fetch(url + '/complaints/count/resolved/today',
    state=state,
    )
      .then(res => res.json())
}

async function postComplaintRegister() {
    const complaintRegister = await fetch(url + '/complaint/register')
      .then(res => res.json())
}