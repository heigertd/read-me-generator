const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

let email;
let avatar;

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your github username?"
        },
        {
            type: "input",
            name: "title",
            message: "What is your projects title?"
        },
        {
            type: "input",
            name: "description",
            message: "Enter a short description of your project"
        },
        {
            type: "input",
            name: "table",
            message: "Enter a table of contents"
        },
        {
            type: "input",
            name: "installation",
            message: "Enter anything that needs to be installed"
        },
        {
            type: "input",
            name: "license",
            message: "Enter any licenses"
        },
        {
            type: "input",
            name: "contributes",
            message: "Enter anyone who contributed"
        },
        {
            type: "input",
            name: "tests",
            message: "Enter any tests"
        },
        {
            type: "input",
            name: "question",
            message: "Enter any questions"
        }
    ])
}

function generateReadMe(answers){
    return `Title: ${answers.title}
Description: ${answers.description}
Table of Contents: ${answers.table}
Installations: ${answers.installation}
Liscenses: ${answers.license}
Contributions: ${answers.contribute}
Tests: ${answers.tests}
Questions: ${answers.questions}
${avatar}, ${email}`
}

promptUser().then(function(answers){
    const queryUrl = `https://api.github.com/users/${answers.username}`;
    
    axios.get(queryUrl)
    .then(function(res){
        avatar = res.data.avatar_url;
        email = res.data.email

        let obj = generateReadMe(answers);

        fs.writeFile(`${answers.title}.md`, `${obj}`, function(err){
            if(err){
                console.log(err)
            }
        })

    })
})