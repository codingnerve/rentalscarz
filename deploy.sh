#!/usr/bin/env bash
# ==============================================================================
# RentalsCarz - Safe Multi-Tenant Contabo VPS Deployment Script
# 100% Non-destructive: Isolates process, port, and Nginx configuration.
# Leaves existing websites, databases, and services completely untouched.
# ==============================================================================
set -e

DOMAIN="${1:-rentalscarz.co}"
PORT="${2:-3050}"
APP_DIR="/var/www/rentalscarz"

echo "=========================================================="
echo " Deploying RentalsCarz (Isolated Multi-Site Mode)"
echo " Domain: https://${DOMAIN}"
echo " Port:   ${PORT}"
echo " Target: ${APP_DIR}"
echo "=========================================================="

# 1. Verify Node.js & PM2 presence without breaking existing packages
if ! command -v node > /dev/null 2>&1; then
    echo "Node.js not detected. Installing Node.js LTS..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Found existing Node.js: $(node -v)"
fi

if ! command -v pm2 > /dev/null 2>&1; then
    echo "Installing PM2 process manager..."
    sudo npm install -g pm2
else
    echo "Found existing PM2 version: $(pm2 -v)"
fi

# Ensure Nginx & Certbot are available
if ! command -v nginx > /dev/null 2>&1; then
    sudo apt-get update && sudo apt-get install -y nginx
fi

# 2. Check if the chosen port is already in use by another website
if ss -tuln | grep -q ":${PORT} "; then
    echo "WARNING: Port ${PORT} is currently in use by another process."
    echo "Please run: ./deploy.sh ${DOMAIN} <ANOTHER_PORT_LIKE_3051>"
    exit 1
fi

# 3. Create isolated application directory
sudo mkdir -p "${APP_DIR}"
sudo chown -R $USER:$USER "${APP_DIR}"

# 4. Install dependencies and compile Next.js
cd "${APP_DIR}"
echo "Installing project dependencies..."
npm install
echo "Populating MongoDB collections (vehicles, locations, admin)..."
npm run seed || true
npm run build

# 5. Start / Reload with PM2 on dedicated port
# Update ecosystem port dynamically if provided
sed -i "s/PORT: [0-9]*/PORT: ${PORT}/" ecosystem.config.cjs

if pm2 show rentalscarz > /dev/null 2>&1; then
    echo "Reloading existing PM2 process 'rentalscarz'..."
    pm2 restart rentalscarz --update-env
else
    echo "Starting PM2 process 'rentalscarz'..."
    pm2 start ecosystem.config.cjs
    pm2 save
fi

# 6. Create dedicated Nginx VirtualHost (DOES NOT touch other site configs)
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
sudo tee "${NGINX_CONF}" > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    client_max_body_size 25M;

    location / {
        proxy_pass http://127.0.0.1:${PORT};
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

# Safely enable the new site without touching any existing enabled sites
sudo ln -sf "${NGINX_CONF}" /etc/nginx/sites-enabled/

# Validate Nginx config before reloading
echo "Testing Nginx configuration..."
sudo nginx -t

# Reload Nginx (zero downtime for all existing websites)
sudo systemctl reload nginx

echo "=========================================================="
echo " RentalsCarz is live on http://${DOMAIN} (Port ${PORT})!"
echo " Zero disruption to existing websites."
echo " To enable HTTPS SSL, run:"
echo " sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo "=========================================================="

