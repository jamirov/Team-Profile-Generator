const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern")
const team = [];

function promptForManager(){
    return inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'What is your Managers name?',
    },
    {
      type: 'number',
      name: 'managerId',
      message: 'What is your Mangers employee ID?',
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'What is your managers email adddress?',
    },
    {
      type: 'number',
      name: 'managerPhone',
      message: 'What is your managers office number?',
    },
    {
      type: "list",
      name: "role",
      message: "Who do you want add to your team?",
      choices: ["Engineer","Intern","Done Exit"],
      
  },
    
  ])
}

function promptForEngineer(){
  return inquirer.prompt([
  {
    type: 'input',
    name: 'engineerName',
    message: 'What is your Engineers name?',
  },
  {
    type: 'number',
    name: 'engineerId',
    message: 'What is your Engineers employee ID?',
  },
  {
    type: 'input',
    name: 'engineerEmail',
    message: 'What is your Engineers email adddress?',
  },
  {
    type: 'input',
    name: 'engineerGithub',
    message: 'What is your Engineers Github username?',
  },
  {
    type: "list",
    name: "role",
    message: "Who do you want add to your team?",
    choices: ["Engineer","Intern","Done Exit"],
},
  
])
}


function promptForIntern(){
  return inquirer.prompt([
  {
    type: 'input',
    name: 'internName',
    message: 'What is your Interns name?',
  },
  {
    type: 'number',
    name: 'internId',
    message: 'What is your Internss employee ID?',
  },
  {
    type: 'input',
    name: 'internEmail',
    message: 'What is your Interns email adddress?',
  },
  {
    type: 'input',
    name: 'internSchool',
    message: 'What is your Interns School name?',
  },
  {
    type: "list",
    name: "role",
    message: "Who do you want add to your team?",
    choices: ["Engineer","Intern","Done Exit"],
},
])
}


function runManager(){
  promptForManager().then(function(response){
    const manager = new Manager (response.managerName, response.managerId, response.managerEmail, response.managerPhone)
    team.push(manager);
    if (response.role === "Engineer"){
    runEngineer();
  } else if (response.role === "Intern"){
    runIntern();
  } else if ( response.role === "Done Exit"){
    // console.log(team);
    // console.log("Your HTML has been Generated!!!");
    writeFinalHTML(makeManageCard(team), makeEngineerCard(team), makeInternCard(team));
  }
  })
}


function runEngineer(){
  promptForEngineer().then(function(response){
    const engineer = new Engineer (response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)
    team.push(engineer);
    if (response.role === "Engineer"){
    runEngineer();
  } else if (response.role === "Intern"){
    runIntern();
  } else if ( response.role === "Done Exit"){
    // console.log(team);
    // console.log("Your HTML has been Generated!!!");
    writeFinalHTML(makeManageCard(team), makeEngineerCard(team), makeInternCard(team));
    
  }
  })
}

function runIntern(){
  promptForIntern().then(function(response){
    const intern = new Intern (response.internName, response.internId, response.internEmail, response.internSchool)
    team.push(intern);
    if (response.role === "Engineer"){
    runEngineer();
  } else if (response.role === "Intern"){
    runIntern();
  } else if ( response.role === "Done Exit"){
    // console.log(team.filter((employee) => (employee.role === "Intern")) );
    // console.log("Your HTML has been Generated!!!");
    writeFinalHTML(makeManageCard(team), makeEngineerCard(team), makeInternCard(team));
  }
  })
}

function makeManageCard(arr){
 managerObj = arr.filter((employee) => (employee.role === "Manager"));
 const managerHTMLString = 
 `<div class="card " style="width: 18rem; background-color: blue; color: white; " >
  <div class="card-header">
    ${managerObj[0].name} <br>
    <i class="fas fa-mug-hot"></i>  Manager
  </div>
  <ul class="list-group list-group-flush" style="color: black;" >
    <li class="list-group-item">ID:${managerObj[0].id}</li>
    <li class="list-group-item">Email: <a href="">${managerObj[0].email}</a> </li>
    <li class="list-group-item">Office number:${managerObj[0].officeNumber}</li>
    </ul>
  </div>`
 return managerHTMLString;
}
function makeEngineerCard(arr){
  const engineerArr = arr.filter((employee) => (employee.role === "Engineer"));
  // console.log(engineerArr);
  const engineerHTMLString = engineerArr.map(Engineer => 
    `<div class="card  " style="width: 18rem; background-color: blue; color: white; " >
    <div class="card-header">
      ${Engineer.getName()} <br>
      <i class="fas fa-glasses mr-2"></i>  Engineer
    </div>
    <ul class="list-group list-group-flush" style="color: black;" >
      <li class="list-group-item">ID:${Engineer.getId()}</li>
      <li class="list-group-item">Email: <a href="mailto: ">${Engineer.getEmail()}</a></li>
      <li class="list-group-item">GitHub:${Engineer.getGithub()}</li>
    </ul>
</div>`
);
return engineerHTMLString;
}
function makeInternCard(arr){
  const internArr = arr.filter((employee) => (employee.role === "Intern"));
  // console.log(internArr);
  const internHTMLString = internArr.map(intern =>
    `<div class="card  " style="width: 18rem; background-color: blue; color: white; " >
      <div class="card-header">
        ${intern.getName()}  <br>
        <i class="fas fa-user-graduate mr-2"></i>  Intern
      </div>
      <ul class="list-group list-group-flush" style="color: black;" >
        <li class="list-group-item">ID:${intern.getId()}</li>
        <li class="list-group-item">Email: <a href="mailto:">${intern.getEmail()}</a> </li>
        <li class="list-group-item">Shool: ${intern.getSchool()}</li>
      </ul>
    </div>`
  )
return internHTMLString;
}
function writeFinalHTML (manager, engineer, intern){

  fs.writeFile('index.html',`
  <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
            crossorigin="anonymous"
        />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <link rel="stylesheet" href="style.css" />
        <title>My Team</title>
    </head>
    <body>
        <div class="container ">
            <nav class="navbar navbar-light">
                <div class="container-fluid justify-content-center">
                    <span class="mb-0 h1">My Team</span>
                </div>
            </nav>
            <div class="row mt-3 justify-content-center ">
            ${manager}  
            </div>
            <div class="row mt-3 justify-content-center ">
            ${engineer}
            </div>
            <div class="row mt-3 justify-content-center">
            ${intern}
            </div>
        </div>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
            crossorigin="anonymous"
        ></script>
    </body>
</html>

  `, (err) =>
    err ? console.error(err) : console.log('HTML Generated!')
);
}

runManager();







