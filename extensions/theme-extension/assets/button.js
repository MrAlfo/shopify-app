import {createClient} from '../../../app/client';
import Shopify from "@shopify/shopify-api";
import { updateProductRatings } from '../../../app/routes/update-metaobject';

const session = await Shopify.Utils.loadOfflineSession(shop);
const client = createClient(session.shop, session.accessToken);

document.addEventListener("DOMContentLoaded", async function () {
  await updateProductRatings(client, productGid, newRatings);
    document.getElementById("buy-with-tokens").addEventListener("click", function() {
      // Storefront API kullanarak Metafield Güncelleme isteği

        fetch("/apps/api/update-metaobject", {  // Shopify Proxy URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": "shpat_1234567890abcdefghijklmnopqrstuvwxyz"
            },
            credentials: "include",
            body: JSON.stringify({
                userId: "123456",
                newPoints: 40
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
            alert("İstek başarıyla gönderildi!");
        })
        .catch(error => {
            console.error("Hata:", error);
            alert("Bir hata oluştu.");
        });
      fetch("/cart/add.js", {
        method: "POST",  
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: "{{ product.variants.first.id }}", // Shopify Varyant ID
          quantity: 1
        })
      })
      .then(response => response.json())
      .then(data => {
        alert("Ürün sepete eklendi! Şimdi ücretsiz alabilirsiniz.");
        // window.location.href = "/checkout";
      })
      .catch(error => console.error("Hata:", error));


    });
});
