import products from "@/data/products.json";

export function GET(req) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams
    .get("ids")
    .split(",")
    .map((id) => parseInt(id));
  return new Response(JSON.stringify(ids.map((id) => products[id - 1])));
}
