# Akzommerce
This is a  eCommerce website which is build using vanilla JS 😍


1. create folder structure
  > create root folder as Akzommerce
  > add frontend and backend folder
  > create src folder in frontend
  > create index.html with heading akzommerce in  src
  > run npm init in frontend folder
  > npm install live-server
  > add start command in package.json as" live-server  src --verbose"
  > run npm start

2.Design Website 
  > create style.css
  > link style.css to index.css
  > create div.grif=d-container
  > create header , main and footer
  > style html ,body
  > style grid-container, header, main and footer

3. Create Static Home Screen
  > create ul.products
  > create li
  > create div.product
  > add .product-image , .product-name ,.product-brand , .product-price
  > style ul.products and internal divs
  > duplicate 2 items to show 3 products

4.Render Dynamic Home Screen
  > create data.js
  > export an array of 6 products
  > create screens/HomeScreen.js
  > export HomeScreen as an object with render() method
  > implement render()
  > import data.js
  > return products mapped to li inside an ul
  > create app.js
  > link app.js to index.html as module
  > set main id to main-container
  > create router() function in app.js
  > set main_container innerHTML to HomeScreen.render()
  > set load event of window to router() function

5. Build Url Router
  > create routes as route:screen object for home screen
  > create utils.js
  > export parseRequestURL()
  > set url as hash address split by slash
  > return resource, id and verb of url
  > update router()
  > set request as parseRequestURL()
  > build parsedUrl and compare with routes
  > if route exists render it, else render Error404
  > create screens/Error404.js and render error message