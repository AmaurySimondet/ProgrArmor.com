# Amaury Simondet - Vanilla MERN Authentication App

## Welcome! 👋

I have made what we call a MERN app for MongoDB Express React and Node ! 

This is a "vanilla" project (no design) but all the hard stuff has been made:
- Back end : 
  - Connection to a Mongo database and schemas
  - Creation of an API to send and receive from React to Node


- Front end:
  - Basic Login and Signup React components with forms using bootstrap
  - Only authenticated accessible page with a Logout button
  - Routing and private routing

## Make it work for you
- Download zip, extract anywhere then cd in it
- Create a config directory with a config.js in it and put your mongoURL and hashing secret in it like this:

`
module.exports = {
    "secret" : "example-secret",
    "mongoURL": "mongodb+srv://username:password@cluster0.naapg7h.mongodb.net/nameofDB"
}
`
- Back in cmd: `npm config set legacy-peer-deps true`
- `npm install`

You are all set now:
- `npm start` in the root directory (to run the API and mongo connection)
- `npm start` in the client directory (for the front end)

## Credits
Everything has been made here : [Credits](https://axel-marciano.medium.com/votre-premi%C3%A8re-application-en-react-node-express-mongodb-5ab0dc531091)

But I had to make it work in 2022

## Got feedback for me?

I love receiving feedback ! I'm always looking to improve my projects. So if you have anything you'd like to mention, please [email me](mailto:amaury.simondet@hotmail.com "email") .

This project is my property only and you can't share it for commercial purpose. However, you can share it with anyone who will find it useful for practice or as my portfolio.

### Thank you! 🚀