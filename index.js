// Require npm packages and assign to consts
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

// Promisify fs.writeFile
const writeFileAsync = util.promisify(fs.writeFile);

// Function to prompt user in CLI for info to populate README
function promptUser() {
  
    // Get GitHub info from user
    return inquirer.prompt({
    message: "Enter your GitHub username:",
    name: "username",
    }).then(function ({ username }) {

        // Create URL for GitHub API call
        const queryUrl = `https://api.github.com/users/${username}`;

        // Use GitHub API to retrieve user info
        axios.get(queryUrl).then(function(userInfo) {
        email = userInfo.data.email;
        picture = userInfo.data.avatar_url;

        // Get README info from user
        inquirer
            .prompt ([
                {
                    message: "What is the title of your project?",
                    name: "title"
                },
                {
                    message: "What is a brief description of your project?",
                    name: "description"
                },
                {
                    message: "How is your project installed?",
                    name: "installation"
                },
                {
                    message: "What will this project be used for?",
                    name: "usage"
                },
                {
                    message: "Enter a table of contents:",
                    name:"contents"
                },
                {
                    message: "Who contributed to this project?",
                    name: "contributors"
                },
                {
                    message: "What tests were done on this project?",
                    name: "tests"
                },
                {
                    message: "Which license would you like to use?",
                    name: "license"
                },
                {
                    message: "Which badge would you like to use?",
                    name: "badge"
                }
            ]);
        })
    })
}

// Function to create README format
function generateMarkdown(res) {

    return `
        # ${res.title} ${res.badge} \n
        ## Table of Contents \n
        - ${res.contents} \n
        ## Description \n
        - ${res.description} \n
        ## Installation \n
        - ${res.installation} \n
        ## Usage \n
        - ${res.usage} \n
        ## Tests \n
        - ${res.tests} \n
        ### License
        - ${res.license} \n
        ### Contributors \n
        - ${res.contributors} \n
        ### Questions \n
        - ${email} \n
        ![profile pic](${picture})`;
}

// Call functions
promptUser()
    .then(function(answers) {
        const MD = generateMarkdown(answers);

        // Write README file using data retrieved from CLI
        return writeFileAsync("README.md", MD + "\n");
    })
    .then(function() {
        console.log("Success!");
    })
    .catch(function(err) {
        console.log(err);
    });

