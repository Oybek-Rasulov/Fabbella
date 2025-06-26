import supabase from "./supabase";

export async function getOrders() {
        
    let { data: orders_address, error } = await supabase
    .from('orders_address')
    .select(`
        *,
        orders (
            *,
            products (
                *,
                product_images (
                    *
                ),
                product_sizes (
                    *
                )
            )
        )
    `)

    if(error) {
        console.log("Error fetching orders:", error.message)
    }

    return orders_address || [];
}

export async function submitOrder({ orders, formDetails, payType }) {
    console.log(orders, formDetails, payType);
    try {
        // ✅ Calculate total price of all items
        const total_price = orders.reduce((acc, item) => acc + item.totalPrice, 0);

        // ✅ Insert into orders_address with total price
        const { data: addressData, error: addressError } = await supabase
            .from('orders_address')
            .insert([{ 
                ...formDetails, 
                payment_type: payType, 
                total_price // ⬅️ Add total price here
            }])
            .select()
            .single(); 

        if (addressError) throw addressError;

        const addressId = addressData.id;

        const orderEntries = orders.map(({ id, quantity, totalDiscountPrice, size, totalPrice }) => ({
            product_id: id,
            quantity,
            size,
            total_discount_price: totalDiscountPrice,
            total_price: totalPrice,
            address_id: addressId,
        }));

        // ✅ Insert each product into orders table
        const { error: orderError } = await supabase
            .from('orders')
            .insert(orderEntries);

        if (orderError) throw orderError;

        console.log("✅ Orders submitted successfully!");
        return addressData; // this now includes total_price

    } catch (error) {
        console.error("❌ Error submitting order:", error.message);
        return false;
    }
}


// Delete order
export async function deleteOrder(orderId) {        
    const { error } = await supabase
    .from('orders_address')
    .delete()
    .eq('id', orderId)

    if(error) {
        console.error("Error deleting order:", error.message);
    }
}

// Update order
export async function confirmOrder(orderId) {
    const { error } = await supabase
    .from('orders_address')
    .update({ orders_status: "Tasdiqlangan" })
    .eq('id', orderId)
    .select()
        
    if(error) {
        console.error("Error confirming order:", error.message);
    }
}
