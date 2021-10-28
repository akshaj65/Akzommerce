import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";
import Error404Screen from "./screens/Error404Screen.js";
import CartScreen from "./screens/CartScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import Header from "./components/Header.js";
import RegisterScreen from "./screens/RegisterScreen.js";

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen,
    "/cart/:id":CartScreen,
    "/cart":CartScreen,
    "/signin":SigninScreen,
    "/register":RegisterScreen,
}
const router = async () => {
    showLoading();
    const request = parseRequestUrl();
    // console.log(request)
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
        // console.log(parseUrl)
    const screen =routes[parseUrl]?routes[parseUrl]:Error404Screen;
    const header =document.getElementById('header-container');
    header.innerHTML= await Header.render();
    await Header.after_render();
    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render(); //reason this is await is that the homeScreen is using async
    await screen.after_render();
    hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange',router);