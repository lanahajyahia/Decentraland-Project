# Decentraland
## Client side
React, JavaScript, HTML, CSS and bootstrap.
I developed all UI and game functionality in frontend. 
I used bootstrap to design some pages.
I used redux to work with components state in an easy way.
I installed many npm libraries to help me create the game.
The game has 4 main Pages: Landing page, Login page, register page and decentraland page. When you register from the first time the game render a 100X100 lands. The lands has the letter H designed for parks as 20% from the whole lands.


## Server side
Node js and mongoDB
I developed all API in server side to save the game’s data in database. Using REST API.
I dived the files into server, routes, controllers and schemas.
I have user schema and land schema
      User: username, pass, Buyer or visitor, budget.
      Land: owner, type (For sale, not for sale, park, street), price and color.
The user register and hash function. To encrypt/ decrypt the password.
Each user has a JWT (JSON Web Token). 
Username for users is unique.
Each land has one owner, but an owner can have many lands.

## Instalation
The project includes two files, server and client. In case to install, first npm install and then npm run dev In the main file.

Backend runs on port 5000 and frontend in 3000.
My DB connection is on cloud using mongo atlas, Add a .env file in server folder and add db connection url:
DATABASE_URL= ur db
PORT=5000
NODE_ENV=development
JWT_SECRET= create one
