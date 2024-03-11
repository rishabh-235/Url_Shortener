URL Shortener

Design a URL shortener service that takes in a valid URL and returns a shortened URL, redirecting the user to the previously provided URL.

Also, keep track of total visits/clicks on the URL.

Routes

POST/URL - Generates a new short URL and returns the shortened URL in the format example.com/random-id.

GET/:id - Redirects the user to the original URL

---> Here i am using the EJS server side rendring engine for rendering our webpage on the server side only.
     this will save time for the clients for rendring the webpages.

---> Now we are giving the Authentication feature to our webpage.
     we are creating two Auth pages
     1. Signup page.
     2. Login page.

--> Install uuid to genrate the long unique uids so that we can use them as a session ids.