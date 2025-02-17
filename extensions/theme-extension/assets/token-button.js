document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buy-with-tokens").addEventListener("click", async function() {
        const metafieldId = "gid://shopify/Metaobject/534526895"; // Güncellenecek metaobject ID
        const currentPoints = parseInt(document.getElementById("userPoints").textContent, 10);
        const newPoints = currentPoints - 10; // Her satın alma 10 puan düşsün

        if (newPoints < 0) {
          alert("Yetersiz puan!");
          return;
        }

        // Shopify App Proxy'ye istek gönder
        const response = await fetch("/apps/api/update-metaobject", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                metafieldId: metafieldId,
                newPoints: newPoints
            })
        });

        const data = await response.json();
        
        if (data.success) {
            alert("Metaobject güncellendi! Yeni puan: " + data.data.metafield.value);
            document.getElementById("userPoints").textContent = data.data.metafield.value;
        } else {
            alert("Hata: " + data.error);
        }
    });
});
