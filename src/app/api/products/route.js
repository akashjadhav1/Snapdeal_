import products from "@/data/products.json";

export function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const minPrice = parseFloat(searchParams.get("minPrice"));
  const maxPrice = parseFloat(searchParams.get("maxPrice"));
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 20;

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (subcategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.subcategory === subcategory
    );
  }

  if (!isNaN(minPrice)) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }

  if (!isNaN(maxPrice)) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

  if (q) {
    const queryWords = q.toLowerCase().split(/\s+/);
    filteredProducts = filteredProducts.filter((product) => {
      const titleWords = product.title.toLowerCase();
      return queryWords.every((word) => titleWords.includes(word));
    });
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedProducts = filteredProducts.slice(start, end);

  return new Response(
    JSON.stringify({
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
