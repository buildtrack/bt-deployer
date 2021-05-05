#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const {repoConfig,steps,pm2} = require("./config/repoConfig");
const shell = require("shelljs");

// deployer init event
const init = () => {
  log.show(
    chalk.white.bgBlueBright.bold(">> Welcome to BT Deployer")
  );
};

// initialize configuration
const initConfig = () => {
  return inquirer.prompt(steps);
};

// execute any shell command
const deploy = async(command) => {
  return shell.exec(command).code;
};

// helper for displaying success message display
const success = message => {
  log.show(
    chalk.white.bgGreen.bold(message)
  );
};

// log helper for logging messages
const log = (function () {
  let log = "";

  return {
      add: function (msg) { log += msg + "\n"; },
      show: function (msg) { console.log(msg); log = ""; }
  }
})();

const runDeployment = async () => {
    // show script introduction
    init();

    // display deployment options
    const selections = await initConfig();
    const { type, REPO, ENVIRONMENT } = selections;

    // select config as selected options
    const configFile = repoConfig[REPO];
    log.show(chalk.white.bgCyan.bold(`>> Starting deployment for "${REPO}"`));
    if(configFile){
      let status;

      // execute the deployment
      
      console.log(`${pm2.DEPLOY} ${configFile} ${ENVIRONMENT} ${type}`);
      if(type == "setup & deployment"){
        status = await deploy(`${pm2.DEPLOY} ${configFile} ${ENVIRONMENT} setup`);
        status = deploy(`${pm2.DEPLOY} ${configFile} ${ENVIRONMENT} --force`);
      }
      else
        status = deploy(`${pm2.DEPLOY} ${configFile} ${ENVIRONMENT} ${type} --force`);

      success(`>> Deployment Completed "${REPO} (${ENVIRONMENT})"`);
    }
    else
      log.show(chalk.red.bold(`No configuration found !!!`));
};

// start the deployment process
runDeployment();