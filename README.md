To Run Project:
npm run dev

Used technologies:
Frontend: React
Backend: NodeJs
Database: MySql

Packages In Frontend :

**Axios** - for get, post, etc methods

**React router dom** - import { BrowserRouter, Routes, Route } from 'react-router-dom’  and Link element

Packages In Backend :

**nodemon** - server file-da change edende serveri herdefe dayandirib yeniden ise salmamaq ucun package

**mysql2 package** -mysql ile connection;

**cors package** - bizim saytimiz mes 3000 ci portda acilir, yeni htttp servere muraciet edib 3000 ci portdan bize sayti getirir, biz basqa porta muraciet edende same origin policy-e  (eyni mense siyasetine ) gore sorgunu blocklayacaq. Ona gore bu middleware cors paketi lazimdir.

Project github link: https://github.com/rufetisr/CoinProject
Technical task: Catalog of precious coins
Design a precious coin catalog web application where you can search for any coin and see detailed information about it.
Technical requirements
The application itself should be a client-side in React. The server side should be compiled in NodeJS using a MySQL database. Client-server interaction should be designed according to the REST-architecture.
The appearance of the page should match the layout. The application must be adapted for mobile devices.
Coin catalog
The main page contains links to the three main sections of the directory:
•	Commemorative coins
•	Bullion coins
•	Exclusive coins
List of coins
Each item in the list is a thumbnail image and brief description of the coin.
 
More information about the coin
More information about the coin is available on the page:
•	Coin name
•	Front and back photo
•	Detailed description
•	Features table
 
Administrative part
Design an admin workspace with the ability to add and edit information about coins to fill the catalog.
Access to the administrative section is performed using the administrator's login and password.
The main page consists of a list of coins and a search input field by name.
There is also an "Add new coin" button on the page.
 
View statistics
Keep statistics about coin views on the site and add these statistics to the page.

Login Page:
Used Google authentificator to sign in or signup with google account. As well as for users who signed manually stored their data in database.

Mysql database diagram:  
Users table – Coin table (Many to Many relation)
CoinType table – Coin table (One to Many relation)

Tables:
•	User table
•	Admin table
•	Coin table
•	CoinType table
•	UserCoin table
 
