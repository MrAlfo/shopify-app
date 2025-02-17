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

const API_KEY = "8e99c6861e1c6778f425634dd75cec70"
const PASSWORD = "9169b0c3e8501ff8d42bcfa194361823"
const SHOP_NAME = "test-botano";

export const action: ActionFunction = async ({ request }) => {
    try {
        console.log("İstek alındı, GraphQL çalıştırılıyor...");

        const response = await fetch(`https://${API_KEY}:${PASSWORD}@${SHOP_NAME}.myshopify.com/admin/api/2024-04/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "alperen",
                "X-Shopify-Access-Token": "8e99c6861e1c6778f425634dd75cec70"
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
