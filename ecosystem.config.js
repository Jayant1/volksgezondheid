module.exports = {
  apps: [
    {
      name: 'api-vwa.gov.sr',
      script: '/root/volksgezondheid/app/api_volksgezondheid.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_sandbox: {
        NODE_ENV: 'sandbox',
        PORT: 3000,
        SSL_KEY: '/etc/ssl/volksgezondheid/privkey.pem',
        SSL_CERT: '/etc/ssl/volksgezondheid/fullchain.pem'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        SSL_KEY: '/etc/ssl/volksgezondheid/privkey.pem',
        SSL_CERT: '/etc/ssl/volksgezondheid/fullchain.pem'
      }
    }
  ]
};
