var developer = {
    title: 'Developer',
    department: 'IT',
    location: '2nd floor'
}

var techLeadTitle = {title: "Tech Lead"};

var techLead = {...developer, ...techLeadTitle};

console.log(techLead);