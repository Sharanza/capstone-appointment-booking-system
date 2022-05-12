import * as React from 'react';
import { Banner } from './components/Banner/Banner';
import { BookAppointmentForm } from './components/AppointmentBooking/BookAppointmentForm';
import { Footer } from './components/Footer/Footer';

function App() {

return (
    <>
        <div className='App'>
            <div className='flex-container'>
                <header className='persona-header'>
                    <img src='./assets/images/persona-homes-logo.png' alt='Persona homes logo' />
                </header>
            </div>
        </div>
        <Banner />
        <BookAppointmentForm />
        <Footer />
    </>
);
}

export default App;