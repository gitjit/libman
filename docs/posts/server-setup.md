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

5. **Connect to MongoDB**:
   - You can connect to MongoDB using a MongoDB client like MongoDB Compass or via the command line using `mongo` shell:
     ```sh
     mongo --host localhost --port 27017
     ```

### Example Docker Commands

```sh
# Pull MongoDB image
docker pull mongo

# Run MongoDB container
docker run --name mongodb -d -p 27017:27017 mongo

# List running containers
docker ps

# Connect to MongoDB using mongo shell
mongo --host localhost --port 27017
```

Add these steps to your `server-setup.md` file under the "Server Setup" section.

### Using MongoDB Compass

1. **Download and Install MongoDB Compass**:

   - Download MongoDB Compass from the [official website](https://www.mongodb.com/try/download/compass).
   - Install MongoDB Compass by following the on-screen instructions.

2. **Connect to MongoDB**:

   - Open MongoDB Compass.
   - In the "New Connection" dialog, enter the connection string: `mongodb://localhost:27017`.
   - Click "Connect".

3. **View Databases and Collections**:
   - Once connected, you will see a list of databases on the left sidebar.
   - Click on a database to view its collections.
   - Click on a collection to view its documents.

### Using MongoDB Shell (`mongo`)

1. **Open a Terminal**:

   - Open Command Prompt or PowerShell.

2. **Connect to MongoDB**:

   - Run the following command to connect to MongoDB (If and only if you have MongoDB shell installed):
     ```sh
     mongo --host localhost --port 27017
     ```

3. **View Databases**:

   - In the MongoDB shell, run the following command to list all databases:
     ```sh
     show dbs
     ```

4. **Switch to a Database**:

   - Run the following command to switch to a specific database:
     ```sh
     use <database_name>
     ```

5. **View Collections**:

   - Run the following command to list all collections in the current database:
     ```sh
     show collections
     ```

6. **View Documents in a Collection**:
   - Run the following command to view documents in a specific collection:
     ```sh
     db.<collection_name>.find().pretty()
     ```

### Example Commands

```sh
# Connect to MongoDB
mongo --host localhost --port 27017

# List all databases
show dbs

# Switch to a specific database
use mydatabase

# List all collections in the current database
show collections

# View documents in a specific collection
db.mycollection.find().pretty()
```
