# Getting Started with Pre-requisite Collection & Booking System

## Steps to run the system

In the `server` directory, to run the local express server, run:

### `node server.js`

In the same directory, to start the system in CLI, run:

### `node index.js`

## Design decisions

1. The first agent `customerAgent.js`, is a separate class, responsible for handling the flow of questions
2. The second agent `apiAgent.js`, is responsible for handling the external API calls
3. The third agent `statusAgent.js`, is responsible for handling the status after each call

4. Each of these agents communicate with each other using event emitters, simulating asynchronuous message transfer.
5. Using ChatGPT APIs to dynamically generate questions for each service type
6. Created real HTTP endpoints to simulate API calls
7. Single entry and control point

## Assumptions made

1. One service request per session
2. No user authorization included
3. No API delays
