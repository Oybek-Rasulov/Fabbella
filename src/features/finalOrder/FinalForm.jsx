import axios from 'axios';
import assets from '../../services/assets';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { submitOrder } from '../../services/apiOrders';
import { toast } from 'react-hot-toast';
import Loader from '../../ui/Loader';

export default function FinalForm() {
    const [ isPayClicked, setIsPayClicked ] = useState("");
    const isSubmitting = useRef(false);
    
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    // const { mutate, isLoading } = useMutation({
    //     mutationFn: submitOrder,
    //     onSuccess: () => {
    //         localStorage.setItem('orders', JSON.stringify([]));
    //         reset();
      
    //         // Navigate AFTER the order is saved
    //         if (isPayClicked === "payme") {
    //           window.location.href = "https://payme.uz/home/main";
    //         } else if (isPayClicked === "click") {
    //           window.location.href = "https://click.uz/ru";
    //         } else if (isPayClicked === "uzumbank") {
    //             window.location.href = "https://uzumbank.uz/ru/";
    //           }
    //       },
    //     onError: (error) => {
    //         toast.error(`Xatolik yuz berdi!`);
    //         console.error(error.message)
    //     }
    // })

    const { mutate, isLoading } = useMutation({
        mutationFn: submitOrder,
        onSuccess: async (orderData) => {
            console.log(orderData);
            localStorage.setItem('orders', JSON.stringify([]));
            reset();
          
            try {
              let response;
          
              if (isPayClicked === "payme") {
                response = await axios.post("http://localhost:5000/api/payme/create", {
                  amount: orderData.total_price,
                  orderId: orderData.id,
                });
                window.location.href = response.data.invoiceUrl;
          
              } else if (isPayClicked === "click") {
                response = await axios.post("http://localhost:5000/api/click/create", {
                  amount: orderData.total_price,
                  orderId: orderData.id,
                });
                window.location.href = response.data.paymentUrl;
          
              } else if (isPayClicked === "uzumbank") {
                response = await axios.post("http://localhost:5000/api/uzumbank/create", {
                  amount: orderData.total_price,
                  orderId: orderData.id,
                });
                window.location.href = response.data.paymentUrl;
              }
          
            } catch (err) {
              console.error("Payment error:", err);
              toast.error("To'lovga o'tishda xatolik yuz berdi!");
            }
          },          
        onError: (error) => {
            toast.error(`Xatolik yuz berdi!`);
            console.error(error.message)
        }
    })

    async function onSubmit(formDetails) {
        if (isSubmitting.current) return; 
        isSubmitting.current = true;

        const orders = await JSON.parse(localStorage.getItem("orders")) || [];

        if(!orders.length) return window.location.href = "http://localhost:5173/";
        mutate(
            {orders, formDetails, payType: isPayClicked },
            {
                onSettled: () => {
                  isSubmitting.current = false; // ✅ Reset after mutation
                }
            });
    }

    if(isLoading) return Loader


    return (
        <div className="final">
            <div className='payment-board mb2'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='final-form-inputs'>
                    <div>
                        <label htmlFor="fullname" className='region-title'>Ism Familyangiz 💖</label>
                        <input type="text" placeholder='Ism Familyangiz' {...register('fullname', {
                            required: 'Ism Familyangizni kiriting!',
                        })} className='region-input' id='fullname' />
                        <p className='error-message'>{errors.fullname && errors.fullname.message}</p>
                    </div>
                    <div>
                        <label htmlFor="phone_number" className='region-title'>Telefon raqamingizni kiriting 💖</label>
                        <input type="text" id='phone_number' placeholder='+998914014766' {...register('phone_number', {
                            required: 'Telefon raqamingizni kiriting!',
                        })} className='region-input' />
                        <p className='error-message'>{errors.phone_number && errors.phone_number.message}</p>

                    </div>
                </div>
                <div className='final-form-inputs'>
                    <div>
                        <label htmlFor="city" className='region-title'>Viloyatingizni tanlang 💖</label>
                        <select id="city" className='select-region' {...register('city', {
                            required: 'Viloyatingizni tanlang!',
                        })} >
                            <option value="Toshkent Shahri">Toshkent Shahri </option>
                            <option value="Toshkent Viloyati">Toshkent Viloyati</option>
                            <option value="Samarqand">Samarqand</option>
                            <option value="Buxoro">Buxoro</option>
                            <option value="Andijon">Andijon</option>
                            <option value="Navoiy">Navoiy</option>
                            <option value="Farg'ona">Farg'ona</option>
                            <option value="Jizzax">Jizzax</option>
                            <option value="Namangan">Namangan</option> 
                            <option value="Qashqadaryo">Qashqadaryo</option>
                            <option value="Sirdaryo">Sirdaryo</option>
                            <option value="Surxondaryo">Surxondaryo</option>
                        </select>
                        <p className='error-message'>{errors.city && errors.city.message}</p>
                    </div>
                    <div>
                        <label htmlFor="region" className='region-title'>Tumaningizni kiriting 💖</label>
                        <input type="text" id='region'  placeholder='Yakkasaroy tumani' {...register('region', {
                            required: 'Tumaningizni kiriting!',
                        })} className='region-input' />
                        <p className='error-message'>{errors.region && errors.region.message}</p>
                    </div>
                </div>
                <div className='final-form-inputs'>
                    <div>
                        <label htmlFor="street" className='region-title'>Ko'cha nomi va uy raqamingizni kiriting 💖</label>
                        <input type="text" id='street' placeholder="Bobur ko'chasi, 67-dom, 7-xonadon" {...register('street', {
                            required: "Ko'cha nomi va uy raqamingizni kiriting!",
                        })} className='address-input region-input' />
                        <p className='error-message'>{errors.street && errors.street.message}</p>
                    </div>
                </div>
                <div className='final-form-payment'>
                        <label className='region-title'>To'lov turini tanlang 💖</label>
                        {/* Buttons act as selection for payment_type */}
                        <div className='final-form-payment-content'>
                            <button
                                type='button'
                                className={`pay-btn ${isPayClicked === "payme" ? "pay-btn-clicked" : ""}`}
                                onClick={() => {
                                    setValue('payment_type', 'payme', { shouldValidate: true })
                                    setIsPayClicked('payme');
                                }}
                            >
                                <img className='pay-logo' src={assets.payme} alt="Payme" />
                            </button>

                            <button
                                type='button'
                                className={`pay-btn ${isPayClicked === "click" ? "pay-btn-clicked" : ""}`}
                                onClick={() => {
                                    setValue('payment_type', 'click', { shouldValidate: true })
                                    setIsPayClicked('click');
                                }}
                            >
                                <img className='pay-logo' src={assets.click} alt="Click" />
                            </button>

                            <button
                                type='button'
                                className={`pay-btn ${isPayClicked === "uzumbank" ? "pay-btn-clicked" : ""}`}
                                onClick={() => {
                                    setValue('payment_type', 'uzumbank', { shouldValidate: true })
                                    setIsPayClicked('uzumbank');
                                }}
                            >
                                <img className='pay-logo' src={assets.uzumbank} alt="Click" />
                            </button>

                            {/* Register the field manually (no visible input needed) */}
                            <input
                                type="hidden"
                                {...register('payment_type', {
                                required: "To'lov turini tanlang!",
                                })}
                            />
                        </div>
                    {errors.payment_type && <p className="error">{errors.payment_type.message}</p>}
                </div>

                <button className={`check-btn ${!isPayClicked && `submit-button-on submit-button-off mb2`}`} disabled={isLoading || isSubmitting.current}>{isLoading ? "Yuborilmoqda" : "To'lovga o'tish"}</button>
            </form>
            </div> 
        </div>       
    )
}
