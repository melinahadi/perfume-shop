import { supabase } from "../lib/supabase";

export async function getProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        throw error;
    }

    return data;
}

export async function getBestSellers() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_best_seller", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching best sellers:", error);
        throw error;
    }

    return data;
}

export async function getProductBySlug(slug) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching product by slug:", error);
        throw error;
    }

    return data;
}

export async function searchProducts(query) {
    const search = query.trim();

    if (!search) {
        return [];
    }

    const { data, error } = await supabase
        .from("products")
        .select("id, name, slug, price, image_url, type, category")
        .or(
            `name.ilike.%${search}%,type.ilike.%${search}%,category.ilike.%${search}%`,
        )
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        console.error("Error searching products:", error);
        throw error;
    }

    return data;
}