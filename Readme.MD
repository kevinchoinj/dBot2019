# Discord-Shodyra
New Proj WIP


## Regular Commands
Commands for all regular users `!<command>`


## Admin Commands
Commands for all administrative users `!<command>`


## Creator Commands
Commands for the master user `!<command>`

| Command                    | Description                               | Parameters |
|:---------------------------|:------------------------------------------|------------|
| `adminstats`               |Displays system data                       |0           |
| `mkdir`                    |Creates empty directory                    |1           |
| `rmdir`                    |Deletes empty directory                    |1           |
| `writeFile`                |Creates named file                         |2           |
| `deleteFile`               |Deletes named file                         |1           |
| `addImgurName`             |Adds Imgur album to collection             |2           |
| `removeImgurName`          |Removes Imgur album from collection        |1           |
| `listImgur`                |Lists Imgur albums in collection           |0           |


## Necessary Files
config.json should be filled in with corresponding data of config_example.json


##Adding bot to server
Go to https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=0

You can set permissions for the bot here:
https://discordapi.com/permissions.html