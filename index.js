#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const {repoConfig,steps} = require("./config/repoConfig");
const shell = require("shelljs");

const init = () => {
  console.log(
    chalk.white.bgBlueBright.bold(">> Welcome to BT Deployer")
  );
};

const initConfig = () => {
  return inquirer.prompt(steps);
};

const deploy = (command) => {
  return shell.exec(command);
};

const success = message => {
  console.log(
    chalk.white.bgGreen.bold(message)
  );
};

const runDeployment = async () => {
    // show script introduction
    init();

    // ask questions
    const selections = await initConfig();
    const { type, REPO, ENVIRONMENT } = selections;

    const configFile = repoConfig[REPO];
    console.log(chalk.white.bgCyan.bold(`>> Starting deployment for ${REPO}`));
    if(configFile){
      if(type != "setup")
        deploy(`pm2 deploy ${configFile} ${ENVIRONMENT}`);
      else
        deploy(`pm2 deploy ${configFile} ${ENVIRONMENT} ${type}`);
      success(`Deployment Completed - ${REPO} (${ENVIRONMENT})`);
    }
    else
        console.log(chalk.red.bold(`No configuration found !!!`));
};

runDeployment();