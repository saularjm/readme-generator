// Require node packages
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

// Prompt user
inquirer
    // Get Github username first for Axios call
    .prompt({
        message: "Enter your GitHub username:",
        name: "username",
    })

    .then(function ({ username }) {

        // Build URL for Github API
        const queryUrl = `https://api.github.com/users/${username}`;

        // API call
        axios.get(queryUrl).then(function(userInfo){
        email = userInfo.data.email;
        picture = userInfo.data.avatar_url;

        // Prompt user for README info
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
            }
            ]).then(function(res) {
                //Build README format
                const answers =
                `# ${res.title} ![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)

## Table of Contents 

- [Description](#description) 
- [Installation](#Installation) 
- [Usage](#Usage) 
- [Tests](#Tests) 
- [License](#License) 
- [Contributors](#Contributors) 
- [Questions](#Questions)
            
# Description 

- ${res.description} 

# Installation 

- ${res.installation}

# Usage

- ${res.usage}

# License
            
- ${res.license} 
            
# Contributors 
            
- ${res.contributors} 
            
# Tests 
            
- ${res.tests} 
            
# Questions 
            
- Email: ${email} 
            
![profile image](${picture})`;
          
            //Write README file
            fs.writeFile("README.md", answers, function(err) {
                if (err) {
                    return console.log(err);
                } 
                console.log("Success!")
            })
        })
      })
})
