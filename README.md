# Balancer CLI

Balancer CLI is a command-line interface responsible for managing the project's infrastructure and internal actions like running tests, database backup/restoration, and interacting with the production server through the SSH Protocol.

## Getting Started

```bash
# download the source code
git clone git@github.com:bitcoin-balancer/cli.git

# install dependencies
cd ./cli
npm install

# pull the latest version of the images
npm run pull

# build and serve the containers
npm run build-serve
```


## Commands


<details>
  <summary><code>npm run api-test:integration</code></summary>
  <br/>
  Runs the API's integration tests.

  ```bash
  docker compose run api npm run test:integration
  ```
  <br/>
</details>
<details>
  <summary><code>npm run api-test:unit</code></summary>
  <br/>
  Runs the API's unit tests.

  ```bash
  docker compose run api npm run test:unit
  ```
  <br/>
</details>