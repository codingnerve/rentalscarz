#!/usr/bin/env bash
# ==============================================================================
# RentalsCarz - Contabo VPS 1-Click Production Setup & Deployment Script
# Supports: Ubuntu 22.04 LTS / 24.04 LTS & Debian 11/12
# ==============================================================================
set -e

DOMAIN="${1:-rentalscarz.co}"
APP_DIR="/var/www/rentalscarz"

echo "=========================================================="
echo " Starting RentalsCarz Deployment for: https://${DOMAIN}"
echo "=========================================================="

# 1. Update OS packages
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y curl git ufw nginx certbot python3-certbot-nginx

# 2. Install Node.js 22 LTS (if not present)
if ! command -v node > /dev/null 2>&1; then
    echo "Installing Node.js 22 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# 3. Install PM2 globally
sudo npm install -g pm2

# 4. Configure Application Directory
sudo mkdir -p "${APP_DIR}"
sudo chown -R $USER:$USER "${APP_DIR}"

echo "Deploying application files to ${APP_DIR}..."

# 5. Build and install dependencies inside APP_DIR
cd "${APP_DIR}"
npm ci --omit=dev || npm install
npx prisma generate
npx prisma db push --accept-data-loss
npm run build

# 6. Start / Reload with PM2
if pm2 show rentalscarz > /dev/null 2>&1; then
    echo "Reloading existing PM2 process..."
    pm2 reload ecosystem.config.cjs || pm2 restart rentalscarz
else
    echo "Starting PM2 process..."
    pm2 start ecosystem.config.cjs
    pm2 save
    pm2 startup | tail -n 1 | sudo bash || true
fi

# 7. Setup Nginx Reverse Proxy
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
sudo tee "${NGINX_CONF}" > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

sudo ln -sf "${NGINX_CONF}" /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# 8. Firewall configuration
sudo ufw allow OpenSSH || true
sudo ufw allow 'Nginx Full' || true
sudo ufw --force enable || true

echo "=========================================================="
echo " RentalsCarz is now live on http://${DOMAIN}!"
echo " To enable free HTTPS SSL certificate, run:"
echo " sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo "=========================================================="
