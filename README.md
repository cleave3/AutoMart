# AutoMart
[![Build Status](https://travis-ci.org/cleave3/AutoMart.svg?branch=develop)](https://travis-ci.org/cleave3/AutoMart)  [![Coverage Status](https://coveralls.io/repos/github/cleave3/AutoMart/badge.png?branch=develop)](https://coveralls.io/github/cleave3/AutoMart?branch=develop)   [![Test Coverage](https://api.codeclimate.com/v1/badges/bef163d83d46aa2f539b/test_coverage)](https://codeclimate.com/github/cleave3/AutoMart/test_coverage)
[![GitHub stars](https://img.shields.io/github/stars/cleave3/AutoMart.svg)](https://github.com/cleave3/AutoMart/stargazers)
# What is AutoMart ?
Auto Mart is an online market place for automobile of diverse make, model or body type. With Auto Mart, users can sell or buy from trusted dealerships of private sellers

# Technologies
* HTML
* CSS
* JavaScript (ES6)
* Express
* Node
* cloudinary

# Features
1. User can sign up.
2. User can sign in.
3. User (seller) can post a car sale advertisement.
4. User (buyer) can make a purchase order.
5. User (buyer) can update the price of his/her purchase order.
6. User (seller) can mark his/her posted AD as sold.
7. User (seller) can update the price of his/her posted AD.
8. User can view a specific car.
9. User can view all unsold cars.
10. User can view all unsold cars within a price range.
11. Admin can delete a posted AD record.
12. Admin can view all posted ads whether sold or unsold.

# How to Use the app
* Click <a href="https://cleave3.github.io/AutoMart/UI">here<a> to view user interface
* clone repo
* Run npm install
* Running Tests : npm run test
* Run npm start
* On postman test the following enpoints
<table>
    <tr>
        <th>API</th>
        <th>Method</th>
        <th>Action</th>
    </tr>
    <tr>
        <td>/api/v1/auth/signup</td>
        <td>POST</td>
        <td>Create new user</td>
    </tr>
    <tr>
        <td>/api/v1/auth/login</td>
        <td>POST</td>
        <td>Sign in user</td>
    </tr>
    <tr>
        <td>/api/v1/car</td>
        <td>POST</td>
        <td>create new car ad</td>
    </tr>
     <tr>
        <td>/api/v1/car/:id</td>
        <td>GET</td>
        <td>View a specific car</td>
    </tr>
    <tr>
        <td>/api/v1/car</td>
        <td>GET</td>
        <td>View all cars</td>
    </tr>
    <tr>
        <td>/api/v1/car</td>
        <td>GET</td>
        <td>View all available cars</td>
    </tr>
    <tr>
        <td>/api/v1/car</td>
        <td>GET</td>
        <td>View all available cars within a price range</td>
    </tr>
     <tr>
        <td>/api/v1/car/:id/status</td>
        <td>PATCH</td>
        <td>Mark a specific car as sold</td>
    </tr>
    <tr>
        <td>/api/v1/car/:id/price</td>
        <td>PATCH</td>
        <td>Update a specific car price</td>
    </tr>
    <tr>
        <td>/api/v1/car/:id</td>
        <td>DELETE</td>
        <td>Delete a specific car</td>
    </tr>
    <tr>
        <td>/api/v1/order</td>
        <td>POST</td>
        <td>Create an order</td>
    </tr>
    <tr>
        <td>/api/v1/car/:id/price</td>
        <td>PATCH</td>
        <td>Update a specific order price</td>
    </tr>
    <tr>
        <td>/api/v1/order/buyer/:id</td>
        <td>GET</td>
        <td>Get all orders of a specific buyer</td>
    </tr>
</table>

# Author
Owhiroro Cleave
