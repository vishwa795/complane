function getAllComplaints(state, sort) {
    fetch(url + '/complaints')
      .then(res => res.json())
}

function getAllComplaintsForUser(uid, sort) {
    fetch(url + '/complaints/user/'+uid)
      .then(res => res.json())
}

function getAllActiveComplaints(state, sort) {
    fetch(url + '/complaints/active')
      .then(res => res.json())
}

function getAllNewComplaints(state, sort) {
    fetch(url + '/complaints/new')
      .then(res => res.json())
}

function getAllResolvedComplaints(state, sort) {
    fetch(url + '/complaints/resolved')
      .then(res => res.json())
}

function getAllNewResolvedComplaints(state) {
    fetch(url + '/complaints/resolvedToday')
      .then(res => res.json())
}

function getActiveComplaintCount(state) {
    fetch(url + '/complaints/count/active')
      .then(res => res.json())
}

function getResolvedComplaintCount(state) {
    fetch(url + '/complaints/count/resolved')
      .then(res => res.json())
}

function getActiveTodayComplaintCount(state) {
    fetch(url + '/complaints/count/active/today')
      .then(res => res.json())
}

function getResolvedTodayComplaintCount(state) {
    fetch(url + '/complaints/count/resolved/today')
      .then(res => res.json())
}

function postComplaintRegister() {
    fetch(url + '/complaint/register')
      .then(res => res.json())
}