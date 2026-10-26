module.exports = {
  apps: [
    {
      name: 'rentalscarz',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './',
      instances: 1, // Safe resource footprint for shared VPS with existing websites
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3050, // Isolated custom port avoiding conflict with port 3000
      },
    },
  ],
};
