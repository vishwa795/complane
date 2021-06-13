
export const stateData ={
    "IN-AN": {
        active:"10",
        new_today:"68",
        res_today:"17"
    },
    "IN-AP":{
        active:"14",
        new_today:"45",
        res_today:"78",
    },
    "IN-TN":{
        active:"19",
        new_today:"87",
        res_today:"76",
    },
    "IN-KA":{
        active:"69",
        new_today:"69",
        res_today:"69",
    },
    "IN-KL":{
        active:"12",
        new_today:"13",
        res_today:"14",
    }
}

export const complaintsData = [
    {
        _id:1,
        title:"Roads have a problem",
        desc:"The roads in my area, that is, Kaggadasapura have been very bad. Please try to correct it soon",
        votes:278,
        isResolved:false,
        state:"Karnataka",
        district:"Bengaluru",
        departmentTag: "Department of Roads",
        status:["Complaint Registered","Department Checking on the issue"],
        keywordSet:["Roads","Kaggadasapura"]
    },
    {
        _id:2,
        title:"Water Scarcity",
        desc:"Water has become a lot scarce this year. Kindly help those in need with adequate supply of water. Many people in my area are sufferring without water for basic neccesities",
        votes:37,
        isResolved:false,
        state:"Karnataka",
        district:"Bengaluru",
        departmentTag:"Department of Water",
        status:["Complaint Registered","Department Checking on the issue"],
        keywordSet:["Water","Scarce","Sufferring without water"]
    },
    {
        _id:3,
        title:"Power Cuts",
        desc:"There are regular power cuts in my area and for people like me working from home, this becomes a huge problem as our offices are working online and without regular electricity it causes us inconvinence for completing our daily tasks. Kindly ensure to provide continious supply of electricty!",
        votes:567,
        isResolved:true,
        state:"Tamil Nadu",
        district:"Chennai",
        departmentTag:"Department of Electricity",
        status:["Complaint Registered","Department Checking on the issue","Issue Resolved"],
        keywordSet:["Power cuts","Electricity","Inconvinence"]
    }
]