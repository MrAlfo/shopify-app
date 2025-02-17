document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buy-with-tokens").addEventListener("click", function() {
      // Storefront API kullanarak Metafield Güncelleme isteği

        fetch("/apps/api/update-metaobject", {  // Shopify Proxy URL
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
