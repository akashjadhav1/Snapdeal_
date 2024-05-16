import products from "@/data/products.json";

export function GET(_req, { params }) {
  const id = params.id;
  return new Response(JSON.stringify(products[parseInt(id) - 1]));
}
