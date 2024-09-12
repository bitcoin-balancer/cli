[< Back](../../README.md#getting-started)

# Environment Variables

The environment variables are a series of configuration and secret values used by Balancer to build and run its platform. The steps to generate and deploy the environment variables assets are:

1. Create and fill the source file (`source.json`)
2. Generate the environment variable assets
3. Deploy the assets to the remote host

And that's all! At this point, you'll be able to [build and run](../build-run-balancer/index.md) your Balancer Platform.




<br/>

## Creating and filling the Source File

The source file (`source.json`) file used to generate the **environment variable assets** has the following schema:

```json
{
	"environment": {
		"NODE_ENV": "...",
		"GUI_URL": "...",
		"POSTGRES_HOST": "...",
		"POSTGRES_USER": "...",
		"POSTGRES_DB": "...",
		"POSTGRES_PASSWORD_FILE": "...",
		"ROOT_ACCOUNT": {
			"uid": "...",
			"nickname": "...",
			"password": "...",
			"otpSecret": "..."
		},
		"TELEGRAM": {
			"token": "...",
			"chatID": 0
		},
		"ALTCHA_SECRET": "...",
		"JWT_SECRET": {
			"refresh": "...",
			"access": "..."
		},
		"COOKIE_SECRET": "...",
		"EXCHANGE_CONFIGURATION": {
			"baseAsset": "...",
			"quoteAsset": "...",
			"window": "...",
			"liquidity": "...",
			"coins": "...",
			"trading": "..."
		},
		"EXCHANGE_CREDENTIALS": {
			"binance": {
				"key": "...",
				"secret": "..."
			},
			"bitfinex": {
				"key": "...",
				"secret": "..."
			},
			"kraken": {
				"key": "...",
				"secret": "..."
			}
		},
		"TUNNEL_TOKEN": "..."
	},
	"secrets": [
		"POSTGRES_PASSWORD_FILE",
		"ROOT_ACCOUNT",
		"TELEGRAM",
		"ALTCHA_SECRET",
		"JWT_SECRET",
		"COOKIE_SECRET",
		"EXCHANGE_CREDENTIALS"
	]
}
```

Balancer makes use of [Docker Compose Secrets](https://docs.docker.com/compose/use-secrets/) to avoid putting sensitive data in the Operating System's environment variables for [security reasons](https://blog.diogomonica.com//2017/03/27/why-you-shouldnt-use-env-variables-for-secret-data/).


### `NODE_ENV`

The environment that will be used by Node.js processes.

```json
{
	"environment": {
		"NODE_ENV": "production",
		...
	},
	"secrets": [...]
}
```



<br/><br/>

## Generating the Environment Variable Assets

To generate the assets, the CLI will ask you to enter the absolute path for the source file (`source.json`) and the directory where you wish to store the assets.

One way of visualizing the absolute path of a file or directory is:

```bash
readlink -f source.json 
# /home/jesusgraterol/Desktop/source.json

readlink -f output
# /home/jesusgraterol/Desktop/output
```

Start the CLI with `npm start`, choose the category named **Environment Variable Assets** and then trigger the `generate-envvar-assets` action:

![generate-envvar-assets](../assets/generate-envvar-assets.png)


<br/><br/>

## Deploying the assets to the Remote Host

Once you have generated the environment variable assets and have stored them securely, you can proceed to deploy them to the remote host by triggering the `deploy-envvar-assets` action:

![deploy-envvar-assets](../assets/deploy-envvar-assets.png)