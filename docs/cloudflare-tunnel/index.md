[< Back](../../README.md#guides)

# Cloudflare Tunnel Integration (Production)

In order to be able to server Balancer through the Cloudflare Tunnel, you need a domain and must have access to its DNS Management.

For a complete guide on how to set this up, please visit: [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

<br/>

## Getting Started

1. Log into your Cloudflare account and then navigate to the Zero Trust section. Follow the steps and create your team. Note that even though there seems to be a pay wall, you can always choose the free plan.

2. Once you complete the team creation process and are redirected to the Zero Trust Dashboard, navigate to `Networks/Tunnels` and click on **"Add a tunnel"**.

3. Select **"Cloudflared"** as your connector and click on **Next**

4. Enter the name of your tunnel (e.g. `balancer`)

5. Choose **"Docker"** as your environment and save the `TUNNEL_TOKEN` securely. Cloudflare gives you a command which includes the token in the following format: 
    ```bash
    docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token <TUNNEL_TOKEN>
    ```
    Since Balancer makes use of Docker Compose, you can just copy the `<TUNNEL_TOKEN>` and place it straight in the Environment Variable Assets Source File

6. Now that you have the `TUNNEL_TOKEN`, proceed to generate the environment variable assets and push them to the remote host

7. The next step consists in adding the public hostnames for Balancer:
    - **gui**:
      ```text
      Subdomain: balancer
      Domain: yourdomain.com
      Path: leave this property blank
      Service Type: HTTP
      URL: gui:8090 <service-name:port>
      ```
    - **api**:
      ```text
      Subdomain: balancerapi
      Domain: yourdomain.com
      Path: leave this property blank
      Service Type: HTTP
      URL: api:5075 <service-name:port>
      ```
      **IMPORTANT:** the API must always be exposed under the `balancerapi` subdomain as its URL is derived by the GUI at runtime. For example: `balancerapi.yourdomain.com`.