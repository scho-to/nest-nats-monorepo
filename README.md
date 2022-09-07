## Description

A little [Nest](https://github.com/nestjs/nest) App for testing monorepos and libraries. It uses Nats' Jetstreams to listen on incomming request, while the http client is able to publish a simple message to the stream. The nats-listener is listening for a stream and a test-subject and simply console logs the incomming messages.

This is a simple test/example-repo to prepare replacement of stan (nats-streaming), which is deprecated.

Note: This app only serves as an example, therefore no production tests/deployments have and will be tested.

## Installation

```bash
$ npm install
```

## Running the app

Note: You need docker and docker-compose to use this repo, as the nats server is started in a docker container.

1. Rename the .env.example to .env and fill in your credentials or use the example ones.

2. use docker-compose to set up the repo:
```bash
$ docker-compose up nats-listener http

# new docker versions:
$ docker compose up nats-listener http 
```

## Test

Note: Tests have not been written yet.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License
[MIT licensed](LICENSE)
