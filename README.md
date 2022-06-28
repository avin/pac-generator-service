# Pac-Generator-Service

## Prepare & Run

```sh
git clone https://github.com/avin/pac-generator-service.git
cd ./pac-generator-service
npm install
npm run start
```

Serve to `http://localhost:3000/?domain=true&ip=true&connection=SOCKS5%20127.0.0.1:1080`

## Docker

`docker-compose.yml` example

```yaml
version: '3'
services:
  main:
    build:
      context: ./
      dockerfile: './Dockerfile'
    ports:
      - "127.0.0.1:8080:3000"
```

Systemd service example

```editorconfig
[Unit]
Description=pac-generator-service
Requires=docker.service
After=docker.service

[Service]
Restart=always
WorkingDirectory=/opt/pac-generator-service/
ExecStartPre=/usr/local/bin/docker-compose -f docker-compose.yml down -v
ExecStart=/usr/local/bin/docker-compose -f docker-compose.yml up
ExecStop=/usr/local/bin/docker-compose -f docker-compose.yml down

[Install]
WantedBy=multi-user.target
```
