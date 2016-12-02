# Health Tracker with Backbone

This web application tracks the user's calorie intake: it retrieves nutritional infos through Nutritionix APIs.
I built this app as a project for Udacity Front End Web Developer Nanodegree.

## Technologies used

* JavaScript
* Backbone
* Underscore
* Jquery
* UIkit
* Require.js
* Bower
* Gulp

## APIs implemented

* Nutritionix APIs

## Health Tracker is under development, but you can try it anyway [at this link](https://wildboni.github.io/health-tracker/src/index.html)

## Running locally

1. Clone the GitHub repository

  ```
  git clone https://github.com/WildBoni/health-tracker.git
  ```

2. Open the public/index.html file in your favourite browser and the app is ready to run!

##### If you would like to recreate the working environment, do as follows:

1. Install [Node.js](https://nodejs.org/)

2. Install [Bower](https://bower.io/)

3.  Open command line and
  ``` sh
  $> cd /path/to/your-project-folder
  $> npm install
  ```
###### Now gulp.js and bower are ready to run!

4. Navigate to your project folder and

  ```
  $ bower install
  ```
###### This will download bower dependencies used in the project (Underscore, Backbone, Backbone.localStorage, jQuery, require.js, UIkit)

5. To create the libraries in the src folder, navigate to your project folder and

  ```
  $ gulp
  ```
###### This will copy libraries from Bower folder to the src folder


### Useful links and resources
* References to StackOverflow discussions and other coding solution are commented inside the code
* Special thanks to the Udacity Team and forum users
