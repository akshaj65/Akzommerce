import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";
import Error404Screen from "./screens/Error404Screen.js";

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen,
}
const router = async () => {
    const request = parseRequestUrl();
    // console.log(request)
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
        // console.log(parseUrl)
    const screen =routes[parseUrl]?routes[parseUrl]:Error404Screen;
    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render(); //reason this is await is that the homeScreen is using async
    await screen.after_render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange',router);