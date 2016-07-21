# TobMaps
Status: In development.

What should the user already have installed or configured for the project?
You will need to install these technologies in your Computer:
Git
Node.js and NPM.
MongoDB
and finally, You need to install Meteor.js in your OS, Linux, Windows, Mac.

What might they have a hard time understanding right away?
JavaScript, Frameworks, Software Architecture, NoSQL Database.

## Meteor Packages / Description / Why we need them.

less  (for compile .less files)
iron:router (for routes navigation)
twbs:bootstrap@3.3.5 (framework css bootstrap)
fortawesome:fontawesome (icons library)
zimme:iron-router-active (which route is active)
jquery (js library)
okgrow:iron-router-autoscroll
### Packages for collections in MongoDB
aldeed:simple-schema
aldeed:collection2
aldeed:autoform
mongo

### Base packages for meteor.
meteor-base
mobile-experience
blaze-html-templates
session
tracker
logging
reload
random
ejson
spacebars
check
standard-minifier-css
standard-minifier-js

## Installation
What steps need to be taken to have the project up and running?

Clone this repository with the command:
git clone
Move into the folder with the command:
cd
Install NPM dependencies with the command:
meteor npm install
Start or Run Meteor with the command:
Meteor or Meteor run.

## Usage
When meteor app starts, you will see an URL like http://localhost:3000, write it in your browser.

## Folder Structure

Estructura del proyecto:
### .meteor folder
Here you will find the meteor background configuration as packages, packages version.
.meteor
### clients folder
Here you will find template modules separated by folders.
/client/
------ /views/
------ ------/common/ components as footer, header, sidenav
------ ------/layouts/ Main Layout
------ /stylesheets/ (less)
------ ------ /components/
------ ------ ----- styles.less
------ /plugins/ ()
### lib folder
Here you will find the necessary code for Routes and MongoDB Collections
/lib/ (codigo necesario para correr en ambas capas client-server)
------ ------ /collections
------ ------ ------ /components-module-feature/
------ routes.js (all routes needed for the app to run, see file)
### npm packages folder
Here you will find the npm packages that you require for the project.
/packages/ (paquetes)
------ ------ npm-container
### private folder
(Only information for the server)
/private/
### public folder
Here you will find folder structure for assets files like images, static files.
/public/
### server folder
Here you will find the code that only is executed in server side.
/server/
------ methods
------ ------ /components/
------ publications
------ ------ /components/
------ startup.js
packages.json


## Bugs

## Frequently asked questions

## Table of Contents

## How to contribute to the project


License
----
.