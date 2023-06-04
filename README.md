
# E-commerce-API



## Indices

* [Auth](#auth)

  * [login](#1-login)
  * [logout](#2-logout)
  * [register](#3-register)

* [Users](#users)

  * [get All users](#1-get-all-users)
  * [get Single user](#2-get-single-user)
  * [show Me](#3-show-me)
  * [update User password](#4-update-user-password)
  * [update user](#5-update-user)

* [orders](#orders)

  * [create order](#1-create-order)
  * [get All orders](#2-get-all-orders)
  * [get single order](#3-get-single-order)
  * [my orders](#4-my-orders)
  * [update order](#5-update-order)

* [products](#products)

  * [create product](#1-create-product)
  * [delete product](#2-delete-product)
  * [get All Products](#3-get-all-products)
  * [get single product](#4-get-single-product)
  * [get single product reviews](#5-get-single-product-reviews)
  * [update product](#6-update-product)
  * [upload image](#7-upload-image)

* [reviews](#reviews)

  * [create review](#1-create-review)
  * [delete review](#2-delete-review)
  * [get Single review](#3-get-single-review)
  * [get all reviews](#4-get-all-reviews)
  * [update review](#5-update-review)


--------


## Auth



### 1. login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/auth/login
```



***Body:***

```js        
{
    "email":"ambrosekibet15@mail.com","password":"Chicken"
}
```



***More example Requests/Responses:***


##### I. Example Request: login



***Body:***

```js        
{
    "email": "ambrosekibet15@mail.com",
    "password": "Chicken"
}
```



##### I. Example Response: login
```js
{
    "user": {
        "userId": "631ee96e988c3dbc29aae01e",
        "name": "amkibet",
        "role": "admin"
    }
}
```


***Status Code:*** 200

<br>



### 2. logout



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/auth/logout
```



### 3. register



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/auth/register
```



***Body:***

```js        
{
    "name":"ambrose","email":"ambrosekibet15@mail.com","password":"somePass"
}
```



## Users



### 1. get All users



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/users
```



### 2. get Single user



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/users/631c3556cf21f540d3566c72
```



### 3. show Me



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/users/showme
```



***More example Requests/Responses:***


##### I. Example Request: show Me



##### I. Example Response: show Me
```js
{
    "user": {
        "userId": "631ee96e988c3dbc29aae01e",
        "name": "amkibet",
        "role": "admin"
    }
}
```


***Status Code:*** 200

<br>



### 4. update User password



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/users/updateuserpassword
```



***Body:***

```js        
{
    "oldPassword":"oldpass","newPassword":"newPass"
}
```



### 5. update user



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/users/updateuser
```



***Body:***

```js        
{
    "email":"ambrosekibet15@mail.com","name":"amkibet"
}
```



## orders



### 1. create order



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/orders
```



***Body:***

```js        
{
    "tax": 499,
    "shippingFee": 799,
    "items": [
      {
        "name": "bed",
        "price": 2699,
        "image": "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
        "amount": 3,
        "product": "632ab27fb1f620423bb7bc6e"
      },
      {
        "name": "chair",
        "price": 2999,
        "image": "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
        "amount": 2,
        "product": "632ab297b1f620423bb7bc70"
      }
    ]
  }
```



### 2. get All orders



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/orders
```



### 3. get single order



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/orders/632b005239e7c11436353fc7
```



### 4. my orders



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/orders/showAllMyOrders
```



### 5. update order



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/orders/632b005239e7c11436353fc7
```



***Body:***

```js        
{
    "paymentIntentId":"ccbvcbvccbxbvxvvx","status":"paid"
}
```



## products



### 1. create product



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/products
```



***Body:***

```js        
{
    "name": "black chair",
    "price": 12599,
    "image": "https://dl.airtable.com/.attachmentThumbnails/530c07c5ade5acd9934c8dd334458b86/cf91397f",
    "colors": ["#000", "#00ff00", "#0000ff"],
    "company": "ikea",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "office"
  }
```



### 2. delete product



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://e-commerce-api-st3k.onrender.com/products/64292d095932bece4fd4416d
```



### 3. get All Products



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/products
```



### 4. get single product



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/products/632ab27fb1f620423bb7bc6e
```



### 5. get single product reviews



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/products/632ab27fb1f620423bb7bc6e/reviews
```



### 6. update product



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/products/632ab27fb1f620423bb7bc6e
```



***Body:***

```js        
{
    "name":"big chair","price":12905,"description":"hfhfhfhfhh fhfhfhhfh hfhdhdhhdhdh dhdhdhdh"
}
```



### 7. upload image



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: https://e-commerce-api-st3k.onrender.com/products/uploadImage
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
|  |  |  |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |



## reviews



### 1. create review



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/reviews
```



***Body:***

```js        
{"product":"632ab297b1f620423bb7bc70","title":"bad product","comment":"it was horrible .i btoke my back while just trying to sit","rating":1}
```



### 2. delete review



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://e-commerce-api-st3k.onrender.com/reviews/642930db5932bece4fd4417c
```



### 3. get Single review



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/reviews/642930db5932bece4fd4417c
```



### 4. get all reviews



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-st3k.onrender.com/reviews
```



### 5. update review



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-st3k.onrender.com/reviews/642930db5932bece4fd4417c
```



***Body:***

```js        
{"title":"good product","comment":"it was horrible .i btoke my back while just trying to sit","rating":4}
```



---
[Back to top](#e-commerce-api)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2023-06-04 23:10:26 by [docgen](https://github.com/thedevsaddam/docgen)
