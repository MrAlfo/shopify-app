import { json } from "@remix-run/node";
import { authenticate } from "../../shopify.server";

import type { ActionFunction } from "@remix-run/node";

export const loader = async () => {
    return json({ message: "API Çalışıyor!!" });
};

export const action: ActionFunction = async ({ request }) => {
    const { session } = await authenticate.admin(request);

    if (!session) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }
    

    try {
        const { metafieldId, newPoints } = await request.json();

        // Shopify Admin API ile metaobject güncelleme GraphQL Mutation
        const response = await fetch("https://test-botano.myshopify.com/admin/api/2024-04/graphql.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": "shpat_1234567890abcdefghijklmnopqrstuvwxyz"
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
        return json({ success: true, data: data.data.metaobjectUpdate });
    } catch (error) {
        console.error("Metaobject Güncelleme Hatası:", error);
        return json({ error: "Mutation başarısız", details: (error as Error).message }, { status: 500 });
    }
};
