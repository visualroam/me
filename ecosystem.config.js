module.exports = {
  apps : [{
    name: "xd0m3",
    script: 'index.js',
    watch: true,
    node_args : '-r dotenv/config',
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
      path : '/root/xd0m3',
      "pre-deploy-local": `scp -P 17532 -C .env root@64.225.104.243:/root/xd0m3/current/.env`,
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
