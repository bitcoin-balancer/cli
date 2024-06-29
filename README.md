# Balancer CLI

The CLI is a robust command-line interface designed to streamline the management of Balancer's infrastructure and internal operations.  It empowers you to:

* **Automate Infrastructure Tasks:** effortlessly manage the project's infrastructure, including provisioning, scaling, and monitoring
* **Execute Development Actions:**  run tests, deploy updates, and manage code dependencies with ease
* **Database Administration:**  back up, restore, and maintain your database efficiently
* **Secure Remote Access:** interact with the production server through secure SSH connections
* **And more!**

With its intuitive syntax and comprehensive functionality, the Balancer CLI simplifies complex tasks, saves valuable time, and ensures consistent project management practices. 





<br/>

## Requirements

### Software

- UNIX-like OS
- git ^v2.43.0
- Node.js ^v22.2.0
- npm ^v10.7.0
- Docker ^v27.0.2
- Docker Compose ^v2.28.1

### Hardware

- 1 CPU
- 2 GB Memory
- 25 GB Storage




<br/>



## Getting Started

```bash
# download the source code
git clone git@github.com:bitcoin-balancer/cli.git

# install dependencies
cd ./cli
npm install

# start the CLI
npm start
```




<br/>

## CLI Actions

### General

<details>
  <summary><code>deploy-cli</code></summary>
  <br/>
  Builds the CLI, transfers the output to the server and performs a clean dependency install.

  ```bash
  node dist/deploy-cli.js
  ```
  <br/>
</details>
<details>
  <summary><code>db-backup</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>db-restore</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>generate-env-vars</code></summary>
  <br/>
  ...
  <br/>
</details>





<br/>


### Host

<details>
  <summary><code>connect</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>landscape-sysinfo</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>reboot</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>shutdown</code></summary>
  <br/>
  ...
  <br/>
</details>





<br/>


### Docker Compose

#### Up

<details>
  <summary><code>up</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>up:test-mode</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>up:restore-mode</code></summary>
  <br/>
  ...
  <br/>
</details>


<br/>


#### Build

<details>
  <summary><code>build</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>build-up</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>build-up:test-mode</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>build-up:restore-mode</code></summary>
  <br/>
  ...
  <br/>
</details>


<br/>


#### Lifecycle Management

<details>
  <summary><code>down</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>restart</code></summary>
  <br/>
  Restarts all stopped and running services (specified in the <code>compose.yml</code> file).

  ```bash
  docker compose restart
  ```
  <br/>
</details>


<br/>


#### Deployment

<details>
  <summary><code>push</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>pull</code></summary>
  <br/>
  ...
  <br/>
</details>


<br/>

#### Logs

<details>
  <summary><code>logs</code></summary>
  <br/>
  Displays and subscribes to log output from all services.

  ```bash
  docker compose logs -f
  ```
  <br/>
</details>
<details>
  <summary><code>logs:db</code></summary>
  <br/>
  Displays and subscribes to log output from the db service.

  ```bash
  docker compose logs db -f
  ```
  <br/>
</details>
<details>
  <summary><code>logs:api</code></summary>
  <br/>
  Displays and subscribes to log output from the api service.

  ```bash
  docker compose logs api -f
  ```
  <br/>
</details>
<details>
  <summary><code>logs:gui</code></summary>
  <br/>
  Displays and subscribes to log output from the gui service.

  ```bash
  docker compose logs gui -f
  ```
  <br/>
</details>


<br/>


#### Monitoring

<details>
  <summary><code>ps</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>top</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>top:db</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>top:api</code></summary>
  <br/>
  ...
  <br/>
</details>
<details>
  <summary><code>top:gui</code></summary>
  <br/>
  ...
  <br/>
</details>


<br/>


#### Maintenance

<details>
  <summary><code>prune</code></summary>
  <br/>
  Remove all unused containers, networks, images (both dangling and unused).

  ```bash
  docker system prune -a -f
  ```
  <br/>
</details>


<br/>


#### Tests

<details>
  <summary><code>api-test:integration</code></summary>
  <br/>
  Runs the API's integration tests. Keep in mind that <code>testMode</code> must be enabled for this command to work.

  ```bash
  docker compose run api npm run test:integration
  ```
  <br/>
</details>
<details>
  <summary><code>api-test:unit</code></summary>
  <br/>
  Runs the API's unit tests. Keep in mind that <code>testMode</code> must be enabled for this command to work.

  ```bash
  docker compose run api npm run test:unit
  ```
  <br/>
</details>





<br/>

## Run the CLI's Tests

```bash
# run the integration tests
npm run test:integration

# run the unit tests
npm run test:unit
```





<br/>

## @TODO

- [ ] ...





<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)






<br/>

## Acknowledgments

- ...