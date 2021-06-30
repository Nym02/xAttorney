import ReactOwlCarousel from 'react-owl-carousel';
import screenshotOne from '../../../assets/images/Calender.png';
import screenshotTwo from '../../../assets/images/Case Info.png';
import screenshotFour from '../../../assets/images/Clinet Info.png';
import screenshotFive from '../../../assets/images/Court Type.png';
import screenshotSix from '../../../assets/images/Expenses.png';
import { SectionHeaderCenter } from '../../Typographys/Headings/SectionHeaderCenter';

const GiveATrySection = () => {
  const state = {
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
      },
      800: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <>
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 z-40 relative'>
        <SectionHeaderCenter title='Give a Try?' />
        <h1 className='text-3xl text-primarydark font-bold text-center mt-4 leading-relaxed'>
          Screen Shots
        </h1>

        <div className='mt-9'>
          <ReactOwlCarousel
            className='owl-theme relative flex items-center justify-center'
            loop={true}
            nav={false}
            dots={true}
            autoplay={true}
            autoplayTimeout={2000}
            margin={20}
            responsive={state.responsive}
          >
            <div className='w-88 h-52 bg-silver rounded'>
              <img src={screenshotOne} alt='' />
            </div>
            <div className='w-88 h-52 bg-silver rounded'>
              <img src={screenshotTwo} alt='' />
            </div>
            <div className='w-88 h-52 bg-silver rounded'>
              <img src={screenshotFour} alt='' />
            </div>
            <div className='w-88 h-52 bg-silver rounded'>
              <img src={screenshotFive} alt='' />
            </div>
            <div className='w-88 h-52 bg-silver rounded'>
              <img src={screenshotSix} alt='' />
            </div>
          </ReactOwlCarousel>
        </div>
      </div>
    </>
  );
};

export default GiveATrySection;
