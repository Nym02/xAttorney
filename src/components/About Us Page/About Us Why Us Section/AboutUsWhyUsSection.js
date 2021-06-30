import { SectionHeaderCenter } from '../../Typographys/Headings/SectionHeaderCenter';
import scale from '../../../assets/images/scale.svg';
import scaleSecond from '../../../assets/images/scale-second.svg';
import hammer from '../../../assets/images/hammer.svg';
import display from '../../../assets/images/display.svg';
import textImg from '../../../assets/images/text.svg';
import notification from '../../../assets/images/notification.svg';
import molecules from '../../../assets/images/molecules.svg';
import atrate from '../../../assets/images/atrate.svg';
import phone from '../../../assets/images/phone.svg';
import warning from '../../../assets/images/warning.svg';
import clock from '../../../assets/images/clock.svg';
import database from '../../../assets/images/database.svg';
import AboutUsWhyUsCards from './AboutUsWhyUsCards';

const AboutUsWhyUsSection = () => {
  return (
    <>
      <div className='bg-deepdark mb-24 text-white'>
        <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 z-40 relative py-20'>
          <img
            style={{ zIndex: '1', top: '3%', left: '20%' }}
            className='absolute lg:flex hidden'
            src={scale}
            alt=''
          />
          <img
            style={{ zIndex: '1', top: '65%', left: '56%' }}
            className='absolute lg:flex hidden'
            src={scaleSecond}
            alt=''
          />
          <img
            style={{ zIndex: '1', top: '90%', left: '3%' }}
            className='absolute lg:flex hidden'
            src={hammer}
            alt=''
          />
          <img
            style={{ zIndex: '1', top: '73%', left: '80%' }}
            className='absolute lg:flex hidden'
            src={scale}
            alt=''
          />
          <img
            style={{ zIndex: '1', top: '36%', left: '6%' }}
            className='absolute lg:flex hidden'
            src={scaleSecond}
            alt=''
          />
          <img
            style={{ zIndex: '1', top: '9%', left: '76%' }}
            className='absolute lg:flex hidden'
            src={hammer}
            alt=''
          />
          <SectionHeaderCenter title='Why Us' />
          <h1 className='text-3xl text-white font-bold text-center mt-4 leading-relaxed'>
            Key Features
          </h1>
          <div className='mt-28 flex flex-col lg:space-y-28 space-y-20'>
            <div className='flex lg:flex-row flex-col justify-between items-center lg:space-x-4 space-x-0 lg:space-y-0 space-y-20'>
              <AboutUsWhyUsCards
                img={molecules}
                title='Easy Case Entry'
                text="It's easier than your record keeping. By using XATTORNEY you can easily enter your case details & client's information. Schedule your next case hearing date. Add your to-do list so that never miss a meeting or important work. Maintain your associates now easier than before. Also, you can get access from anywhere anytime ."
              />
              <AboutUsWhyUsCards
                img={phone}
                title='Mobile Application'
                text='XATTORNEY Provides you a great mobile application so that, you can access the system at any time, from anywhere. So, you can have remote access to your client’s information and case details. It doesn’t matter where you are located, you will have full access to your system. The software application works on most tablets and smartphones.'
              />
              <AboutUsWhyUsCards
                img={display}
                title='Desktop Application'
                text='XATTORNEY also offers a desktop application with a great user interface and user experience. Our team put together a practical, seamless, and superior application. So, every time a consumer uses the application all the functions will seem hassle-free. We added many convenient features on the desktop application in order to manage case details & client information smoothly.'
              />
            </div>
            <div className='flex lg:flex-row flex-col justify-between items-center lg:space-x-4 space-x-0 lg:space-y-0 space-y-20'>
              <AboutUsWhyUsCards
                img={notification}
                title='Notifications'
                text="The application provides this feature in order to keep you updated 24/7 about the status of the case, where all the things stand. It notifies you by sending the schedules of the case details and next dates and it's an automatic process. If any fact of the case changes, as soon as you update it on the software every lawyer assigned to the case will get a notification. It reduces the consumption of precious professional time."
              />
              <AboutUsWhyUsCards
                img={textImg}
                title='SMS to Client'
                text='You can easily send SMS to your clients using the XATTORNEY software. It’s a hassle-free way to share any information with your client that he or she might need to know. You can inform your client regarding the update of the case, dates of hearing, or any other details that your client should know about so that your client gets updated all the time. So this function eliminates misunderstanding from happening between you and your client.'
              />
              <AboutUsWhyUsCards
                img={atrate}
                title='Email to Client'
                text='You can also send emails to your clients using the XATTORNEY software. This feature ensures that the clients are clear about everything he or she needs to know about. This function makes sure the clarity between you and your client so that there are no confusions where the case stands. It saves a lot of time for your firm and at the same time you can maintain a good relationship with your clients.'
              />
            </div>
            <div className='flex lg:flex-row flex-col justify-between items-center lg:space-x-4 space-x-0 lg:space-y-0 space-y-20'>
              <AboutUsWhyUsCards
                img={warning}
                title='Reports & Dashboards'
                text='We provides a hassle-free feature to share the status of case details to clients as it sends next hearing date reminder automatically as soon as you update it on the software through SMS to improve service quality and to reduce consumption of professional time in such a pity work and to provide track of cases to clients. Let your precious time be saved by this function.'
              />
              <AboutUsWhyUsCards
                img={clock}
                title='Update & Support'
                text='You can rest assured that all files, messaging, events and more stored in XATTORNEY is safe and secure. XATTORNEY employs best-in-class security technology and practices, like 128-bit SSL encryption for data transmission and 256-bit AES encryption when storing data. This level of security means you’ll never have to worry about anything falling into the wrong hands.'
              />
              <AboutUsWhyUsCards
                img={database}
                title='Data Security'
                text="XATTORNEY provides bank-grade security, keeping everything under lock and key, so you never need to worry about your sensitive data being compromised. Keeping your firm’s data secure is only part of the equation. Regular backups ensure that no data is lost. With XATTORNEY, your law firm's data is backed up everyday And data integrity is validated after each and every individual update."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsWhyUsSection;
