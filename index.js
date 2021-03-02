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
    console.log(team);
    console.log("Your HTML has been Generated!!!");
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
    console.log(team);
    console.log("Your HTML has been Generated!!!");
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
    console.log(team.filter((employee) => (employee.role === "Intern")) );
    console.log("Your HTML has been Generated!!!");
    makeManageCard(team);
  }
  })
}

function makeManageCard(arr){
 managerObj = arr.filter((employee) => (employee.role === "Manager"));
 const managerCardString = 
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
 console.log(managerCardString);
}



runManager();







//     .then((response) => {
//     console.log(response);
// if (response.role == 'Engineer'){
// engineerPromptsSync();
// // 
// console.log(response);

// }
// });  
// console.log(team);

// const string = 
// `

// <body>
// <h1>Manager name is ${response.managersName}.</h1>
// <h1>Manager ID ${response.managersId}.</h1>
// <h2>Managers Email ${response.managersEmail}. </h2>
// <h2>Managers Phone number ${response.managersPhone}. </h2>
// <h4>Here are my Git Hub and Linkedin profile links</h4>
// <ul>
//    <li> <a href="${response.linkedUrl}">My linkedin profile link</a>
//    <li> <a href="${response.githubUrl}">My Git Hub profile link</a>
// </ul>
// </body>
// </html>
// ` ;  
//     fs.writeFile('index.html', string, (err) =>
//     err ? console.error(err) : console.log('HTML Generated!')
//     );
    
// });
// }
