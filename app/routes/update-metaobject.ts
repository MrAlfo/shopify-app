import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";  // Shopify Auth
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    try {
        console.log("📡 Yeni bir istek alındı!");

        const { session } = await authenticate.admin(request);
        if (!session) {
            console.error("🚨 HATA: Session bulunamadı!");
            return json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("✅ Session Başarıyla Alındı:", session);

        const { metafieldId, newPoints } = await request.json();
        console.log("📡 Gönderilen Veriler:", { metafieldId, newPoints });

        const response = await fetch(`https://${session.shop}/admin/api/2024-04/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_KEY ?? ""
            },
            body: JSON.stringify({
                query: `
                    mutation metaobjectUpdate($input: MetaobjectUpdateInput!) {
                        metaobjectUpdate(input: $input) {
                            metaobject {
                                id
                                fields {
                                    key
                                    value
                                }
                            }
                            userErrors {
                                field
                                message
                            }
                        }
                    }
                `,
                variables: {
                    input: {
                        id: metafieldId,
                        fields: [
                            {
                                key: "point",
                                value: newPoints.toString(),
                                type: "integer"
                            }
                        ]
                    }
                }
            })
        });

        const data = await response.json();
        console.log("📡 Shopify API Yanıtı:", data);

        if (data.errors || data.data.metaobjectUpdate.userErrors.length > 0) {
            console.error("🚨 Shopify API Hatası:", data.errors || data.data.metaobjectUpdate.userErrors);
            return json({ error: "Shopify API hatası", details: data.errors || data.data.metaobjectUpdate.userErrors }, { status: 500 });
        }

        return json({ success: true, data: data.data.metaobjectUpdate });
    } catch (error) {
        console.error("🚨 Metaobject Güncelleme Hatası:", error);
        return json({ error: "Unexpected Server Error", details: (error as Error).message }, { status: 500 });
    }
};
