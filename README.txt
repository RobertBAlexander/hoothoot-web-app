************************************My Hoot App*******************************

Created by:
          Robert Alexander
          02884232

***************************The Hoot App is a lot like a************************
***************************Tweeting App, but it should*************************
***************************only be used by Night Owls!**********************


Features:
-This app is the web side of a Hoot app which can also be accessed through an android app.

-There is Admin access through the web. The admin can view users and delete users through the dahsboard.
 The can also view statistics about the app through the stats page.



Welcome Screen:
-Users may chose login or signup only from this screen.



Login/Signup:
-This App allows a user to signup with their details, and then log in to the app.

-Upon signing up a user enters their
                           -first name
                           -last name
                           -email
                           -password

-the password is hashed and salted for security, and user is added to an online database

-upon login user is asked for their e-mail and password. Password is run through bcrypt
to check hashed and salted password.

-User validation is performed on login. If no user present, they may not login.

-Admins also access the app through this same login screen.



View My Hoots:
-After login a user lands on the View My Hoots page.

-This timeline displays all tweets from the current user.

-When a user lands on this screen it updates the following/followers display for the
duration of the app.



Menu:
-The menu displays at the top of the screen in each page of the app.

-The Hoot button allows a user to create new hoots. They may type text, choose a hashtag, insert images,
then when you hoot you are redirected to the view my hoots page to view it.

-The View My Hoots button allows the user to view a list of their hoots. It also allows the user to
view the number of people they follow, and how many people follow them.

-View All Hoots displays a list of users, and also a list of all hoots on the hoot app. The list of users
are buttons that allow you to click on them to view their hoots, or to click on their + or - buttons to follow
or unfollow them respectively.

-Whoo you follow displays a list of hoots that were created by users that you follow.

-The settings window allows you to visit the settings and update them.

-The logout button logs the user out and sends them to the landing page.


Hoot Creation:
-Up to 140 character Hoots can be created when you tap the Hoot Icon. You may then fill in the
details of your hoot, select a contact to send it to, and then e-mail them. If you hit back
in this screen, no Hoot is created.

-A countdown displays showing you how many characters you have remaining to Hoot. When this
number goes in the minus, you may no longer create the Hoot.


-User may Hoot out, if hoot length criteria is met. Then they are returned to the View my hoots page.

View my Hoots:
-A user may view their own hoots, and also may delete them here. They may delete all of their hoots
with one button, or select each hoot they wish to delete, and delete those in one go.



Settings:
The user may input new details here and update their settings. Minor bug. If no update performed
the settings will not be reloaded on this page.



Persistence:
-All data is stored through controller calls to mlabs.

-All data is stored in mlabs.

Git Repository: https://github.com/RobertBAlexander/hoothoot-web-app

Heroku site: https://hoothoot-web.herokuapp.com/
(note, database seems to have issues in heroku)