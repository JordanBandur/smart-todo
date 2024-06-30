Smart ToDo User's Guide
=========
## Description
A smart, auto-categorizing to-do list app. Users simply add a task's name, and the app automatically sorts it into the appropriate list. The advanced sorting functionality is powered by Google Gemini, ensuring accurate and efficient organization of tasks.
## Tech Stack

### **Front End**
- JavaScript
- EJS
- CSS
- Sass

### **Back End**
- Node.js
- Express
- PostgreSQL (pg)
- bcrypt
- dotenv
- express-session
- morgan
- node-fetch
- cross-fetch
- chalk
- @google/generative-ai

## Screenshots
!["User not logged in"](https://github.com/JordanBandur/smart-todo/blob/master/docs/user-not-logged-in.png)
!["User login"](https://github.com/JordanBandur/smart-todo/blob/master/docs/user-login.png)
!["User logged in"](https://github.com/JordanBandur/smart-todo/blob/master/docs/user-logged-in.png)
!["User adding todo"](https://github.com/JordanBandur/smart-todo/blob/master/docs/adding-todo.png)
!["Added todo"](https://github.com/JordanBandur/smart-todo/blob/master/docs/added-todo.png)
!["User completes todo"](https://github.com/JordanBandur/smart-todo/blob/master/docs/user-complete-todos.png)
!["User account modal"](https://github.com/JordanBandur/smart-todo/blob/master/docs/user-account.png)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `your-username` 
  - password: `your-password` 
  - database: `your-database-name`
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

