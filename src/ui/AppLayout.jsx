import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function AppLayout() {
    return (
        <>
            <Toaster position='top-right'/>
            <Header />
            <main className='container'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}