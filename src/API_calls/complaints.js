function getAllComplaints() {
    fetch(url + '/complaints')
      .then(res => res.json())
}

function getAllComplaintsForUser(uid) {
    fetch(url + '/complaints/user/'+uid)
      .then(res => res.json())
}

function getAllActiveComplaints() {
    fetch(url + '/active')
      .then(res => res.json())
}

function getAllComplaintsForUser(uid) {
    fetch(url + '/complaints/user/'+uid)
      .then(res => res.json())
}