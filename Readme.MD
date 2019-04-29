# Discord-Shodyra
New Proj WIP


## Regular Commands
Commands for all regular users `!<command>`

| Command                    | Description                               |
|:---------------------------|:------------------------------------------|
| `[keyValue]`               |Displays imgur album with key value        |
| `commands`                 |Displays available commands                |


## Admin Commands
Commands for all administrative users `!<command>`


## Creator Commands
Commands for the master user `!<command>`

| Command                    | Description                               |
|:---------------------------|:------------------------------------------|
| `adminstats`               |Displays system data                       |
| `mkdir [dir name]`         |Creates empty directory                    |
| `rmdir [dir name]`         |Deletes empty directory                    |
| `writeFile [file name] [content]`|Creates named file                   |
| `copyFile [orig file] [dest file]`|Copies file to another              |
| `deleteFile [file name]`   |Deletes named file                         |
| `addImgurName [album label] [album id]` |Adds Imgur album to collection|
| `removeImgurName [album label]`|Removes Imgur album from collection    |
| `listImgur`                |Lists Imgur albums in collection           |
| `setDebug [channel id]`    |Sets debug messaging channel               |


## Necessary Files
config.json should be filled in with corresponding data of config_example.json


##Adding bot to server
Go to https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=0

You can set permissions for the bot here:
https://discordapi.com/permissions.html