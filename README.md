# ddc-javascript-twitter
The example application we use in the Fullstack Application.  Contains helpful examples for students.

## Set Up
**The following files are required to start a new project based on this code base**
1. src/controllers/index.controller.ts
  * *This file initiates a generic API controller that returns a string message when hit*
2. src/routes/index.routes.ts
  * *This file initiates a generic API route to test the controller in index.controller*
3. src/app.ts
  * *This file sets up the server to run on the provided port (5000 as set in index.ts) or default to 3000. It also sets up routing and the middleware for handling JSON responses*
4. src/database.ts
  * *This file sets up the database connection. Your connection details will be different*
5. src/index.ts
  * *This file instantiates the app. This is the entry point.*
6. .gitignore
  * *Your own version created based on `example.gitignore`*
7. .env
  * *Your own version created based on `example.env`*
8. package-lock.json
9. package.json
10. tsconfig.json
11. /sql/Dockerfile
  * *file to create a custom mysql image*
12. /sql/ddc-twitter.sql
  * *File containing create table statements to initialize the database*
13. /sql/dump.sql
  * *File that contains a mysql data dump to initialize data in the database*
14. /docker-compose.yml
  * *File to orchestrate the mysql database container* 
15. /docker-compose.env
  * *File containing the env variables for the mysql database container* 
   
 


## Run Project
1. Run `npm install -g npx` to install npx globally
2. Run `npm install -g typescript` to install typescript globally
3. `cd` into the root directory
4. Run `npm i`
5. Run `docker-compose up -d` to start a mysql database.
* Optional seed the database 
    * `docker container exec -it CONTAINER_NAME /bin/bash` to gain shell access to the container running the mysql instance.
    * `mysql -u username -p database` to gain access to the mysql cli
    * `source /dump.sql` to execute a data-dump into the database
6. Run `npx tsc` to compile JS files from TS files and put them in the dist directory **DO NOT edit files in the `dist` directory**
7. Run `node dist/index.js` to start the server on [port 5000] (http://localhost:5000)
*OR*
- Run `npm run compile` to do both and watch for changes


## Calling API (In Postman or Insomnia)
The routes are formed as follows:
http://`[server]`:`[port]`/api /`[object]`/`[how we want to get it]`:`[param]`


docker exec -i ddc-javascript-twitter_sql mysql -u ddctwitter -p deepdive  ddctwitter < sql/db.sql
