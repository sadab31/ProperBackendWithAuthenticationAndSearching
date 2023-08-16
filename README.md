# ProperBackendWithAuthenticationAndSearching

There are two options in the home page. Login and Register.
A user can register and the data will be stored in the Users Collection.
When a user tries to Login, I have used passport local strategy authentication which
also creates a session when an user is authenticated.

The hashed password using bycript is taken our of the db and matched to authenticate.

Also the email of the user is saved in the session collection.

When a user is succesfully authenticated, he is redirected to the route /section2 along with his email where I implemented searching and sorting.

User enters a list of numbers and a single number. I check that list and see if the number exists there.
If yes I send true otherewise false. Also, I save the response in a collection called section2.

Lastly, I made an api endpoint which takes values from the query parameters, searches the db collection
and sends a JSON response based on the email and timestamp rnage of an user.
