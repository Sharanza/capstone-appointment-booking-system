import * as React from 'react';

export function Banner() {

const baseClass = 'Banner';

return (
    <section>
        <div className={`${baseClass}__flex-container`}>
          <div className={`${baseClass}__left-text-box`}>
            <h1 className={`${baseClass}__book-appointment-header-one`}> Book an appointment </h1>
            <h3 className={`${baseClass}__book-appointment-header-three`}> Available Appointments at Meaux Rise </h3>
            <p className={`${baseClass}__book-appointment-paragraph`}> Thank you for your interest in our development. Appointments can be booking up to 30 days in advance. Please select a date to view available appointment times. </p>
          </div>
            <img className={`${baseClass}__couple`} src='../../assets/images/couple.png' alt='persona couple image' />
        </div>
    </section>
);
}