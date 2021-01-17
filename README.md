<h1 align="center">
  <br>
  <img src="https://user-images.githubusercontent.com/52430997/104851182-b7702300-58b0-11eb-85b5-3fa7a427b494.png" width="350">
  <br>
  <br>
  COVID Connections
  <br>
</h1>

<h4 align="center">A platform to help keep your circle safer</h4>


<p align="center">
  <img src="https://img.shields.io/badge/node-%3E=14.0-blue.svg?style=flat-square" alt="node:>=14.0">
  <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square" alt="License: MIT">
</p>

<p align="center">
  <a href="#overview">Overview</a> • <a href="#screenshots">Screenshots</a> • <a href="#features">Features</a> • <a href="#installation">Installation</a> • <a href="#authors">Authors</a> • <a href="#license">License</a>
</p>

## Overview

COVID Connections keeps track of your 'circle' - a list of people you interact with regularly and semi-regularly. When one of those users updates their status, you're then updated on their COVID status, for example, if they've recently gone into self-isolation. This allows you to be aware of who's at risk in your social group. Moreover, COVID Connections notifies you when your connections are in need, so you can volunteer to help others with anything from grocery shopping to snow shoveling.

The Android app is built in React Native, which authenticates users using JWT bearer tokens. Data is fetched from a MongoDB database via an Express.js REST API on a Node.js server. 

This project was built for [Hack the North 2020](https://devpost.com/software/htn-21).

## Demo

<p align="center">
  <img src="https://user-images.githubusercontent.com/52430997/104854415-d330f480-58c3-11eb-935e-12083e043d9f.gif" alt="Demo" width="300px">
</p>

## Features

#### Authentication
* Private routes
* Register and login with passport and JWT - passwords are encrypted

#### Circles
* Add the people you interact with often, and keep each other in the loop so everyone can assess their own risk
* Get notified when someone you consider a close-contact reports that they may have been exposed or that they have tested positive for COVID-19

#### Lend a Hand
* A dedicated space to help those who are severely at risk - or ask for help yourself
* Volunteer to help your connections with anything from grocery shopping to snow shoveling

#### User Privacy
* Decide how much data you are willing to share with different circles


## Installation

### Server

SmartGarden requires at least version 14.x of [Node.js](https://nodejs.org/en/) (which comes with [npm](http://npmjs.com/)) installed on the server. Begin by installing and starting the server:

```cmd
# Clone this repository
$ git clone https://github.com/elena-pan/COVID-Connections.git

# Navigate into the server folder of the repository
$ cd COVID-Connections/server

# Install JS dependencies
$ npm install

# Run the server
$ npm start
```

### App

The app is built with [Expo](https://expo.io/). With Expo installed, from the root directory of the repository:
```cmd
# Navigate into the app folder of the repository
$ cd app

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Authors

* [Elena Pan](https://github.com/elena-pan), [Umut Emre](https://github.com/umutcanemre), [Chris Fang](https://github.com/AntiChange) and [Dhananjay Patki](https://github.com/dpatki)


## License

This project is licensed under the terms of the MIT license.
