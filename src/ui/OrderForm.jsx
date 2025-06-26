import FinalForm from '../features/finalOrder/FinalForm';
import Title from './Title';

export default function OrderForm() {
    return <div className='final-form-container'>
        <Title title="Formani to'ldiring" className="mt2 mb1" />
        <FinalForm />
    </div>
}
