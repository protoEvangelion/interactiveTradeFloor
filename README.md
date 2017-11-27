<p align="center">
  <a href="https://travis-ci.org/protoEvangelion/interactiveTradeFloor"><img src="https://img.shields.io/travis/protoEvangelion/interactiveTradeFloor/master.svg?style=flat-square" alt="Build Status" /></a>
  <a href="https://codecov.io/gh/protoEvangelion/interactiveTradeFloor"><img src="https://img.shields.io/codecov/c/github/protoEvangelion/interactiveTradeFloor.svg?style=flat-square" alt="Build Status" /></a>
  <a href="https://aoatradeshow.herokuapp.com/"><img src="https://img.shields.io/website-up-down-green-red/http/shields.io.svg" alt="Code Coverage" /></a>
  <a href="https://www.codacy.com/app/protoEvangelion/interactiveTradeFloor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=protoEvangelion/interactiveTradeFloor&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/488a2a3f487a4d568d005ec5ef831bfa" alt="Code Grade" /></a>
  <a href="https://snyk.io/test/github/protoevangelion/interactivetradefloor"><img src="https://snyk.io/test/github/protoevangelion/interactivetradefloor/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/protoevangelion/interactivetradefloor" style="max-width:100%;"></a>
</p>

![tradeshow](https://cloud.githubusercontent.com/assets/20076677/25107976/6cb4abd6-2387-11e7-8faa-69a684bc3054.gif)

# Tradeshow Floorplan Manager

This is a project that's dynamic and built to simplify the trade show management process.

Specifically, it helps sales people consolidate their efforts and collaborate in real time with team mates.

Rather than track everything by paper, you can use this web app to keep track of all booths that you have **sold** or still need to **collect** on and **color code** it based on who the booth belongs to.

Table of Contents
=================

* [Features](#features)
* [Setup](#setup)
    * [Available Scripts](#available-scripts)
      * [Development Mode](#development-mode)
      * [Production Mode](#production-mode)
    * [Environment Variables](#environment-variables)
    * [Email](#email)
    * [MongoDB](#mongodb)
    * [Changing booth layouts](#changing-booth-layouts)
      * [Booth Data Model](#booth-data-model)
    * [Authentications](#authentications)
    * [SSL for Production](#ssl-for-production)
    * [Custom JS &amp; CSS](#custom-js--css)
    * [How to Specify Port](#how-to-specify-port)
* [License](#license)

## Features

  - 🚀 ES6 Javascript
  - 🔩 Socket.io for live updating between users.
  - 👀 `react` as the view.
  - 🔀 `react-router` v4 as the router.
  - 🏪 `redux` as the central store for state management.
  - 💅  Styling: `Styled Components`
  - 📀 `MongoDB` as the database.
  - 🚄 `express` with `Node.js` as the server.
  - 🌍 Universal / Server Side Rendering.
  - 🔥 Client & Server side hot reloading with `react-hot-loader`.
  - 👮 Security with `Snyk` and `react-helmet`.
  - 📦 All source is bundled using `Webpack v2`.
  - 🤖 Optimised Webpack builds via `HappyPack`.
  - 👼 `ESlint` Airbnb configuration.
  - 🎭 `Jest` as the testing framework.
  - ❤️ Continuous integration with `Travis-CI`


## Setup

### Available Scripts

* Scripts are available in the `package.json` file at the root level under the "**scripts**" property

* After making sure your **MongoDB instance** is running you can use the following scripts:

##### Development Mode

```shell
npm run dev
```

##### Production Mode

```shell
npm run build
npm run start
```


### Environment Variables

* Here is where the **dynamic** part comes in
  * Simply add a `.env` file to the root of directory
  * You can add as many **emails, users, colors** as you want
  * Dot not use **string** literals or **spaces**

```
FB_ID=your_facebook_app_id
GOOGLE_ID=your_google_app_id
GMAIL_USER=your_gmail_email
GMAIL_PASS=your_gmail_password
USER_EMAILS=email1,email2,...
USER_NAMES=firstname1,firstname2,...
USER_COLORS=#00B20E,#0800FF,...
```

### Email

* Setting up email functionality is super simple
  * Just add the config as above
  * *If you need help setting up your gmail to send emails, we use* [Nodemailer so check out their docs](https://nodemailer.com/about/)


### MongoDB

* Make sure to install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) and start it up by running

```shell
mongod
```

* It should start up and say listening on port `27017`
  * If it shows a different port specify it in the `package.json` file in the root of this project under the `mongo:port` script


* Then restore the backups into the database
  * Navigate to `backup` directory and restore each of the two collections

```shell
mongorestore --collection laBooths --db floorplan laBooths.bson
mongorestore --collection lbBooths --db floorplan lbBooths.bson
```

* It should say finished restoring floorplan.lbBooths (177 documents) or something like that

* then type this to open up a mongo shell

```shell
mongo
```

* once inside the shell type

```shell
show dbs
```

* floorplan should show up as one of the dbs

* then type

```shell
use floorplan
```

* It should say switched to db floorplan


### Changing booth layouts

* Booth locations are computed based on **row**, **column** and **booth type (single or double)**

```javascript
[  
  {  
    "_id":"5910ae25529a13a5bf988a5e",
    "num":630,
    "type":"single",
    "row":1,
    "col":13,
    "owner":"Ryan",
    "status":"holding",
    "company":"Cool Company",
    "description":"The most ultra cool co in existence!"
  },
  {  
    "_id":"5910b02a529a13a5bf988af7",
    "num":531,
    "type":"single",
    "row":1,
    "col":12,
    "owner":"None",
    "status":"good",
    "company":"Another cool co",
    "description":""
  },
```

TODO: see if possible to run tests, emails, routes

#### Booth Data Model

### Authentications

### SSL for Production

### Custom JS & CSS

* In the `public` folder, there is a `custom.js` file and a `custom.css` file
  * Whatever you place in the `type` field for a given booth, will **be injected into the DOM** for each booth's **id attribute**
  * So practically you can target any booth on the DOM like this

```css
#myCustomBoothType {
  ...
}
```

* Feel free to modify styles or JavaScript to your heart's content if you don't feel like playing with **React** and **styled-components** 😄

### How to Specify Port

In the `package.json` file, locate the **scripts** section, find the `env` property, and set `PORT` to your desired port (`PORT=3000`)


## License

The MIT License (MIT)

Copyright (c) 2017 [Ryan Garant](https://github.com/protoEvangelion)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
