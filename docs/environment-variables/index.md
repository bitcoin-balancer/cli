[< Back](../../README.md)

# Environment Variables

@TODO

<br/><br/><br/>

## Source File

The source file (`source.json`) file used to generate the **environment variable assets** has the following schema:

```json
{
	"environment":  {
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

The `environment` property 




<br/><br/><br/>

## Generating the Environment Variable Assets

To generate the assets, the CLI will ask you to enter the absolute path for the source file (`source.json`) and the directory where you wish to store the assets.

One way of visualizing the absolute path of a file or directory is:

```bash
readlink -f source.json 
# /home/jesusgraterol/Desktop/source.json

readlink -f output
# /home/jesusgraterol/Desktop/output
```

....