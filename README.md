<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This application can help to find an apartment in Belarus, after configure filter of searching you will get notification of new flats.
Works with:
* [onliner.by](https://onliner.by)
* [domovita.by](https://domovita.by)

## Installation

```bash
$ npm install
```

## Environments

Need to create .env and set

```bash
    #filter from onliner
    ONLINER_PARAMS='rent_type%5B%5D=1_room&rent_type%5B%5D=2_rooms&price%5Bmin%5D=50&price%5Bmax%5D=250&currency=usd&only_owner=true&bounds%5Blb%5D%5Blat%5D=53.76287346273636&bounds%5Blb%5D%5Blong%5D=27.310811811505637&bounds%5Brt%5D%5Blat%5D=54.094764644499435&bounds%5Brt%5D%5Blong%5D=27.808147826669906&v=0.9398270094775507'

    #filter from domovita
    DOMOVITA_PARAMS='rooms=1%2C2&price%5Bmin%5D=&price%5Bmax%5D=250&individual=yes&price_type=all_usd'

    #access token of Telegram
    TELEGRAM_ID=${number}:${token}

    #chat id of Telegram
    CHAT_ID=${number}

    #uri to connect to database
    MONGODB_URI=${string}

    #Timeout to run function 
    TIME=${number}

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Debug application

```bash
    # VSCode config: add into .vscode > launch.json

    {
        "version": "0.2.0",
        "configurations": [{
            "type": "node",
            "request": "launch",
            "name": "Debug Nest Framework",
            "args": ["${workspaceFolder}/src/main.ts"],
            "runtimeArgs": ["--nolazy", "-r", "ts-node/register", "-r", "tsconfig-paths/register"],
            "sourceMaps": true,
            "cwd": "${workspaceRoot}",
            "protocol": "inspector"
        }]
    }
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
