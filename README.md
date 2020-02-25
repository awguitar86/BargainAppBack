## Bargain App Back End

To use this API, clone this repo and then do

`npm install`

to install all the depenedencies.

Then create a .env file in the root directory and copy this code replacing the MONGO variables with your mongodb credentials:

`MONGO_USERNAME=mongodb-username MONGO_PASSWORD=mongodb-password MONGO_HOSTNAME=mongodb-hostname MONGO_DB=mongodb-database-name PORT=8080`

### REST Endpoints

The first thing you want to do to use the API is create a user, because to create, edit or delete a car or item you have to be signed in as a user.

#### User

PUT /auth/signup\
To signup all you need is an email, password, and name field

`{ email: email@email.com, password: yourspecialpassword, name: John Hancock }`

POST /auth/login\
To login you just need your email and password you signed up with.

`{ email: email@email.com, password: yourspecialpassword }`

#### Cars

GET /cars\
This endpoint gets all cars in the database. No auth needed.

GET /cars/:carId\
If you know the car id, this is how you get that single car. Just need the car id in the endpoint url. No auth needed.

GET /cars/user-cars/:userId\
This is used to get all the cars from the user who posted the cars. This requires auth. Must login to use it.

POST /cars/\
To post a new car to sell, it requires a lot of data.
