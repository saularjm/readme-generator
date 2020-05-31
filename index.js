const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username",
  })

  .then(function ({ username }) {

      const queryUrl = `https://api.github.com/users/${username}`;

      axios.get(queryUrl).then(function(userInfo){
      email = userInfo.data.email;
      picture = userInfo.data.avatar_url;

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
        ]).then(function(res) {
          const answers =
            `# ${res.title} ${res.badge} \n
            # Description \n
            ${res.description} \n
            # Table of Contents \n
            ${res.contents} \n
            # Installation \n
            ${res.installation} \n
            # Usage \n
            ${res.usage} \n
            # License
            ${res.license} \n
            # Contributors \n
            ${res.contributors} \n
            # Tests \n
            ${res.tests} \n
            # Questions \n
            ${email} \n
            ![profile image](${picture})`
          
          writeFileAsync("README.md", answers + "\n", function(err) {
            if (err) {
              return console.log(err);
            } 
            console.log("Success!")
          })
        })
      })
 })