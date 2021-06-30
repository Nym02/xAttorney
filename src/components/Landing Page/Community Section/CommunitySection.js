import SectionHeader from '../../Typographys/Headings/SectionHeader';
import topgrass1 from '../../../assets/images/yellow-top-left.svg';
import topgrass2 from '../../../assets/images/yellow-top-right.svg';
import bottomgrass from '../../../assets/images/yellow-bottom-leaf.svg';
import blogimage2 from '../../../assets/images/Justice-Photo 1.svg';
import blogimage3 from '../../../assets/images/closeup-green-traffic-light-evening.svg';
import blogimage4 from '../../../assets/images/blog-image-3.svg';
import bloggerimage from '../../../assets/images/emon.jpeg';
import subscribe from '../../../assets/images/subscribe-now-buttom.svg';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../../theme';
import '../Why Choose Us Section/CarouselStyle.css';
import { Icon } from '@iconify/react';
import comment12Regular from '@iconify-icons/fluent/comment-12-regular';
import calenderIcon from '@iconify-icons/uim/calender';
import CommunityBlogCard from './CommunityBlogCard';
import { useForm } from 'react-hook-form';
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { LandingApiHelper } from '../../../Utils/LandingApiHelper';
import { useToasts } from 'react-toast-notifications';

const CommunitySection = () => {
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    const updateNewsLetter = {
      email: data.email,
    };

    const onSuccessCreateNewsLetter = result => {
      const { subscribeForNewsLetter } = result?.data?.data;
      if (subscribeForNewsLetter !== null) {
        const { code, data, errorList } =
          result?.data?.data.subscribeForNewsLetter;

        if (code === 200 && data !== null) {
          addToast('You have suscribed for newsletter succesfully!', {
            appearance: 'success',
            autoDismiss: true,
          });
          reset();
        } else {
          addToast(errorList[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    };

    const onErrorCreateNewsLetter = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    LandingApiHelper.newsLetter
      .createNewsLetter({ data: updateNewsLetter })
      .then(onSuccessCreateNewsLetter)
      .catch(onErrorCreateNewsLetter);
  };

  return (
    <>
      <SectionHeader title='Community' width='md:w-97 w-full' />
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 sm:mb-28 mb-96'>
        <h1 className='text-3xl text-primarydark font-bold'>News And Blogs</h1>
        <div className='flex xl:flex-row flex-col items-center justify-between xl:space-x-6 space-x-0 xl:space-y-0 space-y-6 mt-14'>
          {/* newsletter section  */}
          <div className='text-white bg-deepdark 2xl:w-92 xl:w-1/3 w-full h-102 rounded relative'>
            <img
              style={{ top: '0%', left: '0%' }}
              className='absolute'
              src={topgrass1}
              alt=''
            />
            <img
              style={{ top: '0%', left: '73%' }}
              className='absolute'
              src={topgrass2}
              alt=''
            />
            <img
              style={{ top: '93.6%', left: '0%' }}
              className='absolute'
              src={bottomgrass}
              alt=''
            />

            {/* contents */}
            <div className='flex justify-center items-center mt-10'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='p-9 flex flex-col space-y-3 justify-center items-center mt-9 h-full xl:w-full md:w-1/2 w-full'
              >
                <h1 className='text-base font-bold text-white capitalize'>
                  Subscribe to our newsletter
                </h1>
                <ThemeProvider theme={theme}>
                  <FormControl className='w-full ' error={errors.name}>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full border border-white'
                      label='Full Name'
                      id='outlined-basic'
                      name='name'
                      margin='dense'
                      variant='filled'
                      color='primary'
                      {...register('name', { required: true })}
                    />
                    <FormHelperText>
                      {errors.name?.type === 'required' && 'Name is required'}
                    </FormHelperText>
                  </FormControl>
                  <FormControl className='w-full ' error={errors.email}>
                    <TextField
                      className='bg-lightSilver rounded text-white focus:border-white w-full'
                      label='Email'
                      id='margin-normal'
                      name='email'
                      margin='dense'
                      variant='filled'
                      color='primary'
                      {...register('email', {
                        required: true,
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                    <FormHelperText>
                      {errors?.email?.type === 'required'
                        ? 'Email is required'
                        : errors?.email?.type === 'pattern' &&
                          'Enter a valid email address'}
                    </FormHelperText>
                  </FormControl>
                </ThemeProvider>
                <button style={{ outline: 'none' }} className='outline-none'>
                  <img src={subscribe} alt='' />
                </button>
              </form>
            </div>
          </div>

          <div className='flex md:flex-row flex-col justify-between items-center md:space-x-6 space-x-0 md:space-y-0 space-y-6 2xl:w-auto xl:w-2/3 w-full'>
            {/* blog details section  */}
            <div
              onClick={() =>
                window.open(
                  'https://www.the-daily-story.com/history-of-bangladesh-high-court/',
                  '_blank'
                )
              }
              className='2xl:w-92 md:w-1/2 w-full h-102 rounded relative blog-bg px-8 py-7 text-white cursor-pointer'
            >
              <div className='flex flex-col justify-between h-full'>
                <span className='w-24 h-6 flex justify-center items-center bg-secondarydark rounded self-end'>
                  History
                </span>
                <div className='flex flex-col space-y-5'>
                  <h1 className='font-bold text-base leading-relaxed'>
                    History of Bangladesh High Court
                  </h1>
                  <div className='flex items-center justify-between'>
                    <div className='w-10 h-10 rounded-full'>
                      <img
                        className='w-10 h-10 rounded-full'
                        src={bloggerimage}
                        alt=''
                      />
                    </div>
                    <div className='flex space-x-3 items-center text-sm'>
                      <div className='flex space-x-2 items-center border-r border-white pr-3'>
                        <Icon className='text-lg' icon={calenderIcon} />
                        <span>16 Jun, 2021</span>
                      </div>
                      <div className='flex space-x-2 items-center'>
                        <Icon className='text-lg' icon={comment12Regular} />
                        <span>3 Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* blog list */}
            <div className='flex flex-col justify-between lg:space-y-0 space-y-6 h-102 2xl:w-92 md:w-1/2 w-full'>
              <CommunityBlogCard
                link='https://www.the-daily-story.com/syed-mahmud-hossain-the-chief-justice-of-bangladesh/'
                img={blogimage2}
                title='Syed Mahmud Hossain- The chief justice of Bangladesh'
                date='19 Jun, 2021'
                comment='15'
                tag='History'
              />
              <CommunityBlogCard
                link='https://www.the-daily-story.com/new-traffic-safety-laws-of-bangladesh-in-2021/'
                img={blogimage3}
                title='New Traffic Safety Laws of Bangladesh in 2021'
                date='19 Jun, 2021'
                comment='9'
                tag='News'
              />
              <CommunityBlogCard
                link='https://www.the-daily-story.com/xattorney-the-best-case-chamber-management-system-for-advocates/'
                img={blogimage4}
                title='XATTORNEY - The Best Case & Chamber Management System For Advocates'
                date='19 Jun, 2021'
                comment='34'
                tag='News'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunitySection;
