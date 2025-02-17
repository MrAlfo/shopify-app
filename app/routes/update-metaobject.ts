import { json } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    try {
        console.log("İstek alındı!");
        return json({ success: true });
    } catch (error) {
        console.error("Hata:", error);
        return json({ success: false });
    }
};
