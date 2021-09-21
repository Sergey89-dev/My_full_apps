import asyncio

from aiohttp import client
import config
import asyncpraw
from aiogram import Bot, types

API_TOKEN = config.settings['TOKEN']
CHANNEL_ID  # id chanel telegram

bot = Bot(token=API_TOKEN, parse_mode=types.ParseMode.HTML)

reddit = asyncpraw.Reddit(client_id=config.settings['CLIENT_ID'],
                          client_secret=config.settings['SECRET_CODE'],
                          user_agent='random_raddit_bot/0.0.1')

mems = []

TIMEOUT = 5
SUBREDDIT_NAME = 'memes'  # name group
POST_LIMIT = 1


async def send_message(channel_id: int, text: str):
    await bot.send_message(channel_id, text)


async def main():
    while True:
        await asyncio.sleep(TIMEOUT)
        memes_submission = await reddit.subreddit(SUBREDDIT_NAME)
        memes_submission = memes_submission.new(limit=POST_LIMIT)
        item = await memes_submission.__anext__()
        if item.title not in mems:
            mems.append(item.title)
            await send_message(CHANNEL_ID, item.url)
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
