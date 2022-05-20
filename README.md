Deployment Link-:[listscreator.herokuapp.com](listscreator.herokuapp.com)
Before go to this link, first you have to see alluserdetails file in this repository to get the details of user in the database and steps to follow different tasks to test this application.

Idea-:
A company wants to assign a task of creating lists to his four employess(admins in the project) and one list is created by one user only. 

Steps to run on the localhost:
1)Create account on mongodb, then create a project.
2) Inside that project, create the database and provide the require permissions 
3) Then you get a link like this "mongodb+srv://<username>:<password>@cluster0.imqbd.mongodb.net/spottabl?retryWrites=true&w=majority"
4) Open this code in your pc and create .env file in the backend folder
5) Place this content in that file
	DATABASE=mongodb+srv://<username>:<password>@cluster0.imqbd.mongodb.net/spottabl?retryWrites=true&w=majority
	PORT=<any port number>
6) To start the server use these command inside backend foleder-: "nodemon index.js"
7) 6) To start the react use these command inside the main folder-: "npm start"
8) Your app will start

Functions-:
1) Fully responsive website
2) Realtime data
3) Users can see all the list which are currently in the database in realtime.
4) Only admin can create a list
5) Users can add themselves to the company's database
6) Users can be searched by using their name or email id
7) Lists can be searched by their name.
8) Multiple users can add at a time in the list.
9) Only list creator can edit the list(add user, delete user, delete list).
10) Only admin and the user itself can update the user's details.
11) Everyone can see user details
