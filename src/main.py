import os
import rcon
import yaml
import time
import twitch

from dotenv import load_dotenv

load_dotenv()

def load_commands():
    return yaml.load(open('config/commands.yml'))

def load_config():
    return yaml.load(open('config/config.yml'))

STREAMER_MINECRAFT_USER = load_config()['streamer_minecraft_user']
SELECTOR = '@' + load_config()['selector']

command_cooldowns = {}

def run(command):
    with rcon.Client(os.getenv('RCON_IP'), int(os.getenv('RCON_PORT')), passwd=os.getenv('RCON_PASS')) as client:
        response = client.run(command)
    print(response)
    return response

def get_cooldown(command):
    global command_cooldowns
    return command_cooldowns.get(command)

def on_message(channel, user, text):
    global command_cooldowns

    text = text.lstrip('!')
    cmd = text.split()[0]
    
    if cmd in load_commands().keys():
        after_cmd = ' '.join(text.split()[1:]) if (' ' in text) else ''
        timeout = int(time.time())
        allowed = get_cooldown(cmd) + load_commands()[cmd]['timeout'] if get_cooldown(cmd) else 1

        if timeout >= allowed:
            run('tellraw SELECTOR ["",{"text":"[","color":"dark_purple"},{"text":"USER","color":"light_purple"},{"text":"]","color":"dark_purple"},{"text":" TEXT"}]'.replace('USER', user).replace('TEXT', text).replace('SELECTOR', SELECTOR))

            for arg in load_commands()[cmd]['commands']:
                if not isinstance(arg, int):
                    run(arg.replace('TEXT', text).replace('STREAMER_MINECRAFT_USER', STREAMER_MINECRAFT_USER).replace('AFTER_CMD', after_cmd).replace('USER', user).replace('SELECTOR', SELECTOR))    
                else:
                    time.sleep(arg)

                time.sleep(0.2) # give the commands some time to execute just to be safe

            globals()['command_cooldowns'][cmd] = int(time.time())

def list_commands():
    return ' '.join(load_commands().keys())

helix = twitch.Helix(client_id=os.getenv('TWITCH_ID'), client_secret=os.getenv('TWITCH_SECRET'), use_cache=True)
twitch.Chat(channel='#' + os.getenv('TWITCH_CHANNEL'), nickname=os.getenv('TWITCH_NAME'), oauth=os.getenv('TWITCH_OAUTH')).subscribe(lambda message: on_message(message.channel, message.sender, message.text))

print(list_commands())
