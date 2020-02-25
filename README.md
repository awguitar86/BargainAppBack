## Bargain App Back End

To use this API, clone this repo and then do

```
npm install
```

to install all the depenedencies.

Then create a .env file in the root directory and copy this code replacing the MONGO variables with your mongodb credentials:

```
MONGO_USERNAME=mongodb-username
MONGO_PASSWORD=mongodb-password
MONGO_HOSTNAME=mongodb-hostname
MONGO_DB=mongodb-database-name
PORT=8080
```

### REST Endpoints

The first thing you want to do to use the API is create a user, because to create, edit or delete a car or item you have to be signed in as a user.

#### User

PUT /auth/signup\
To signup all you need is an email, password, and name field

```
{ email: email@email.com, password: yourspecialpassword, name: John Hancock }
```

POST /auth/login\
To login you just need your email and password you signed up with.

```
{ email: email@email.com, password: yourspecialpassword }
```

#### Cars

GET /cars\
This endpoint gets all cars in the database. No auth needed.

GET /cars/:carId\
If you know the car id, this is how you get that single car. Just need the car id in the endpoint url. No auth needed.

GET /cars/user-cars/:userId\
This is used to get all the cars from the user who posted the cars. Requires Auth. User needs to be logged in.

POST /cars/\
Post a car to database. Requires Auth. User needs to be logged in.

```
{
  title: String required,
  imageUrls: Array of Strings (up to 5 images) 1 image required,
  description: String required,
  year: Number required,
  make: String required,
  model: String required,
  bodyType: String required,
  mileage: Number required,
  vin: String required,
  titleType: String required,
  color: String,
  transmission: String,
  cylinders: Number,
  fuelType: String,
  doorCount: Number,
  condition: String,
  driveType: String,
  price: Number required,
  isFirmOnPrice: Boolean required,
  location: String required,
  sellerType: String required,
}
```

PUT /cars/:carId\
Update a car in the database. Requires Auth. User needs to be logged in.

```
{
  title: String required,
  imageUrls: Array of Strings (up to 5 images) 1 image required,
  description: String required,
  year: Number required,
  make: String required,
  model: String required,
  bodyType: String required,
  mileage: Number required,
  vin: String required,
  titleType: String required,
  color: String,
  transmission: String,
  cylinders: Number,
  fuelType: String,
  doorCount: Number,
  condition: String,
  driveType: String,
  price: Number required,
  isFirmOnPrice: Boolean required,
  location: String required,
  sellerType: String required,
}
```

DELETE /cars/:carId\
Deletes one car from the database. Requires Auth. User needs to be logged in.

#### Items

GET /items\
Gets all items in the database. Does not require auth.

GET /items/:itemId\
Gets one item from the database. Does not require auth.

GET /items/user-items/:userId\
Get all items posted by user. Requires Auth. User needs to be logged in.

POST /items\
Post an item to database. Requires Auth. User needs to be logged in.

```
  title: String required,
  imageUrls: Array of Strings (up to 5 images) 1 images required,
  category: String required,
  condition: String required,
  description: String required,
  price: Number required,
  isFirmOnPrice: Boolean required,
  location: String required
```

PUT /items/:itemId\
Update an item in the database. Requires Auth. User needs to be logged in.

```
  title: String required,
  imageUrls: Array of Strings (up to 5 images) 1 images required,
  category: String required,
  condition: String required,
  description: String required,
  price: Number required,
  isFirmOnPrice: Boolean required,
  location: String required
```

DELETE /items/:itemId\
Delete an item in the database. Requires Auth. User needs to be logged in.
