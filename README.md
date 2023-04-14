### <b>DORMITORY MANAGEMENT WEB APPLICATION</b> ###

<p> This React application is an implementation that offers an interface for managing student dormitory related activities, both from the student side and the dorm administrator side. </p>
<p> The server component is implemented with NodeJS and data storage is done via MongoDB. </p>
 
### Functionalities ###

<i>Student</i>
<ul>
        <li> submit requests to the administrator </li>
        <li> modify his own requests, before they are reviewed by the administrator </li>
        <li> vote head of dorm (among other peers) </li>
        <li> apply for the head of dorm position </li>
</ul>

<i>Administrator</i>
<ul>
        <li> fix requests from students and add status </li>
        <li> access all students data (only belonging to the dorm that he manages) </li>
        <li> check general statistics about students </li>
        <li> check the number of votes for each student in the election session (in real-time) </li>
</ul>

Below there is the application workflow sketch. To sum it up, the users log in and are granted a refresh token (stored in a jwt cookie) and an access token (stored in localstorage). These tokens are required to send requests to the REST API. As long as the refresh token is valid, the access token will be renewed. Upon expiration of the refresh token, the user will be redirected to the login page to authenticate again.

![image](https://user-images.githubusercontent.com/97849650/232151380-fdb09ef1-8cbf-420a-ad1d-143be7b90905.png)

### How to run this app: ###
<b>install nodeJS </b> ref: https://nodejs.dev/en/download/
<br> <br>
<code>cd server; npm install</code>
<br> <br>
<code>cd ../front; npm install</code>
<br> <br>
(might be necessary) <code>cd ../server; npm i bcrypt, body-parser, cookie-parser, cors, date-fns, dotenv, express, fs, jsonwebtoken, mongoose, mysql2, nodemon, pg, sequelize, uuid</code>
<br> <br>
run <code>npm start </code>from <i>server</i> directory
<br> <br>
<i>in another terminal shell</i> <code>cd front; npm start</code>
<p><b><i> Important Note</i></b></p>
<p>This app is using MongoDB in the cloud environment. You need to create an account https://www.mongodb.com/cloud and create a Mongodb cluster to initiate your database. 
 After that, click on <i>Connect</i> and extract your dbURI link as below. </p>
 
 ![image](https://user-images.githubusercontent.com/97849650/232157216-1b8f3ca3-8315-4262-9ecd-dd015ee28ef6.png)
<p>You will paste that link inside the server/index.js file (replacing the value of const dbURI)</p>

<p><b><i> Another important note </i></b></p>
<p> Since this app was designed for university needs, it is not desirable to create accounts in the main page (assuming that students already possess their university accounts). However, you cannot properly test the application without having an account. Therefore, in order to create a user, I recommend you to use POSTMAN API platform to send your POST request to the server. </p>
<p> These routes are already implemented in the backend (<i>server/routes/*</i>), but they are not exposed to the frontend. The screenshot below gives an example on how you should do it (be careful on the format for the JSON object). </p>

![image](https://user-images.githubusercontent.com/97849650/232158938-81f3e254-da0c-4296-9c84-9a3e8607a186.png)


