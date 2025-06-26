import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '../../../services/apiProducts';
import { toast } from 'react-hot-toast';
import ErrorMessage from '../../../ui/ErrorMessage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

function AdminAdd() {
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, reset, formState: {errors}, getValues } = useForm();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            toast.success("Mahsulot qo'shildi!");
            queryClient.invalidateQueries(['products']);
            reset();
        },
        onError: (error) => {
            toast.error('Xatolik yuz berdi: ' + error.message);
        }
    });

    async function onSubmit(data) {
        if (submitting) return; // prevent multiple submissions
        setSubmitting(true);
    
        const { size, image1, image2, image3, ...productData } = data;
    
        const sizes = size.split(',').map(s => s.trim());
        const imageFiles = [image1[0], image2[0], image3[0]].filter(Boolean);
    
        const product = {
            ...productData,
            sizes,
            images: imageFiles,
        };
    
        mutate(product, {
            onSettled: () => {
                setSubmitting(false); // Reset flag on success or error
            }
        });
    }
       

    return (
        <div className='add-product'>
            <h1 className='add-product-title mb2'>Mahsulot qo'shish</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="add-product-input">
                    <div>
                        <p>Rasm qo'shish</p>
                        <label htmlFor="image1" className='image-label'><CloudUploadIcon /></label>
                        <input {...register('image1', {
                            required: 'Rasm yuklanishi shart!',
                        })} name="image1" id='image1' type="file" accept='image/*' className='upload-image-input' />
                        {errors.image1 && <ErrorMessage message={errors.image1.message}/>}
                    </div>
                    <div>
                        <p>Rasm qo'shish</p>
                        <label htmlFor="image2" className='image-label'><CloudUploadIcon /></label>
                        <input {...register('image2', {
                            required: 'Rasm yuklanishi shart!',
                        })} name="image2" id='image2' type="file" accept='image/*' className='upload-image-input' />
                        {errors.image2 && <ErrorMessage message={errors.image2.message}/>}
                    </div>
                    <div>
                        <p>Rasm qo'shish</p>
                        <label htmlFor="image3" className='image-label'><CloudUploadIcon /></label>
                        <input {...register('image3', {
                            required: 'Rasm yuklanishi shart!',
                        })} name="image3" id='image3' type="file" accept='image/*' className='upload-image-input' />
                        {errors.image3 && <ErrorMessage message={errors.image3.message}/>}
                    </div>
                </div>  
                <div className="add-product-input">
                    <div>
                        <label htmlFor="name">Mahsulot nomi</label>
                        <input {...register('name', {
                            required: 'Mahsulot nomi kiritilishi shart!',
                        })} name="name" type="text" placeholder='Turkiyada ishlab chiqarilgan tufli...' />
                        {errors.name && <ErrorMessage message={errors.name.message}/>}
                    </div>
                    <div>
                        <label htmlFor="product_type">Mahsulot turi</label>
                        <input {...register('product_type', {
                            required: 'Mahsulot turi kiritilishi shart!',
                        })} name="product_type" type="text" placeholder='t-shirt' />
                        {errors.product_type && <ErrorMessage message={errors.product_type.message}/>}
                    </div>
                </div>
                <div className="add-product-input">
                    <div>
                        <label htmlFor="description">Mahsulot haqida qisqacha</label>
                        <input {...register('description', {
                            required: 'Mahsulot tarifi kiritilishi shart!',
                        })} name="description" type="text" placeholder='Turkiyaning sifatli...' />
                        {errors.description && <ErrorMessage message={errors.description.message}/>}
                    </div>
                    <div>
                        <label htmlFor="rate">Mahsulot reytingi</label>
                        <input {...register('rate', {
                            required: 'Mahsulot reytinggi kiritilishi shart!',
                        })} name="rate" type="text" placeholder='4.5' />
                        {errors.rate && <ErrorMessage message={errors.rate.message}/>}
                    </div>
                </div>
                <div className="add-product-input">
                    <div>
                        <label htmlFor="size">O'lchamlari (vergul bilan ajrating)</label>
                        <input {...register('size', {
                            required: "Mahsulot o'lchamlari kiritilishi shart!",
                        })} name="size" type="text" placeholder='S,M,L,XL' />
                        {errors.size && <ErrorMessage message={errors.size.message}/>}
                    </div>
                    <div>
                        <label htmlFor="quantity">Soni</label>
                        <input {...register('quantity', {
                            required: 'Mahsulot soni kiritilishi shart!',
                        })} name="quantity" type="text" placeholder='24' />
                        {errors.quantity && <ErrorMessage message={errors.quantity.message}/>}
                    </div>
                </div>
                <div className="add-product-input">
                    <div>
                        <label htmlFor="fake_price">Narxi</label>
                        <input {...register('fake_price', {
                            required: 'Mahsulot narxi kiritilishi shart!',
                        })} name="fake_price" type="text" placeholder='240000' />
                        {errors.fake_price && <ErrorMessage message={errors.fake_price.message}/>}
                    </div>
                    <div>
                        <label htmlFor="price">Chegirma narx</label>
                        <input {...register('price', {
                            required: 'Mahsulot chegirma narxi kiritilishi shart!',
                            validate: value => getValues().fake_price > value || "Chegirma narxi asl narxidan kam bo'lishi kerak!"
                        })} name="price" type="text" placeholder='220000' />
                        {errors.price && <ErrorMessage message={errors.price.message}/>}
                    </div>
                </div>
                <button className='add-product-form-btn add-product-btn' disabled={isLoading || submitting}>Qo'shish</button>
            </form>
        </div>
    );
}

export default AdminAdd;
