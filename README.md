# nginx-reverse-proxy

## Overview

This project demonstrates how to use **Nginx** as a reverse proxy to **load balance** traffic across three locally running **Express.js** servers, emulating a production environment. The setup includes:

- Serving an `index.html` page using **Express.js**.
- Running three instances of the Express app on ports **3001, 3002, and 3003**.
- Using **Docker Compose** to containerize and orchestrate the applications.
- Configuring **Nginx** as a **reverse proxy** to distribute traffic across the three servers.
- Implementing **intelligent routing strategies** for better load distribution.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker & Docker Compose](https://www.docker.com/)
- [Nginx](https://nginx.org/)

---

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/nginx-reverse-proxy.git
   cd nginx-reverse-proxy
   ```

2. **Install dependencies:**

   ```sh
   cd app
   npm install
   ```

3. **Run the application with Docker Compose:**

   ```sh
   docker-compose up --build
   ```

4. **Configure Nginx** to act as a reverse proxy:

   - Modify `nginx-conf.txt` by replacing:
     - `<YOUR_IP-ADDRESS>` with your actual local IP.
     - `<PUBLIC_KEY_LOCATION>` and `<PRIVATE_KEY_LOCATION>` with SSL certificate paths.
   - Copy the updated file to your Nginx config directory:
     ```sh
     sudo cp nginx-conf.txt /etc/nginx/nginx.conf
     sudo systemctl restart nginx
     ```

5. **Access the application:**
   - Open `https://localhost` in a browser.
   - Open `https://localhost/session-persist/` for session-persistent load balancing.
   - Open `https://localhost/app-1/`, `https://localhost/app-2/`, or `https://localhost/app-3/` to access specific servers.

---

## Nginx Configuration Details

The `nginx-conf.txt` file defines key configurations, including:

### Load Balancing Strategies

- **Round Robin (default):** Requests are evenly distributed among all backend servers.
- **Least Connections (`least_conn`):** Sends new requests to the server with the fewest active connections.
- **Session Persistence (`ip_hash`):** Ensures requests from the same client always go to the same server.

### Intelligent Routing Features

- **Header-Based Routing:**

  - The `map` directive allows routing based on a custom header (`X-Server-Select`), enabling requests to be directed to specific servers.

- **Client IP Forwarding:**

  - The `proxy_set_header X-Real-IP $remote_addr;` directive ensures backend servers receive the original client’s IP instead of Nginx’s IP, useful for logging and security.

- **SSL Termination:**
  - SSL is enforced using certificates defined in:
    ```sh
    ssl_certificate <PUBLIC_KEY_LOCATION>;
    ssl_certificate_key <PRIVATE_KEY_LOCATION>;
    ```
  - HTTP requests are redirected to HTTPS to enhance security.

---

## Contact

If you have any questions, feel free to email me at **ammarhaider1629@gmail.com**.

---
