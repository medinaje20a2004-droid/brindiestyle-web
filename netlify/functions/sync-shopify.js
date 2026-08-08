exports.handler = async function(event, context) {
  const token = process.env.SHOPIFY_TOKEN;
  const shop = process.env.SHOPIFY_SHOP;

  if (!token || !shop) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Faltan variables de entorno" })
    };
  }

  try {
    const url = `https://${shop}.myshopify.com/admin/api/2024-10/products.json?limit=250`;
    const response = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: text })
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};