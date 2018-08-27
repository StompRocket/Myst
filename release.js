const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('inquirer')
const currentVersion = require('./package.json').version
const request = require('request');
const fs = require('fs');
const opn = require('opn')
var fileName = './package.json';
var package = require(fileName);
var shell = require('shelljs');
let askGithubCredentials = () => {
  const questions = [{
      name: 'username',
      type: 'input',
      message: 'Enter your GitHub username or e-mail address:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address.';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password.';
        }
      }
    },
    {
      name: 'version',
      type: 'input',
      message: `What version would you like to release? (current: ${currentVersion})`,
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a version';
        }
      }
    },
  ];
  return inquirer.prompt(questions);
}
clear()
console.log(
  chalk.green(
    figlet.textSync('Myst', {
      horizontalLayout: 'full'
    })
  )
)
const run = async () => {
  const params = await askGithubCredentials()
  console.log(params)
  package.version = params.version;
  fs.writeFile(fileName, JSON.stringify(package, null, 2), function (err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(package));
    console.log('writing to ' + fileName);
    if (shell.exec('npm run build').code !== 0) {
      shell.echo('Error: build failed');
      shell.exit(1);
    } else {
      shell.echo('Success built');

      if (shell.exec('firebase deploy').code !== 0) {
        shell.echo('Error: deploy failed');
        shell.exit(1);
      } else {
        shell.echo('Success deployed');

        if (shell.exec('git add .').code !== 0) {
          shell.echo('Error: Git add failed');
          shell.exit(1);
        } else {
          shell.echo('Success added');

          if (shell.exec(`git commit -m"version ${params.version}"`).code !== 0) {
            shell.echo('Error: Git commit failed');
            shell.exit(1);
          } else {
            shell.echo('Success commited');

            if (shell.exec('git push').code !== 0) {
              shell.echo('Error: Git push failed');
              shell.exit(1);
            } else {
              shell.echo('Success pushed');
              opn('https://github.com/StompRocket/Myst/releases/new')

            }
          }
        }
      }
    }

  });

}

run()
