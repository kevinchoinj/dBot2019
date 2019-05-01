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
| `fileWrite [file name] [content]`|Creates named file                   |
| `fileCopy [orig file] [dest file]`|Copies file to another              |
| `fileDelete [file name]`   |Deletes named file                         |
| `imgurAdd [album label] [album id]` |Adds Imgur album to collection    |
| `imgurRemove [album label]`|Removes Imgur album from collection        |
| `imgurList`                |Lists Imgur albums in collection           |
| `setDebug [channel id]`    |Sets debug messaging channel               |
| `configDebug`              |Sends ID for current Debug Channel         |
| `configError`              |Sends most recent Error stored in couchDB  |


## Necessary Files
config.json should be filled in with corresponding data of config_example.json


##Adding bot to server
Go to https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=0

You can set permissions for the bot here:
https://discordapi.com/permissions.html