import categories from "@/data/categories.json";

export function GET() {
  return new Response(JSON.stringify(categories));
}
