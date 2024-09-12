[< Back](../../README.md#getting-started)

# Telegram Integration

## Creating and Exposing the Bot

The first step is to start a chat with @BotFather and create a new bot. This will give you the `token` so the newly created bot can be managed by the Balancer API. For more information about this process, visit:

- [From BotFather to 'Hello World'](https://core.telegram.org/bots/tutorial)


### Creating Balancer's Group

Once the bot is created, save the **`token`** and proceed to create a new Telegram group. Next, add the **bot** as member of the group so it can send messages through.

The final step is to retrieve the Chat's ID as it is one of the requirements for the bot to be able to send messages. For some reason, there isn't a straight forward way of doing this, so these are the current steps:

1) Make sure you have added the bot as a member in the group
2) Send a few messages to the group from your account
3) Send a `GET` Request to this URL: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`

Example: `https://api.telegram.org/bot123456789:jbd78sadvbdy63d37gda37bd8/getUpdates`

The response should follow the following structure:

```json
{
  "ok": true,
  "result": [
    {
      "update_id": 838xxxx36,
      "channel_post": {...},
        "chat": {
          "id": -1001xxxxxx062,
          "title": "....",
          "type": "channel"
        },
        "date": 1703065989,
        "text": "test"
      }
    }
  ]
}
```

The **`chatID`** is located inside of the `chat` object under the `id` property. Keep in mind that this value is generally a large negative integer. For example: `-1001629725463`

**Sources:**
- [Telegram Bot - how to get a group chat id?](https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id)
- [How to get Telegram Bot Chat ID](https://gist.github.com/nafiesl/4ad622f344cd1dc3bb1ecbe468ff9f8a)


<br/>

## Environment Variable

Now that the bot and the group are up and running, the integration can be completed by adding the **`token`** and  **`chatID`** into the environment variable assets source file:

```json
{
  "environment": {
    ...
    "TELEGRAM": {
      "token": "<YOUR_TOKEN>",
      "chatID": <YOUR_CHAT_ID>
    },
    ...
  },
  "secrets": [
    ...
    "TELEGRAM"
    ...
  ]
}
```

The final step is to generate the new environment variable assets and ensure the `.env` file and the `secrets/` directory have been updated accordingly.

The next time you run any of the `build-*` actions, the Balancer API will start making use of Telegram.

### Important

If you do not wish to make use of Telegram for whatever reason, you still need to provide the environment variable and include it to the `secrets` list. Make sure the object matches the one in the example below:

```json
{
  "environment": {
    ...
    "TELEGRAM": {
      "token": "",
      "chatID": 0
    },
    ...
  },
  "secrets": [
    ...
    "TELEGRAM"
    ...
  ]
}
```