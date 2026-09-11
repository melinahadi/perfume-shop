import { useEffect } from "react";
import { getProducts } from "./services/productService";

function TestSupabase() {
  useEffect(() => {
    async function test() {
      try {
        const products = await getProducts();

        console.log("SUPABASE PRODUCTS:", products);
      } catch (error) {
        console.error("SUPABASE ERROR:", error);
      }
    }

    test();
  }, []);

  return null;
}

export default TestSupabase;
