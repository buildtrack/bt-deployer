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
const deploy = (command) => {
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
      show: function () { console.log(log); log = ""; }
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
    log.show(chalk.white.bgCyan.bold(`>> Starting deployment for ${REPO}`));
    if(configFile){
      let status;

      // execute the deployment
      if(type != "setup")
        status = deploy(`${pm2.DEPLOY} ${configFile} ${ENVIRONMENT}`);
      else
        status = deploy(`${pm2.DEPLOY} ${configFile} ${ENVIRONMENT} ${type}`);

      success(`Deployment Completed - ${REPO} (${ENVIRONMENT})`);
    }
    else
      log.show(chalk.red.bold(`No configuration found !!!`));
};

// start the deployment process
runDeployment();