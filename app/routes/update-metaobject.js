import "isomorphic-fetch";
import { gql } from "apollo-boost";
import { createClient } from "./client";




const PRIVATE_METAFIELD_UPSERT = gql`
mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(id: $id, metaobject: $metaobject) {
    metaobject {
      handle
      season: field(key: "season") {
        value
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}
`;


export const updateProductRatings = async (client, productGid, ratings) => {
  await client.mutate({
    mutation: PRIVATE_METAFIELD_UPSERT,
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
    },
  });
};

const session = await Shopify.Utils.loadOfflineSession(shop);
const client = createClient(session.shop, session.accessToken);

await updateProductRatings(client, productGid, newRatings);