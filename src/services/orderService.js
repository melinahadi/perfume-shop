import { supabase } from "../lib/supabase";

export async function createOrder({ customer, cartItems, total }) {
    // Get currently authenticated user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("You must be signed in to place an order.");
    }

    // Create order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            user_id: user.id,
            customer_name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            total,
            status: "pending",
        })
        .select()
        .single();

    if (orderError) {
        console.error("Order creation error:", orderError);
        throw orderError;
    }

    // Create order items
    const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

    if (itemsError) {
        console.error("Order items creation error:", itemsError);
        throw itemsError;
    }

    return order;
}

// =====================================================
// GET MY ORDERS
// =====================================================

export async function getMyOrders() {
    // =====================================================
    // Get authenticated user
    // =====================================================

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("You must be signed in.");
    }

    // =====================================================
    // 1. Get user's orders
    // =====================================================

    const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select(
            `
            id,
            user_id,
            customer_name,
            email,
            phone,
            address,
            total,
            status,
            created_at
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false,
        });

    if (ordersError) {
        console.error("❌ Error fetching orders:", ordersError);
        throw ordersError;
    }

    if (!orders || orders.length === 0) {
        return [];
    }

    // console.log("✅ ORDERS:", orders);

    // =====================================================
    // 2. Get order items
    // =====================================================

    const orderIds = orders.map((order) => order.id);

    // console.log("📦 ORDER IDS:", orderIds);

    const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select(
            `
            id,
            order_id,
            product_id,
            product_name,
            price,
            quantity
        `,
        )
        .in("order_id", orderIds);

    if (itemsError) {
        console.error("❌ Error fetching order items:", itemsError);
        throw itemsError;
    }

    // console.log("🛍️ ORDER ITEMS:", orderItems);

    // =====================================================
    // 3. Attach items to their orders
    // =====================================================

    const ordersWithItems = orders.map((order) => {
        const itemsForThisOrder = (orderItems || []).filter(
            (item) => String(item.order_id) === String(order.id),
        );

        // console.log(`🔎 Order ${order.id}:`, itemsForThisOrder);

        return {
            ...order,
            order_items: itemsForThisOrder,
        };
    });

    // console.log("🎯 FINAL ORDERS:", ordersWithItems);

    return ordersWithItems;
}