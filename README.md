# Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. In postrgres, create database midterm
6. Create role labber with login password 'labber';
7. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
8. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
9. Run the server: `npm run local`
10. Visit `http://localhost:8080/`

## How to use:
Log in with a valid user (see below for login info).
From the index page add any number of dishes to the cart and click Proceed to Checkout button.

On the checkout page, you can modify item quantity or remove item from the order. Finish the order by clicking on either Pay Online or Pay in Person.
At this point, the app is set up to send out an automated call with the full order (text-to-speech) through Twillio API.

All the orders submitted via the checkout page will be available for viewing on http://localhost:8080/orders page. Here you can specify how many minutes the order will take to process (followed by an automated Twillio text message).

The final step is to close the order by clicking Order Complete (followed by another automated Twillio text message).

### Note:
The app makes use of a user id stored in a cookie.
In order to set that, please access http://localhost:8080/login
and enter username "vlad", password "12345".

The twillio related code is commented out to prevent additional billing to the test account.

## Dependencies
- Postgresql
- Node 5.10.x or above
- NPM 3.8.x or above
