Basic token based auth

Routes are:
/ GET

/setup GET (this set up a dummy user{name: 'Nick Boss', password: 'PassWord1010'} and returns an access token)

/api GET - Welcome note

/api/users GET - Returns all users list

/api/authenticate POST - accepts name and password in body and also the token received from the /setup route to authenticate




config.js shows the DB used.