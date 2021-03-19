const folder = "deployments-json";
const repoConfig = {
    "buildtrack-app" : `./${folder}/btapp-deploy.json`,
    "BT" : `./${folder}/BT.json`,
    "buildtrack-microservices" : `./${folder}/services-deploy.json`,    
};

const steps = [
    {
      type: "list",
      name: "type",
      message: "Select Setup / Deployment / Revert",
      choices: ["setup", "deployment","revert"],
      filter: function(val) {
        return val;
      }
    },
    {
      type: "list",
      name: "REPO",
      message: "Select repository to deploy",
      choices: ["buildtrack-app", "BT", "buildtrack-microservices", "AS"],
      filter: function(val) {
        return val;
      }
    },
    {
        type: "list",
        name: "ENVIRONMENT",
        message: "Select Environment",
        choices: ["production", "development"],
        filter: function(val) {
            return val;
        }
    }
];

const pm2 = {
    DEPLOY : "pm2 deploy"
}

module.exports = {repoConfig, steps, pm2};