## Server Setup

Our backend API is developed using Node.js and Express. We use MongoDB as the database to store user data. In this section, we will cover the steps to set up the server environment on your local machine. Let us start with a directory called lib-server. This directory will contain all the server-side code.

let us start with initializing our server.

```sh
$ mkdir lib-server
$ cd lib-server
$ npm init -y
```

I have changed the entry point to server.js in the package.json file.

Now let us install the required dependencies.

```sh
$ npm i @types/node express @types/express cors @types/cors mongoose dotenv concurrently rimraf joi bcrypt @types/bcrypt
```

- @types/node: This package provides TypeScript definitions for Node.js.
- express: This package is used to create the server.
- @types/express: This package provides TypeScript definitions for Express.
- cors: This package is used to enable Cross-Origin Resource Sharing (CORS) in the server.
- @types/cors: This package provides TypeScript definitions for CORS.
- mongoose: This package is used to interact with MongoDB.
- dotenv: This package is used to load environment variables from a .env file.
- concurrently: This package is used to run multiple npm scripts concurrently.
- rimraf: This package is used to remove directories.
- joi: This package is used for data validation.
- bcrypt: This package is used for password hashing.
- @types/bcrypt: This package provides TypeScript definitions for bcrypt.

Now let us install the development dependencies.

```sh
npm i -D nodemon
```

Now let us create a dist folder to store the compiled JavaScript files. Then update our scripts in the package.json file.

```json
 "scripts": {
    "build":"rimraf dist && tsc",
    "prestart":"npm run build",
    "start":"node ./dist/server.js",
    "predev":"npm run build",
    "dev": "concurrently \"tsc --watch\" \"nodemon ./dist/server.js\""
  }
```

- build: This script removes the dist folder and compiles the TypeScript files to JavaScript.
- prestart: This script runs before the start script and compiles the TypeScript files.
- start: This script starts the server by running the compiled JavaScript file.
- predev: This script runs before the dev script and compiles the TypeScript files.
- dev: This script runs the TypeScript compiler in watch mode and starts the server using nodemon.

Now let us create a tsconfig.json file to configure the TypeScript compiler.

```
 $ tsc -init
```

Delete the generated tsconfig.json file and add the following...

```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "CommonJS",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

compilerOptions: This object specifies the compiler options.

- target: This option specifies the ECMAScript target version.
- module: This option specifies the module system. (CommonJS allows to use import and export statements)
- outDir: This option specifies the output directory for compiled JavaScript files.
- esModuleInterop: This option enables interoperability between CommonJS and ES6 modules.
- forceConsistentCasingInFileNames: This option enforces consistent casing in file names.
- strict: This option enables strict type-checking options.
- skipLibCheck: The skipLibCheck compiler option in TypeScript is used to skip type checking of all declaration files (.d.ts files). This can speed up the compilation process, especially in large projects with many dependencies, by not type-checking the types from external libraries. The declaration files contain type definitions for JavaScript libraries, allowing TypeScript to understand the types used in those libraries.

## MongoDB docker setup

Steps to Run MongoDB as a Docker Container on Windows 11

1. **Install Docker Desktop**:

   - Download Docker Desktop from the [official website](https://www.docker.com/products/docker-desktop).
   - Run the installer and follow the on-screen instructions.
   - After installation, start Docker Desktop.

2. **Pull the MongoDB Docker Image**:

   - Open a terminal (Command Prompt or PowerShell).
   - Run the following command to pull the MongoDB image:
     ```sh
     docker pull mongo
     ```

3. **Run the MongoDB Container**:

   - Use the following command to run a MongoDB container:
     ```sh
     docker run --name mongodb -d -p 27017:27017 mongo
     ```
   - This command does the following:
     - `--name mongodb`: Names the container "mongodb".
     - `-d`: Runs the container in detached mode.
     - `-p 27017:27017`: Maps port 27017 on your host to port 27017 on the container.

4. **Verify the MongoDB Container is Running**:

   - Run the following command to list running containers:
     ```sh
     docker ps
     ```
   - You should see the MongoDB container listed.

5. **Connect to MongoDB shell in container**:
   - You can connect to MongoDB using a MongoDB client like MongoDB Compass or via the command line using `mongo` shell:
     ```sh
     docker exec -it mongodb mongosh
     ```

### Docker Commands

```sh
# Pull MongoDB image
docker pull mongo

# Run MongoDB container
docker run --name mongodb -d -p 27017:27017 mongo

# List running containers
docker ps

# Connect to MongoDB using mongo shell
docker exec -it mongodb mongosh

# List all databases
show dbs

# Create a new database
use Library

# Create a new User admin to access the database
db.createUser({
  user: "libAdmin",
  pwd: "securePassword123",
  roles: [{ role: "dbOwner", db: "library" }]
})

```

### Using MongoDB Compass

1. **Download and Install MongoDB Compass**:

   - Download MongoDB Compass from the [official website](https://www.mongodb.com/try/download/compass).
   - Install MongoDB Compass by following the on-screen instructions.

2. **Connect to MongoDB**:

   - Open MongoDB Compass.
   - In the "New Connection" dialog, enter the connection string: `mongodb://libAdmin:securePassword123@localhost:27017/library`.
   - Click "Connect".

## Setting up Express Server

Let us start by creating a src folder. Let us start with creating a .env to store the environment variables.

```sh
MONGO_USERNAME=jith
MONGO_PASSWORD=@jits

SERVER_PORT=8000
```

Now let us create a config.ts file in the src folder to load the environment variables.

```ts
import dotenv from "dotenv";
import { url } from "inspector";
import { mongo } from "mongoose";

dotenv.config();
const MONGO_USERNAME: string = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD: string = encodeURIComponent(
  process.env.MONGO_PASSWORD || ""
);

const MONGO_URL: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/library`;
const PORT: number = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8000;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: PORT,
  },
};
```

Now let us create a server.ts file in the src folder and start the express server. We will also connect to the MongoDB database in a self-invoking async function.
Ensure that the docker container is running before starting the server. You can start the server using the following command.

```sh
$ npm run dev
```

```ts
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import { func } from "joi";
import mongoose from "mongoose";

const PORT = config.server.port;

const app: Express = express();
app.use(express.json());
app.use(cors());

(async function startUp() {
  try {
    console.log(`starting server and connecting to : ${config.mongo.url}`);

    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });

    app.get("/health", (req: Request, res: Response) => {
      res.status(200).json({ message: "Server is running properly" });
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Could not make a connection to the database`, error);
  }
})();
```

### Testing the Server

We can test server using Postman or curl. Let us test the health endpoint using curl.

```sh
$ curl http://localhost:8000/health
```
