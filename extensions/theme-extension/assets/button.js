document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buy-with-tokens").addEventListener("click", function() {
        const metafieldId = "gid://shopify/Metafield/534526895"; // Metafield ID
        const currentPoints = parseInt(
          document.getElementById("userPoints").textContent,
          10
        );
        const newPoints = currentPoints - 10;

        if (newPoints < 0) {
          alert("Yetersiz puan!");
          return;
        }

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
        window.location.href = "/checkout";
      })
      .catch(error => console.error("Hata:", error));

      // Storefront API kullanarak Metafield Güncelleme isteği
      fetch("https://test-botano.myshopify.com/api/2024-04/graphql.json", {  
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": "10a8fadf6a6e9f8a6c70ebb14214a356"
          },
          body: JSON.stringify({
              query: `
{
  metaobjects(first: 10, type: "test") {
    edges {
      node {
        id
        displayName
        fields {
          key
          value
          type
        }
      }
    }
  }
}
              `,
              variables: {
                  input: {
                      id: metafieldId,
                      value: newPoints.toString(),
                      type: "integer"
                  }
              }
          })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert("Puan güncellendi! Yeni puan: " + data.data.metafield.value);
              document.getElementById("userPoints").textContent = data.data.metafield.value;
          } else {
              alert("Puan güncellenemedi! Hata: " + data.errors[0].message);
          }
      })
      .catch(error => console.error("Hata:", error));
    });
});
