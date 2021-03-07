module.exports = {
  apps : [{
    name: "xd0m3",
    script: 'index.js',
    watch: true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : [{host: '64.225.104.243', port: "17532"}],
      ref  : 'origin/main',
      repo : 'git@github.com:visualroam/me.git',
      path : '~/xd0m3',
      'pre-deploy-local': 'npm rund build',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
