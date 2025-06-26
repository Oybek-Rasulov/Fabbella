import supabase from "./supabase";

export async function getProducts() {    
    const { data, error } = await supabase
    .from('products')
        .select(`
            *,
            product_images(*),
            product_sizes(*)`
        )

    if(error) {
        console.error("Error fetching orders: ", error.message);
    }

    return data;

}

export async function deleteProduct(id) {    
    const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

    if(error) {
        console.error("Error deleting product: ", error.message);
    }
}

export async function addProduct(productData) {
    const { images, sizes, ...mainProduct } = productData;

    try {
        // 1. Upload images and collect public URLs
        const uploadedImageUrls = [];

        for (const file of images) {
            const fileExt = file.name.split('.').pop();
            const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${fileExt}`;

            // Upload the image to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(uniqueName, file);

            if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

            // Get the public URL (assuming the bucket is public)
            const { data } = supabase
                .storage
                .from('products')
                .getPublicUrl(uniqueName);

            uploadedImageUrls.push(data.publicUrl);
        }

        // 2. Insert into products table
        const { data: insertedProduct, error: insertError } = await supabase
            .from('products')
            .insert([mainProduct])
            .select()
            .single();

        if (insertError) throw new Error(`Product insert failed: ${insertError.message}`);

        const productId = insertedProduct.id;

        // 3. Insert image URLs into product_images table
        const imageInsertData = uploadedImageUrls.map(url => ({
            product_id: productId,
            image: url,
        }));

        const { error: imageError } = await supabase
            .from('product_images')
            .insert(imageInsertData);

        if (imageError) throw new Error(`Image insert failed: ${imageError.message}`);

        // 4. Insert sizes into product_sizes table
        const sizeInsertData = sizes.map(size => ({
            product_id: productId,
            size,
        }));

        const { error: sizeError } = await supabase
            .from('product_sizes')
            .insert(sizeInsertData);

        if (sizeError) throw new Error(`Size insert failed: ${sizeError.message}`);

        return insertedProduct;

    } catch (error) {
        console.error("❌ Error adding product:", error.message);
        throw error;
    }
}



// export async function addProduct(product) {
//     const { images, sizes, ...productData } = product;

//     // 1. Insert into products and get the new product ID
//     const { data: insertedProduct, error: insertError } = await supabase
//         .from('products')
//         .insert([productData])
//         .select();

//     if (insertError) {
//         console.error("Error inserting product:", insertError.message);
//         throw insertError;
//     }

//     const productId = insertedProduct[0].id;

//     // 2. Insert images into product_images
//     const imageEntries = images
//         .filter(Boolean)
//         .map((url) => ({
//             product_id: productId,
//             image: url
//         }));

//     if (imageEntries.length > 0) {
//         const { error: imageError } = await supabase
//             .from('product_images')
//             .insert(imageEntries);

//         if (imageError) {
//             console.error("Error inserting images:", imageError.message);
//             throw imageError;
//         }
//     }

//     // 3. Insert sizes into product_sizes
//     const sizeEntries = sizes
//         .filter(Boolean)
//         .map((size) => ({
//             product_id: productId,
//             size: size
//         }));

//     if (sizeEntries.length > 0) {
//         const { error: sizeError } = await supabase
//             .from('product_sizes')
//             .insert(sizeEntries);

//         if (sizeError) {
//             console.error("Error inserting sizes:", sizeError.message);
//             throw sizeError;
//         }
//     }

//     return insertedProduct[0]; // You can return just the ID if needed
// }