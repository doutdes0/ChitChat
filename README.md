<h1 align="center"> ChitChat </h1> <br>
<p align="center">
  <a href="https://doutdes0.github.io/ChitChat/">
    <img alt="chat-logo" src="https://i.imgur.com/HxPbth7.png" width="450">
  </a>
</p>

<p align="center">
  Speak, talk, chat..
</p>

## Table of Contents

- [Introduction](#introduction)
- [Stack](#stack)
- [Features](#features)
- [Setup on your PC ](#setup-on-your-pc)
- [Visuals](#visuals)

## Introduction

Welcome to ChitChat! Basic web chat app with mostly basic features. With this app you'll be able to not only chat but also message each ohter!
Client is hosted on gh-pages, server - on heroku, DB - on MongoDB cluster, so the app is fully operable and available at provided <a href="https://doutdes0.github.io/ChitChat/">URL</a>.

<p align="center">
  <img src = "https://i.imgur.com/Aj1i7Sr.png" width=350>
</p>

## Stack

Client: vite, React, Typescript, Redux, axios, socket.io, toastify, styled-components.
Server: node, express, mongoose, socket.io, jsonwebtoken, bcrypt.
DB: MongoDB.

## Features

A few of the things this app showcases:

- Authentication
- JWT based security, sensetive data encryption
- Chatting in real time with the help of web sockets
- Choosing one of the avatars from multiavatar api
- Emoji availability

## Setup on your PC

1. Clone this repository or download it.
2. Have vite installed.
3. Run npm i in server/client folders
4. Have your own MongoDB cluster ready.
5. Resolve absent .env variables in `index.js` and check the server config folder for allowed origins.
   On the client change HOST in API_ROUTES in utils folder.
6. Run `npm run dev` in both server and client folders.
7. OR alternatively run `npm run host` on the client to generate a URL accessbile through your wi-fi network by other devices.
   Make sure to increase access token life in userController, bc refresh token will not be set in your browser as it's a secure cookie and localhost doesn't provide a security protocol.

## Visuals

<p align="center">
  <img src = "https://i.imgur.com/AvFAuAQ.png" width=350>
</p>
<br>
<p align="center">
  <img src = "https://i.imgur.com/QwZzMlv.png" width=350>
</p>
