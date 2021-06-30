import ReactOwlCarousel from 'react-owl-carousel';
import whyChooseUs from '../../../assets/images/why-choose-us.svg';
import logofieldOne from '../../../assets/images/logofield-1.svg';
import logofieldTwo from '../../../assets/images/logofield-2.svg';
import logofieldThree from '../../../assets/images/logofield-3.svg';
import logofieldFour from '../../../assets/images/logofiled-4.svg';
import logofieldFive from '../../../assets/images/logofield-5.svg';
import logofieldSix from '../../../assets/images/logofield-6.svg';
import BuyNowButton from '../../Typographys/Buttons/BuyNowButton';
import { SectionHeaderCenter } from '../../Typographys/Headings/SectionHeaderCenter';

import './CarouselStyle.css';
import { useState } from 'react';

const WhyChooseUsSection = () => {
  const [show, setShow] = useState(false);
  const state = {
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  const logos = (
    <>
      {/* <div className='flex flex-col justify-center items-center space-y-8 mt-14'>
        <div className='flex justify-center items-center space-x-8'>
          <img src={logofield} alt='' />
          <img src={logofield} alt='' />
          <img src={logofield} alt='' />
        </div>
        <div className='flex justify-center items-center space-x-8'>
          <img src={logofield} alt='' />
          <img src={logofield} alt='' />
          <img src={logofield} alt='' />
        </div>
      </div> */}
    </>
  );

  return (
    <>
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 mt-17 mb-20'>
        <SectionHeaderCenter title='Who Choose Us' />
        <div className='flex justify-center mt-4 mb-12'>
          <h1 className='text-3xl text-primarydark font-bold'>Hall of Fame</h1>
        </div>
        <div>
          {/* <ReactOwlCarousel
            className='owl-theme relative flex items-center justify-evenly'
            loop={true}
            center={true}
            nav={true}
            dots={false}
            startPosition='5'
            responsive={state.responsive}
          >
            <div className='flex justify-center items-center'>
              <span className='font-bold text-3xl text-silver'>2016</span>
            </div>
            <div className='flex justify-center items-center'>
              <span className='font-bold text-3xl text-silver'>2017</span>
            </div>
            <div className='flex justify-center items-center'>
              <span className='font-bold text-3xl text-silver'>2018</span>
            </div>
            <div className='flex justify-center items-center'>
              <span className='font-bold text-3xl text-silver'>2019</span>
            </div>
            <div
              onClick={() => setShow(true)}
              className={
                show
                  ? 'flex justify-center items-center bg-secondarydark'
                  : 'flex justify-center items-center'
              }
            >
              <span className='font-bold text-3xl text-silver'>2020</span>
            </div>
            <div className='flex justify-center items-center'>
              <span className='font-bold text-3xl text-silver'>2021</span>
            </div>
          </ReactOwlCarousel> */}
          {/* <div className='flex justify-center items-center'>
            <span className='font-bold text-3xl text-silver'>2016</span>
          </div>
          <div className='flex justify-center items-center'>
            <span className='font-bold text-3xl text-silver'>2017</span>
          </div>
          <div className='flex justify-center items-center'>
            <span className='font-bold text-3xl text-silver'>2018</span>
          </div>
          <div className='flex justify-center items-center'>
            <span className='font-bold text-3xl text-silver'>2019</span>
          </div>
          <div
            onClick={() => setShow(true)}
            className={
              show
                ? 'flex justify-center items-center bg-secondarydark'
                : 'flex justify-center items-center'
            }
          >
            <span className='font-bold text-3xl text-silver'>2020</span>
          </div> */}
          <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center bg-secondarydark w-36 py-1 rounded'>
              <span className='font-bold text-3xl text-white'>2021</span>
            </div>
          </div>
        </div>
        {/* {show ? logos : null} */}
        <div className='flex sm:flex-row flex-col justify-center items-center sm:space-x-8 space-x-0 sm:space-y-0 space-y-8 mt-14'>
          <div className='flex sm:flex-col flex-row items-center sm:space-y-8 space-y-0 sm:space-x-0 space-x-8'>
            <img src={logofieldOne} alt='' />
            <img src={logofieldTwo} alt='' />
          </div>
          <div className='flex sm:flex-col flex-row items-center sm:space-y-8 space-y-0 sm:space-x-0 space-x-8'>
            <img src={logofieldThree} alt='' />
            <img src={logofieldFour} alt='' />
          </div>
          <div className='flex sm:flex-col flex-row items-center sm:space-y-8 space-y-0 sm:space-x-0 space-x-8'>
            <img src={logofieldFive} alt='' />
            <img src={logofieldSix} alt='' />
          </div>
        </div>

        {/* text content */}
        <div className='flex lg:flex-row flex-col justify-between mt-11 lg:space-x-12 space-x-0 lg:space-y-0 space-y-12'>
          <div className='w-full h-full flex lg:justify-start justify-center'>
            <img src={whyChooseUs} alt='' />
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col space-y-8'>
              <h1 className='text-3xl font-bold text-primarydark'>
                Thank you for your time keep in touch
              </h1>
              <p className='text-base text-primarydark'>
                Thank you for allowing us to offer you our Artificial
                Intelligence Based Case & Chamber Management Software for
                Advocates. The time you have given us is much appreciated. Your
                interest in our product has been invaluable. Thank you for your
                confidence in XATTORNEY and for your support for this product.
                We are confident that you're going to be pleased with the
                results.  <br />
                <br />
                Thanks again for being a part of our modern approach and if you
                have any questions, please do not hesitate to contact us. Keep
                in touch.
              </p>
            </div>
            <div className='flex justify-start items-center'>
              <BuyNowButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUsSection;
