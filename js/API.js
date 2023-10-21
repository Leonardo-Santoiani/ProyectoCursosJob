import KEYS from "./Key.js"
const $d = document;
const $productos = $d.getElementById("productos"); 
const $template = $d.getElementById("producto-template").content; 
const $fragment = $d.createDocumentFragment();
const options = { headers: {Authorization: `Bearer ${KEYS.secret}`}};
const FormatoDeMoneda = num => `$${num.slice(0, -2)}.${num.slice(-2)}`;

let products, prices;

Promise.all([
    fetch("https://api.stripe.com/v1/products", options), 
    fetch("https://api.stripe.com/v1/prices", options)
])
.then(responses => Promise.all(responses.map(res => res.json())))
.then(json => {
    products = json[0].data;
    prices = json[1].data;
    prices.forEach(el => {
        let productData = products.filter(product => product.id === el.product);
        
        
        if (productData[0].metadata && productData[0].metadata.oculto === "true") {
            return;
        }
        
        $template.querySelector(".producto").setAttribute("data-price", el.id);
        $template.querySelector("img").src = productData[0].images[0];
        $template.querySelector("img").alt = productData[0].name;
        $template.querySelector("figcaption").innerHTML = `${productData[0].name} ${FormatoDeMoneda(el.unit_amount_decimal)} ${(el.currency).toUpperCase()}`;

        let $clone = $d.importNode($template, true);

        $fragment.appendChild($clone);
    });

    $productos.appendChild($fragment);
})
.catch(error => {
    let message = error.statusText || "Ocurrió un error en la petición";

    $productos.innerHTML = `Error: ${error.status}: ${message}`; 
})

$d.addEventListener("click", e => {
    if (e.target.matches(".productos *")) { 
        let priceId = e.target.parentElement.getAttribute("data-price");

        Stripe(KEYS.public).redirectToCheckout({
            lineItems: [{
                price: priceId,
                quantity: 1
            }],
            mode: "payment",
            successUrl:"http://127.0.0.1:5500/API/Confirmacion.html",
            cancelUrl:"http://127.0.0.1:5500/API/cancelacion.html"
        })
        .then(res => {
            if (res.error){
                $productos.insertAdjacentElement("afterend", res.error.message);
            }
        })
    }
})
