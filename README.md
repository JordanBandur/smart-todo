Smart ToDo User's Guide
=========

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 18.x or above
- NPM 5.x or above
- PG 6.x
- @google/generative-ai 0.10.0 or above
- bcrypt 5.1.1 or above
- chalk 2.4.2 or above
- cross-fetch 4.x or above
- dotenv 2.x or above
- ejs 2.6.2 or above
- express 4.19.2 or above
- express-session 1.18.0 or above
- morgan 1.9.1 or above
- node-fetch 3.3.2 or above

