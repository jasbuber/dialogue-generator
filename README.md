# Description

Online version : http://rpgdialogues.000webhostapp.com/

Dialogue generator is an application that allows to create and edit dialogue files that can be used in a game. It was created to improve the process of writing dialogues and decouple it from the actual game logic.
Every dialogue tree consists of a tree of items, representing a dialogue option that can be chosen by a player. 
**dialogue item properties:**
*option - actual dialogue text that can be chosen
*response - a character response to that option
*actions - attributes that can be used to control conversation ( eg. trade, end conversation, go back, crossroads to go back to)
*conditions - determines conditional display of a dialogue tree eg. charisma > 15, strength > 10

# Prerequisites
* any web server

**DEVELOPMENT ONLY**
* [typescript](https://www.typescriptlang.org/)
* [http-server](https://www.npmjs.com/package/http-server)
* [watchify](https://github.com/browserify/watchify)

# Getting Started
Start a web server and open index.html. Possible actions, conditions and an example dialogues json file are in src/resources folder.
