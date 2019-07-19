# Krestos: Helpful software for churches

See the [Projects](https://github.com/paceaux/krestos/projects/1https://github.com/paceaux/krestos/projects/1) section for what's being done for MVP.

## Is this open-source?
Kind-of ish. Check the license and contact repo owners for details. 

## Getting Started

### Pre-requisites

* [Node.js](https://nodejs.org/en/) for the application
* [ArangoDB](https://www.arangodb.com/download/) for the Database

### Setup
1. install Node.js
2. Install ArrangoDB
3. Create the Krestos Database
    1. Go to the [ArangoDB Login](http://localhost:8529/_db/_system/_admin/aardvark/index.html#login)
    2. Create a User
            2.1. Click Users on the left side of the screen
            2.2 Click "Add User" in the center
            2.3 Retrieve the username and password from db.config.js and add them here
    3. Create a Database
        3.1 Click "Databases" on the left side of the screen
        3.2 Click "Add Databse" in the center
        3.3 Retrieve the database name from db.config.js and add it here
        3.4 Apply the username from db.config.js
4. Clone this repository: `git clone https://github.com/paceaux/krestos.git`
5. Navigate into the folder called `krestos`
6. open a command line (ctrl + ` in VS Code, or open a CMD window)
7. Run `npm install`

### Running
1. Open a command line (ctrl + ` in VS Code, or open a CMD window)
2. run `npm run server` in the command line

In the command window, you will see something like:

```
> node server.js

listening on localhost:4000/graphql
```

that is the url for the API


