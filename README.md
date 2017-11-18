<p align="center">
  <a href="https://travis-ci.org/protoEvangelion/interactiveTradeFloor"><img src="https://img.shields.io/travis/protoEvangelion/interactiveTradeFloor/master.svg?style=flat-square" alt="Build Status" /></a>
  <a href="https://codecov.io/gh/protoEvangelion/interactiveTradeFloor"><img src="https://img.shields.io/codecov/c/github/protoEvangelion/interactiveTradeFloor.svg?style=flat-square" alt="Build Status" /></a>
  <a href="https://aoatradeshow.herokuapp.com/"><img src="https://img.shields.io/website-up-down-green-red/http/shields.io.svg" alt="Code Coverage" /></a>
  <a href="https://www.codacy.com/app/protoEvangelion/interactiveTradeFloor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=protoEvangelion/interactiveTradeFloor&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/488a2a3f487a4d568d005ec5ef831bfa" alt="Code Grade" /></a>
  <a href="https://snyk.io/test/github/protoevangelion/interactivetradefloor"><img src="https://snyk.io/test/github/protoevangelion/interactivetradefloor/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/protoevangelion/interactivetradefloor" style="max-width:100%;"></a>
</p>

![tradeshow](https://cloud.githubusercontent.com/assets/20076677/25107976/6cb4abd6-2387-11e7-8faa-69a684bc3054.gif)

## Tradeshow Floorplan Manager

This is a project built to simplify the trade show managing process.

It helps sales people consolidate their efforts and collaborate in real time with team mates.

Rather than track everything by paper, you can use this web app to keep track of all booths that you have sold or still need to collect on.  You can also differentiate between what you have sold along with what your teammates have sold!


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
  - 🔥 Client & Server side hot reloading with `react-hot-loader
  - 👮 Security on the express server using helmet
  - 📦 All source is bundled using `Webpack v2`.
  - 🤖 Optimised Webpack builds via `HappyPack`.
  - 👼 `ESlint` Airbnb configuration.
  - 🎭 `Jest` as the testing framework.
  - ❤️ Continuous integration with `Travis-CI` and Heroku


## Steps to run in production

* Add a `.env` file to the root of directory
  * You can add as many emails as you want
  * It should like this:

```
GMAILUSER=yourgmail
GMAILPASS=yourpassword
USERS=[['fakeemail1@gmail.com', 'FirstName1'], ['fakeemail2@gmail.com', 'FirstName2'], ...]
```

* If you want to **change colors **they are in the `src/components/molecules/Booth/index.js` file

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
