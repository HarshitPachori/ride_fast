# `RIDE FAST - A Cab Booking Application`

This project is a `CAB Booking application` by which a user can book a cab by just typing there pickup and destination location. With a robust Backend in `Java` and `Spring Boot` & visualy appealing user interface or Frontend in `NextJs` , `Typescript` and `TailwindCSS` & `Razorpay Payment Gateway` for overall better user experience and easyness, we have developed this application.

## TECH STACK

- <b>`Backend`</b> : Java, Spring Boot, Spring Security, Spring Data JPA, JWT Authentication, MySQL, Postman, Junit, Mockito, TestContainers, Docker, RestAssured, etc.
- <b>`Frontend`</b> : ReactJs, NextJs14, TailwindCSS, Redux-Toolkit Typescript, MaterialUI, etc

## Table of Contents

- [Software and Tools required](#software-and-tools-required)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running the Frontend](#running-the-frontend)
- [API Endpoints](#api-endpoints)
  - [Register User](#register-user)
  - [Login User](#login-user)
  - [Register Driver](#register-driver)
  - [Login Driver](#login-driver)
  - [Book Ride](#book-ride)
  - [Accept Ride](#accept-ride)
  - [Start Ride](#start-ride)
  - [Complete Ride](#complete-ride)
  - [Decline Ride](#decline-ride)
  - [Get Ride By Id](#get-ride-by-id)
  - [Requested Rides By User](#request-rides-by-user)
  - [Completed Rides By User](#completed-rides-by-user)
  - [Completed Rides By Driver](#completed-rides-by-driver)
  - [Cancelled Rides By Driver](#cancelled-rides-by-driver)
- [Responses](#responses)
  - [Success Responses](#success-responses)
  - [Error Responses](#error-responses)
- [Postman Collection](#postman-collection)
- [Snapshots](#snapshots)

## Software and Tools required

- JDK 17 or more
- NodeJs
- Git
- MySQL Client
- Docker
- For Backend (IDE or Editors)
  - IntelliJ Idea (Community / Ultimate)
  - Spring Tool Suite (STS)
  - Eclipse
  - NetBeans
  - Visual Studio Code (VS Code)
- For Frontend (Editors)
  - Visual Studio Code(VS Code) -> `Recommended`
  - Sublime Text

## Installation

### Clone Git Repository to your local machine

```bash
git clone https://github.com/HarshitPachori/ride_fast.git
```

### Backend

## Running the Server

- <b>Server Directory</b>

  ```bash
  cd ride_fast_backend
  ```

- <b>Setup Database</b>

  - Go to `ride_fast_backend/src/main/resources/application.yaml` file and replace the port, url, username, password with your server `port` address and your `mysql` credentials.

    ```yaml
    server:
      port: 8080
    spring:
      datasource:
        url: jdbc:mysql://localhost:3306/ride_fast_db?createDatabaseIfNotExist=true
        username: root
        password: mysql
      jpa:
        hibernate:
          ddl-auto: update
        show-sql: true
        properties:
          format_sql: true
    ```

- <b>Run Server</b>
  ```bash
  ./mvnw spring-boot:run
  ```

## Running the Frontend

- <b>Client Directory</b>

  ```bash
  cd ride_fast_frontend
  ```

- <b>Update or Install Npm Packages</b>
  ```bash
  npm install
  ```
- <b>Move to `ride_fast_frontend/next.config.mjs` file</b>

  - Replace the following path in destination field with your server url to apply `proxy` for server so that all our frontend's request to server starting with `/api` will get redirected to this URL.

    ```js
     async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8080/api/:path*",
        },
      ];
    },
    ```

- <b>Run Client</b>

  ```bash
  npm run dev
  ```

## API Endpoints

- ### Register User

  ```java
   @route POST /api/v1/auth/register/user
   @desc Register New User
   @param {String} fullname
   @param {String} mobile
   @param {String} email
   @param {String} password
   @returns {Object} User
   @returns {StatusCode} 201 - Created
   @returns {StatusCode} 400 - Bad Request
  ```

- ### Login User

  ```java
   @route POST /api/v1/auth/login
   @desc Login User
   @param {String} email
   @param {String} password
   @param {String} userType
   @returns {Object} {String} accessToken, {String} refreshToken
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
   @returns {StatusCode} 404 - Not Found
  ```

- ### Register Driver

  ```java
   @route POST /api/v1/auth/register/driver
   @desc Register new Driver
   @param {String} fullname
   @param {String} email
   @param {String} password
   @param {String} mobile
   @param {double} latitude
   @param {double} longitude
   @param {String} licenseNumber
   @param {String} licenseState
   @param {String} licenseExpirationDate
   @param {String} company
   @param {String} model
   @param {String} color
   @param {int} year
   @param {String} licensePlate
   @param {int} capacity
   @returns {Object} Driver
   @returns {StatusCode} 201 - Created
   @returns {StatusCode} 400 - Bad Request
  ```

- ### Login Driver

  ```java
   @route POST /api/v1/auth/login
   @desc Login Driver
   @param {String} email
   @param {String} password
   @param {String} userType
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
   @returns {StatusCode} 404 - Not Found
  ```

- ### Book Ride

  ```java
   @route POST /api/v1/ride/request
   @desc Book Ride
   @header {Authorization} jwtToken
   @param {String} pickupArea
   @param {String} destinationArea
   @param {double} pickupLatitude
   @param {double} pickupLongitude
   @param {double} destinationLatitude
   @param {double} destinationLongitude
   @returns {Object} Ride
   @returns {StatusCode} 201 - Created
   @returns {StatusCode} 400 - Bad Request
  ```

## Responses

- ### Success Responses

  - <b>Login User/Driver (Success)</b>

    ```json
    {
      "statusCode": 200,
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGdtYWlsLmNvbSIsImlhdCI6MTcxMDY3MjMyMSwiZXhwIjoxNzExNTcyMzIxfQ.LIc-mqKb1-RRsl4W4l4emn0GDfpSXDY1Wy6NfS9-7dY",
      "refreshToken": "dfkjngfngn4gh5nf4z5hg4z5n5hg4xnx",
      "message": "Got All Data Successfuly",
      "success": true
    }
    ```

- ### Error Responses

  ```json
  {
    "statusCode": 400,
    "message": "All fields are required",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 404,
    "message": "Resource Not Found with given Id",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 401,
    "message": "You need to be logged in first in order to perform this action",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 501,
    "message": "Internal Server Error",
    "errors": [],
    "success": false
  }
  ```

<!-- - ## Postman Collection

  - ### [Postman Collection Link](https://restless-moon-499399.postman.co/workspace/New-Team-Workspace~c7722ba8-7049-40b0-97c9-e367daa05b43/collection/23880545-2625be57-f365-488a-934e-4d7a9fe64389?action=share&creator=23880545)   -->

- ## Snapshots
<img src="./snapshots/s1.png" />
<img src="./snapshots/s2.png" />
<img src="./snapshots/s5.png" />
<img src="./snapshots/s6.png"/>
<img src="./snapshots/s10.png"/>
<img src="./snapshots/s11.png"/>
<img src="./snapshots/s12.png"/>
<img src="./snapshots/s13.png"/>
<img src="./snapshots/s7.png"/>
<img src="./snapshots/s8.png"/>
<img src="./snapshots/s9.png" height="500"/>
<img src="./snapshots/s15.png" height="500"/>
<img src="./snapshots/s16.png"/>
<img src="./snapshots/s17.png"/>
<img src="./snapshots/s18.png"/>
<img src="./snapshots/s19.png"/>
<img src="./snapshots/s20.png"/>
<img src="./snapshots/s21.png"/>
<img src="./snapshots/s22.png"/>
