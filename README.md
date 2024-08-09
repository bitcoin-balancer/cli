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
- 512 GB Memory
- 10 GB Storage




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

## Guides

- [Environment Variables](./docs/environment-variables/index.md)

- [Remote Host Configuration](./docs/remote-host/index.md)

- [Cloudflare Tunnel Integration (Optional)](./docs/cloudflare-tunnel/index.md)

- [Telegram Integration (Optional)](./docs/telegram/index.md)




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

<details>
  <summary><code>up</code></summary>
  <br/>
  Builds, (re)creates, starts, and attaches to containers for a service. An optional variation can be provided in order to generate the custom <code>compose.yaml</code> file and start the containers in the chosen mode.

  <br/>

  When executed on the local host, it runs:
  ```bash
  docker compose up --detach
  ```

  <br/>

  In contrast, when executed on the remote host, it always pulls the latest images from the registry (Docker Hub):
  ```bash
  docker compose up --pull always --no-build --detach
  ```

  <br/>
  The following variations are supported:

  - <code>up:restore-mode</code> used to restore a database backup that was generated in the past

  <br/>
</details>
<details>
  <summary><code>build-up</code></summary>
  <br/>
  Builds all the images and starts the containers. An optional variation can be provided in order to generate the custom <code>compose.yaml</code> file and start the containers in the chosen mode.

  <br/>

  When executed on the local host, it runs:
  ```bash
  docker compose up --build --detach
  ```

  <br/>

  When executed on the remote host, it firstly removes all unused containers, networks and images (both dangling and unused).

  ```bash
  docker system prune --all --force
  ```
  <br/>

  Then, it restarts the Docker Service:

  ```bash
  systemctl restart docker
  ```
  <br/>

  Finally, it pulls the latest images from the registry (Docker Hub):
  ```bash
  docker compose up --pull always --no-build --detach
  ```

  <br/>
  The following variations are supported:

  - <code>build-up:restore-mode</code> used to restore a database backup that was generated in the past

  <br/>
</details>
<details>
  <summary><code>prune-build-push</code></summary>
  <br/>
  Removes all unused containers, networks and images (both dangling and unused).

  ```bash
  docker system prune --all --force
  ```
  <br/>

  Then, it builds all the images and pushes them to the registry (Docker Hub).

  ```bash
  docker compose build --push
  ```
  <br/>
</details>

<details>
  <summary><code>down</code></summary>
  <br/>
  Stops containers and removes containers, networks, volumes, and images created by <code>up</code>.

  ```bash
  docker compose down
  ```
  <br/>
</details>

<details>
  <summary><code>down-build-up</code></summary>
  <br/>
  Stops containers and removes containers, networks, volumes, and images created by <code>up</code>.

  ```bash
  docker compose down
  ```

  <br/>

  Afterwards, it builds, (re)creates, starts, and attaches to containers for a service. An optional variation can be provided in order to generate the custom <code>compose.yaml</code> file and start the containers in the chosen mode.

  When executed on the local host, it runs:
  ```bash
  docker compose up --detach
  ```

  In contrast, when executed on the remote host, it always pulls the latest images from the registry (Docker Hub):
  ```bash
  docker compose up --pull always --no-build --detach
  ```
  <br/>
</details>
<details>
  <summary><code>restart</code></summary>
  <br/>
  Restarts all stopped and running services.

  ```bash
  docker compose restart
  ```
  <br/>
</details>

<details>
  <summary><code>logs</code></summary>
  <br/>
  Displays log output from all services. If a variation is provided, it narrows down the logs to a specific service.

  ```bash
  docker compose logs -f

  # if a variation is provided
  docker compose logs <variation> -f
  ```

  <br/>

  The following variations are supported:

  - <code>logs:postgres</code> displays log output from the postgres service

  - <code>logs:api</code> displays log output from the api service

  - <code>logs:gui</code> displays log output from the gui service

  - <code>logs:ct</code> displays log output from the cloudflared service
  <br/>
</details>

<details>
  <summary><code>prune</code></summary>
  <br/>
  Removes all unused containers, networks and images (both dangling and unused).

  ```bash
  docker system prune --all --force
  ```
  <br/>
</details>






<br/>

### Docker Compose Tests

<details>
  <summary><code>up:test-mode</code></summary>
  <br/>
  Builds, (re)creates, starts, and attaches to containers for a service with <code>TEST_MODE</code> enabled (used to run unit, integration or benchmark tests locally):
  
  ```bash
  docker compose up --detach
  ```

  <br/>
</details>

<details>
  <summary><code>build-up:test-mode</code></summary>
  <br/>
  Builds all the images and starts the containers with <code>TEST_MODE</code> enabled (used to run unit, integration or benchmark tests locally):

  ```bash
  docker compose up --build --detach
  ```

  <br/>
</details>

<details>
  <summary><code>down</code></summary>
  <br/>
  Stops containers and removes containers, networks, volumes, and images created by <code>up</code>.

  ```bash
  docker compose down
  ```
  <br/>
</details>

<details>
  <summary><code>down-build-up:test-mode</code></summary>
  <br/>
  Stops containers and removes containers, networks, volumes, and images created by <code>up</code>.

  ```bash
  docker compose down
  ```

  <br/>

  Afterwards, it builds all the images and starts the containers with <code>TEST_MODE</code> enabled (used to run unit, integration or benchmark tests locally):

  ```bash
  docker compose up --build --detach
  ```

  <br/>
</details>

<details>
  <summary><code>api-test:$type</code></summary>
  <br/>
  Runs the automated tests on the api service for the chosen variation.

  ```bash
  npm run test:<variation>
  ```

  <br/>
  The following variations are supported:

  - <code>api-test:integration</code> runs the integration tests in the api service

  - <code>api-test:unit</code> runs the unit tests in the api service

  - <code>api-test:bench</code> runs the benchmarks in the api service
  <br/>
</details>




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

  <br/>

  Then, it deploys the source code files and lastly, it installs the dependencies:

  ```bash
  ssh root@ip cd cli && npm ci --omit=dev
  ```
  <br/>
</details>





<br/>

### Database Management

<details>
  <summary><code>psql</code></summary>
  <br/>
  Start the terminal-based front-end to PostgreSQL

  ```bash
  docker compose exec -it postgres psql -U postgres
  ```

  <br/>
</details>
<details>
  <summary><code>backup-db</code></summary>
  <br/>
  Generates a database backup file, pulls it to the local host and performs a clean up once complete.

  <br/>

  Firstly, it generates a backup file (<code>$TIMESTAMP.dump</code>) and places it in the <code>balancer_pgdata-management</code> volume.

  ```bash
  docker compose exec postgres pg_dump -U postgres -f /var/lib/pgdata-management/$TIMESTAMP.dump -Fc
  ```

  <br/>

  Next, it pulls the backup file from the remote host to a specified destination directory in the localhost:

  ```bash
  scp root@ip:/var/lib/docker/volumes/balancer_pgdata-management/_data/$TIMESTAMP.dump /localhost/dest/dir
  ```

  <br/>
  
  Finally, it cleans up the <code>balancer_pgdata-management</code> volume:

  ```bash
  ssh root@ip rm -f /var/lib/docker/volumes/balancer_pgdata-management/_data/$TIMESTAMP.dump
  ```
  <br/>
</details>
<details>
  <summary><code>restore-db</code></summary>
  <br/>
  Restores a chosen backup file after cleaning the current state of the database and performs a clean up once complete.

  <br/>

  Firstly, it pushes the chosen backup file (<code>$TIMESTAMP.dump</code>) into the <code>balancer_pgdata-management</code> volume.

  ```bash
  scp /localhost/src/$TIMESTAMP.dump root@ip:/var/lib/docker/volumes/balancer_pgdata-management/_data/$TIMESTAMP.dump
  ```

  <br/>

  Next, it restores the database by making use of the backup file:

  ```bash
  docker compose exec postgres pg_restore --clean --if-exists -U postgres -d postgres /var/lib/pgdata-management/$TIMESTAMP.dump
  ```

  <br/>
  
  Finally, it cleans up the <code>balancer_pgdata-management</code> volume:

  ```bash
  ssh root@ip rm -f /var/lib/docker/volumes/balancer_pgdata-management/_data/$TIMESTAMP.dump
  ```
  <br/>
</details>




<br/>

### Environment Variable Assets

<details>
  <summary><code>generate-envvar-assets</code></summary>
  <br/>
  
  Generates the environment variable assets based on a source file and places the results in a custom path.

  <br/>

</details>
<details>
  <summary><code>deploy-envvar-assets</code></summary>
  <br/>
  Deploys the environment variable assets to the remote host from a custom source path.

  **Note:** assets are generated by the <code>generate-envvar-assets</code> action.

  ```bash
  scp -r ./assets/secrets root@ip:cli/secrets
  scp ./assets/.env root@ip:cli/.env
  # assets/
  #     │
  #     secrets/
  #     │     └───...
  #     .env
  ```

  Once the deployment is complete, the proper permissions are set on each secret file:
  
  ```bash
  chmod u=rwx,o=r secrets/SECRET_NAME.txt
  ```

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