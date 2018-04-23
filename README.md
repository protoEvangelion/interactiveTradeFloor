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

It

Specifically, it helps sales people consolidate their efforts and collaborate in real time with team mates.

Rather than track everything by paper, you can use this web app to keep track of all booths that you have **sold** or still need to **collect** on and **color code** it based on who the booth belongs to.

# Table of Contents

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

* 🚀 `Gatsby` Static Site Generator for Blazingly Fast Performance & SEO.
* 🔩 `Socket.io` for live updating between users.
* 👀 `react` as the view.
* 🔀 `react-router` as the router.
* 🏪 `redux` as the central store for state management.
* 💅 `Styled Components` as the styling library.
* 🔥 `Firebase DB` as the database.
* 👥 `Firebase Auth` for secure user authentication.
* 💎 `Firebase Functions` to provide serverless architecture.
* 📁 `Firebase Storage` for on-demand backups.
* 🔄 Fast development hot reloading with `react-hot-loader`.
* 👮 Security with `Snyk` and `react-helmet`.
* 📦 All source is bundled using `Webpack` and `Gatsby`.
* 👼 `ESlint` Airbnb configuration for code quality.
* 🎭 `Jest` as the testing framework to ensure reliability.
* ❤️ Continuous integration with `Travis-CI`.
* 🎯 ES6 Javascript for terse readable code.

## Setup

### Available Scripts

* Scripts are available in the `package.json` file at the root level under the "**scripts**" property

##### Development Mode

```shell
npm run dev
```

##### Production Mode

```shell
npm run build
npm run deploy
```

### Changing booth layouts in Firebase

* Booth locations are computed based on **row**, **column** and **size** which defaults to 1x1
* Accepts an image url as the `image` key
* Accepts a custom `size` key which can be specified as `3x2` or whatever
* Firebase is NoSQL so if a key is not required, you don't have to specify it

#### Booth API

| Option        | Usage      | Type     |
| ------------- | ---------- | -------- |
| `_id`         | _Required_ | `String` |
| `col`         | _Required_ | `Number` |
| `row`         | _Required_ | `Number` |
| `company`     | _Optional_ | `String` |
| `description` | _Optional_ | `String` |
| `image`       | _Optional_ | `Url`    |
| `num`         | _Optional_ | `Number` |
| `owner`       | _Optional_ | `String` |
| `size`        | _Optional_ | `String` |
| `status`      | _Optional_ | `String` |

Example:

```json
"yourroute": {
  "630": {
    "_id":"5910ae25529a13a5bf988a5e",
    "num":630,
    "row":1,
    "col":13,
    "owner":"Ryan",
    "status":"holding",
    "company":"Cool Company",
    "description":"The most ultra cool co in existence!"
  },
  "531": {  
    "_id":"5910b02a529a13a5bf988af7",
    "num":531,
    "row":-1,
    "col":12,
    "owner":"None",
    "status":"good",
    "company":"Another cool co",
		"size":"2x1",
		"image":"urlToImage.com"
	},
	"randomthing": {
		"_id":"5910b02a529a13a5bf988af7",
    "row":10,
    "col":14,
		"size":"5x10",
		"image":"urlToImage.com"
	}
}
```

* The second key under "yourroute" must be unique but is for convenience only when trying to find a booth in the firebase console.

## Prerequisites:

1.  [Nodejs & NPM](https://nodejs.org/)
2.  [Firebase](https://firebase.google.com/)
3.  [Firebase tools](https://www.npmjs.com/package/firebase-tools)

make sure owner names are first letter captalized in db and config
Ondemand client side db backup max 1 backup per day
How to deploy functions and app
package.json scripts

To Set up Firebase head to: https://console.firebase.google.com

Proceed through the instructions to set up a new project.

Once you have completed those steps successfully, you can set up each of these sections below:

Make sure `.firebaserc` in the root of this project has your project id.

With `firebase-tools` installed you can run firebase from the command line

```
firebase login
```

* To get all your credentials

```
firebase setup:web
```

* Add the credentials this command prints out in a new file called `config.js`
* This file is in `.gitignore`

```js
const AUTHENTICATED_USER_EMAILS = [
	'email1@gmail.com',
	'email2@yahoo.com',
	...
]

const BOOTH_LAYOUT = {
	borderWidth: 2,
	columns: 18,
	dimension: 60,
	rows: 26,
}

// Click around your console.firebase.google to gather these values
const FIREBASE_CONFIG = {
	apiKey: 'your api key',
	authDomain: 'tradeshow-floorplan.firebaseapp.com',
	databaseURL: 'https://tradeshow-floorplan.firebaseio.com/ ',
	projectId: 'tradeshow-floorplan',
	storageBucket: 'gs://tradeshow-floorplan.appspot.com',
}

/**
 * Allows you to create programmatic routes
 * You can pass a custom BOOTH_LAYOUT object for each page if you would like
 * https://www.gatsbyjs.org/docs/bound-action-creators/#createPage
 */
const FLOORPLAN_PAGES = [
	{
		name: 'Los Angeles',
		path: '/la',
		context: BOOTH_LAYOUT,
	},
	{
		name: 'Long Beach',
		path: '/lb',
		context: Object.assign({}, BOOTH_LAYOUT, { columns: 15, rows: 27 }),
	},
]

const USER_MAP = {
	Jin: {
		color: '#ff00aa',
		email: 'email1@gmail.com',
	},
	Richard: {
		color: '#0800FF',
		email: 'email2@yahoo.com',
	},
	Todd: {
		color: '#00B20E',
		email: 'email3@gmail.com',
	},
}

module.exports = {
	AUTHENTICATED_USER_EMAILS,
	FIREBASE_CONFIG,
	FLOORPLAN_PAGES,
	USER_MAP,
}
```

## Firebase Authentication:

* Only google auth is currently set up as provider

  ![Firebase Auth](https://user-images.githubusercontent.com/20076677/39107467-4c5c5fc8-4677-11e8-83d7-3461887f9e13.png)

## Firebase Database Rules:

[Firebase DB Docs](https://firebase.google.com/docs/database/web/start?authuser=1)

```
{
  "rules": {
    ".read": true,
    ".write": "auth.token.email == 'email1@gmail.com' || auth.token.email == 'email2@yahoo.com'"
  }
}
```

## Firebase Storage Rules:

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if false;
      allow write: if request.auth.token.email == 'email1@gmail.com' || request.auth.token.email == 'email2@yahoo.com';
    }
  }
}
```

## Firebase Functions:

* The only part of this app that would require a server is sending emails
* However, thanks to Firebase Functions, we can still have a serverless web app that is blazingly fast
* To run a local firebase shell:

```
npm run shell
```

* You can then call the email function directly from there if you would like to test it out

```
emailTeam()
```

* To only deploy functions rather than hosting run:

```
npm run deploy:functions
```

* Otherwise you can just call the function from the web app and check the Firebase function logs:
  ![Firebase Logs](https://user-images.githubusercontent.com/20076677/39110849-8d1089b2-4687-11e8-9659-06edfc1cf2af.png)

### Setting up email

* This file is in `.gitignore`
* _If you need help setting up your gmail to send emails, we use_ [Nodemailer so check out their docs](https://nodemailer.com/about/) \* [Article on sending with a simple Gmail account](https://medium.com/@manojsinghnegi/sending-an-email-using-nodemailer-gmail-7cfa0712a799)
* Create a `emailConfig.js` file in your `functions` directory:

```js
// functions/emailConfig.js
const GMAIL_SETTINGS = {
	email: 'theEmailThatWillSendEmails@gmail.com',
	pass: 'password',
}

const RECIPIENT_EMAILS = [
	'email1@gmail.com',
	'email2@yahoo.com',
	...
]

module.exports = {
	GMAIL_SETTINGS,
	RECIPIENT_EMAILS,
}
```

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
