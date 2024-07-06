# Balancer CLI

The CLI is a robust command-line interface designed to streamline the management of Balancer's infrastructure and internal operations.  It empowers you to:

* **Automate Infrastructure Tasks:** effortlessly manage the project's infrastructure, including provisioning, scaling, and monitoring
* **Execute Development Actions:**  run tests, deploy updates, and manage code dependencies with ease
* **Database Administration:**  back up, restore, and maintain your database efficiently
* **Secure Remote Access:** interact with the production server through secure SSH connections
* **And more!**

With its intuitive syntax and comprehensive functionality, the Balancer CLI simplifies complex tasks, saves valuable time, and ensures consistent project management practices.





<br/>
<br/>

## Guides

- [Environment Variables](./docs/environment-variables/index.md)

- [Remote Host Configuration (Optional)](./docs/remote-host/index.md)

- [Telegram Integration (Optional)](./docs/telegram/index.md)

- [Cloudflare Tunnel Integration (Optional)](./docs/cloudflare-tunnel/index.md)





<br/>
<br/>

## Requirements

### Software

- UNIX-like OS
- git `^v2.43.0`
- Node.js `^v22.3.0`
- npm `^v10.8.1`
- Docker Engine `^v27.0.3`
- Docker Compose `^v2.28.1`

### Hardware

- 1 CPU
- 2 GB Memory
- 25 GB Storage




<br/>
<br/>

## Getting Started

```bash
# download the source code
git clone git@github.com:bitcoin-balancer/cli.git

# install the dependencies
cd ./cli
npm install

# build & start the CLI
npm run build
npm start
```




<br/>
<br/>

## CLI Actions

### Host

<details>
  <summary><code>connect</code></summary>
  <br/>
  Establishes a SSH Connection with the remote host.

  ```bash
  ssh root@ip
  ```
  <br/>
</details>
<details>
  <summary><code>landscape-sysinfo</code></summary>
  <br/>
  Executes the landscape-sysinfo binary and prints its results.

  ```bash
  ssh root@ip landscape-sysinfo
  ```
  <br/>
</details>
<details>
  <summary><code>reboot</code></summary>
  <br/>
  Reboots the remote host immediately.

  ```bash
  ssh root@ip reboot
  ```
  <br/>
</details>
<details>
  <summary><code>shutdown</code></summary>
  <br/>
  Shuts down the remote host immediately.

  ```bash
  ssh root@ip poweroff
  ```
  <br/>
</details>
<details>
  <summary><code>ssh-copy-id</code></summary>
  <br/>
  Copies the SSH Public Key specified in the config file into the remote server.

  ```bash
  ssh-copy-id root@ip
  ```
  <br/>
</details>





<br/>

### Docker Compose

@TODO





<br/>

### CLI Management

<details>
  <summary><code>build-cli</code></summary>
  <br/>
  Executes the script to generate a build of the CLI straight from the source code.

  ```bash
  npm run build
  ```
  <br/>
</details>

<details>
  <summary><code>build-deploy-cli</code></summary>
  <br/>
  Deploys the CLI from its source in the local host to the remote host.

  Firstly, it creates the root directory (if it doesn't already exist):

  ```bash
  ssh root@ip mkdir -p cli
  ```

  Then, it deploys the source code files and lastly, it installs the dependencies:

  ```bash
  ssh root@ip cd cli && npm ci --omit=dev
  ```
  <br/>
</details>





<br/>

### Database Management

@TODO





<br/>

### Environment Variable Assets

<details>
  <summary><code>generate-envvar-assets</code></summary>
  <br/>
  Generates the environment variable assets based on a source file and places the results in a custom path.
  <br/>
  
</details>
<details>
  <summary><code>deploy-envvar-assets @TODO</code></summary>
  <br/>
  ...
  <br/>
</details>





<br/>
<br/>
<br/>

## Docker Images

- [postgres](https://hub.docker.com/_/postgres)
- [jesusgraterol/balancer-api](https://hub.docker.com/r/jesusgraterol/balancer-api)
- [jesusgraterol/balancer-gui](https://hub.docker.com/r/jesusgraterol/balancer-gui)





<br/>
<br/>
<br/>

## @TODO

- [ ] ...





<br/>
<br/>
<br/>

## Run the CLI's Tests

```bash
# run the integration tests
npm run test:integration

# run the unit tests
npm run test:unit

# run the benchmarks
npm run test:bench
```





<br/>
<br/>
<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)