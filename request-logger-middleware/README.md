# Request Logger Middleware
You can go to http://localhost:3000/ to get link; you can first go to http://localhost:3000/cookies/addCookie?key=SOMEKEY&value=SOMEVALUE to set a cookie, and go to http://localhost:3000/api to save the log in MongoDB.

If you have a previous cookies, it will delete and create a new one for you.

# Log format
```
{
  _id: "SOMEGUID",
  requestPath: "A STRING OF THE REQUEST PATH",
  requestMethod: "A STRING OF THE HTTP VERB REQUEST METHOD",
  cookies: {}, // AN OBJECT REPRESENTATION OF THE COOKIES SENT TO SERVER
  timestamp: "THE CURRENT TIME, AS A STRING"
}
```
