# Rabbit Juice
  Rabbit juice is an app that powers customers to customize and order their favourite juice wherever they are.

## 

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
4. Run migrations: `knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## How to order

Customer
1. Choose from 7 preset juices or customize from 15 ingredient options
2. Input name and phone number
3. Check the total $ and total qty and click order now
4. Receive text message confirming that the orders are in!

Business owner
1. Receive a text message notifying that a customer has created an order.
2. visit `http://localhost:8080/business` and check order details.
3. Input estimated time of completion and click 'submit' button.
4. When the order is picked up, click 'picked up' button and hide the order details


## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- express 4.13.4 or above
- knex 0.16.3 or above
- pg 6.02 or above
- twilio 3.28.1 or above