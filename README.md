# Akzommerce
This is a  eCommerce website which is build using vanilla JS 😍


1. create folder structure
  * create root folder as Akzommerce\n
  * add frontend and backend folder
  * create src folder in frontend
  * create index.html with heading akzommerce in  src
  * run npm init in frontend folder
  * npm install live-server
  * add start command in package.json as" live-server  src --verbose"
  * run npm start

2.Design Website 
  * create style.css
  * link style.css to index.css
  * create div.grid-container
  * create header , main and footer
  * style html ,body
  * style grid-container, header, main and footer

3. Create Static Home Screen
  * create ul.products
  * create li
  * create div.product
  * add .product-image , .product-name ,.product-brand , .product-price
  * style ul.products and internal divs
  * duplicate 2 items to show 3 products

4.Render Dynamic Home Screen
  * create data.js
  * export an array of 6 products
  * create screens/HomeScreen.js
  * export HomeScreen as an object with render() method
  * implement render()
  * import data.js
  * return products mapped to li inside an ul
  * create app.js
  * link app.js to index.html as module
  * set main id to main-container
  * create router() function in app.js
  * set main_container innerHTML to HomeScreen.render()
  * set load event of window to router() function

5. Build Url Router
  * create routes as route:screen object for home screen
  * create utils.js
  * export parseRequestURL()
  * set url as hash address split by slash
  * return resource, id and verb of url
  * update router()
  * set request as parseRequestURL()
  * build parsedUrl and compare with routes
  * if route exists render it, else render Error404
  * create screens/Error404.js and render error message

6. Create Node.JS Server
  * run npm init in root jsamazona folder
  * npm install express
  * create server.js
  * add start command as node backend/server.js
  * require express
  * move data.js from frontend to backend
  * create route for /api/products
  * return products in data.js
  * run npm start

7. Load Products From Backend
  * edit HomeScreen.js
  * make render async in HomeScreen.js
  * fetch products from '/api/products' in render()
  * make router() async and call await HomeScreen.render()
  * use cors on backend as u cant fetch data from other link
  * check the result

8. Add Webpack
  * cd frontend
  * npm install -D webpack webpack-cli webpack-dev-server
  * npm uninstall live-server
  * "start": "webpack-dev-server --mode development --watch-content-base --open"
  * move index.html, style.css and images to frontend folder
  * rename app.js to index.js
  * update index.html
  * add "<script src="main.js"</script>" before </body> tag
  * npm start
  * npm install axios
  * change fetch to axios in HomeScreen

9. Install Babel For ES6 Syntax
  * npm install -D babel core, cli, node, preset-env
  * Create .babelrc and set presets to @babel/preset-env
  * npm install -D nodemon
  * set start: nodemon --watch backend --exec babel-node backend/server.js
  * convert require to import in server.js that is es5 to es6
  * convert module.exports to export default
  * npm start

10. Enable Code Linting
  * npm install -D eslint
  * install VSCode eslint extension
  * create .eslintrc and set module.exports for env to node
  * Set VSCode setting for editor.codeActionsOnSave source.fixAll.eslint to true
  * check result for linting error
  * npm install eslint-config-airbnb-base and eslint-plugin-import
  * set extends to airbnb-base
  * set parserOptions to ecmaVersion 11 and sourceType to module
  * set rules for no-console to 0 to ignore linting error

11. Install VSCode Extension
  * JavaScript (ES6) code snippets
  * ES7 React/Redux/GraphQL/React-Native snippets
  * Prettier - Code formatter
  * HTML&LESS grammar injections

12. Create Rating Component
  * create components/Rating.js
  * link to fontawesome.css in index.html
  * create div.rating
  * define Rating object with render()
  * if !props.value return empty div
  * else use fa fa-star, fa-star-half-o and fa-star-o
  * last span for props.text || ''
  * style div.rating, span and last span
  * Edit HomeScreen
  * Add div.product-rating and use Rating component

13. Product Screen
  * get product id from request
  * implement /api/product/:id api
  * send Ajax request to product api

14. Product Screen UI
  * create back to result link
  * create div.details with 3 columns
  * column 1 for product image
  * column 2 for product information
  * column 3 form product action
  * style .details and all columns
  * create add to cart button with add-button id

15. Product Screen Action
  * after_render() to add event to the button
  * add event handler for the button
  * redirect user to cart/:product_id
  * implement after_render in index.js

16. Add To Cart Action
  * create CartScreen.js
  * get the product id using parseRequestUrl
  * use the getProduct(request.id) in api.js to get the product details
  * create an addToCart function
  * create a func getCartItems which searches in local storage
  * cartItems.find (check for existing item in the local storage)
  * if existItem we create a map in cartItems so duplicate will be ignored
  * else add item using spread operator
  * create a func setCartItems which stores the updated cartItems to local

17.Cart Screen UI
  * cartItems = getCartItems()
  * create 2 columns for cart items and cart action
  * cartItems.length === 0 ? cart is empty
  * show item image, name, qty and price
  * cart action
  * Subtotal
  * Proceed to Checkout button
  * Add CSS Style

18.Update and Delete Cart Items
  * add qty select next to each item
  * implementing after_render()
  * add change event to qty select
  * getCartItems() and pass to addToCart()
  * set force to true to addToCart()
  * create rerender() which has  (component) as parameter
  * component.render and component.after_render
  * if force is true then rerender()
  * add delete button next to each item
  * add click event to qty button
  * call removeFromCart(deleteButton.id)
  * implement removeFromCart(id)
  * setCartItems( getCartItems().filter)
  * if id === parseRequestUrl().id? redirect to '/cart'
  * else rerender(CartScreen);
  * created event listner for checkout-button which redirects to signin url

19. Connect To MongoDB and Create Admin User
  * npm install mongoose
  * connect to mongodb
  * create config.js
  * npm install dotenv
  * export MONGODB_URL
  * create models/userModel.js
  * create userSchema and userModel
  * create userRoute
  * create createadmin route

20. Sign-in Screen UI
  * create SigninScreen
  * render email and password fields
  * style signin form

21. Sign-in Screen Backend
  * create signin api in backend
  * create route for /api/users/signin
  * create check user name and password
  * if it is not ok the return 401 error
  * install express-async-handler
  * wrap it in expressAsyncHandler
  * add error middleware in server.js
  * install Postman
  * send post request
  * test with invalid user password
  * otherwise generate token
  * install jsonwebtoken
  * set config.JWT_SECRET to somethingsecret
  * add generateToken to utils.js
  * return token
  * test with correct user and password

22. Sign-in Screen Action
  * after_render handle form submit
  * create signin request in frontend
  * show alert if email or password is incorrect
  * Add getUserInfo and setUserInfo to localStorage
  * create Header component
  * if userInfo.email exist show user name otherwise show signin

23. Create Progress Indicator and Alert Component
  * create overlay loading div in index.html
  * Style overlay loading
  * create showLoading() function
  * set loading-overlay classList add active
  * create hideLoading() function
  * create overlay message div in index.html
  * add style overlay message
  * create showMessage(message, callback)
  * document message-overlay set inner HTML
  * div > div id message-overlay-content
  * show message
  * button id message-overlay-close-button OK
  * add class active to it
  * add event listener for button to call callback
  
24. Register Screen
  * create RegisterScreen.js
  * add form elements
  * after_render handle form submit
  * create register request in frontend
  * create register api in backend

25. User Profile Screen
  * create ProfileScreen.js
  * add form elements
  * after_render handle form submit
  * create profile update request in frontend
  * create profile update api in backend
  * create isAuth in utils.js and use in update profile
  * implement sign out

26. Checkout Wizard
  * create CheckoutSteps.js
  * create div elements for step 1 to 4
  * create redirectUser() in utils.js
  * copy profile screen and as shipping screen
  * use CheckoutSteps
  * define getShipping and setShipping
  * copy shipping screen and as payment screen
  * define  setPayment
  * redirect user to PlaceOrder.js       

27. PlaceOrder Screen UI
  * create PlaceOrder.js
  * style elements

28. PlaceOrder Screen Action
  * handle place order button click
  * createOrder api
  * create orderModel
  * create orderRouter
  * create post order route