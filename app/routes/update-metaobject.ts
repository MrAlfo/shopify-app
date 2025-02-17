// import { json } from "@remix-run/node";

// import type { ActionFunction } from "@remix-run/node";

// export const action: ActionFunction = async ({ request }) => {
//     try {
//         console.log("İstek alındı!");
//         return json({ success: true });
//     } catch (error) {
//         console.error("Hata:", error);
//         return json({ success: false });
//     }
// };

import { json } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    try {
        console.log("İstek alındı, GraphQL çalıştırılıyor...");

        const response = await fetch("https://test-botano.myshopify.com/admin/api/2024-04/graphql.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": "shpat_1234567890abcdefghijklmnopqrstuvwxyz"
            },
            body: JSON.stringify({
                query: `
                    query {
                        shop {
                            name
                            email
                        }
                    }
                `
            })
        });

        const data = await response.json();

        console.log("GraphQL Yanıtı:", data);

        return json({ success: true, data });
    } catch (error) {
        console.error("GraphQL Hatası:", error);
        return json({ success: false, error: (error as any).message });
    }
};
