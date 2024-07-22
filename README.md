# Technical test Eric Sanchez

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups!

All our other developers are busy, and we need you to deliver the app for tomorrow. Some bugs are left, and we need you to fix those. Don't spend too much time on it.

We need you to follow these steps to understand the app and to fix the bugs :

- Sign up to the app
- Create at least 2 others users on people page ( not with signup )
- Edit these profiles and add aditional information
- Create a project
- Input some information about the project
- Input some activities to track your work in the good project

Then, see what happens in the app and fix any bugs you find during this process.

**The goal is to fix at least 3 bugs**

## Feedback

Send us the project and answer the following questions :

- What bugs did you find ? How did you solve them and why ?
    - See [me report](https://github.com/Eric013/service-national-universel-test-technique/blob/main/cr_erics.md)
- Do you have any feedback about the code / architecture of the project?

  The project's code certainly meets the functional requirements, however, there are important points of improvement that need to be added and corrected:

    - Input Validation: It would be beneficial to add systematic input validation both on the front-end and back-end to enhance robustness and security.
    - Error Handling: Improve error handling to provide more detailed and specific error messages, especially in cases of data duplication.
    - Unit Testing: Add unit and integration tests for critical components to ensure the stability and reliability of the code.
    - File Organization: Better organization of files, such as clearly separating components, services, and models, would facilitate maintenance and scalability of the project.
    - Adherence to the Single Responsibility Principle (SRP): To improve the architecture, it would be advisable to refactor components and services to adhere to the Single Responsibility Principle of the SOLID principles. Each module or component should have a single, clearly defined responsibility, making the code more modular and easier to maintain.

- What difficulties did you encounter while working on it ?
  - I haven't necessarily encountered any difficulties, just the numerous eslint errors, nested parts of code, duplicate checks, etc.

We look forward to your submission and appreciate your effort!

## Live Coding

During a live coding session, you'll need to add a new feature that allows switching activities to another organization on demand. This change is requested by the client and should accommodate additional functional rules as needed, such as resetting data during the switch. Be prepared to explain your approach and thought process during the session.

## Setup

### Setup database

We need to start a docker container for mongodb and import initial data

```bash
docker-compose up -d
```

### Setup api

```bash
cd api
npm i
npm run dev
```

### Setup app

```bash
cd app
npm i
npm run dev
```
