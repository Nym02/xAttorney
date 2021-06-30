import callNow from '../../assets/images/call-now-button.svg';
import { FormControl, FormHelperText, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import yellowSubmit from '../../assets/images/secondary-submit-button.svg';
import scale from '../../assets/images/scale.svg';
import scaleSecond from '../../assets/images/scale-second.svg';
import hammer from '../../assets/images/hammer.svg';
import { useToasts } from 'react-toast-notifications';
import { useContext } from 'react';
import { DataContext } from '../../Context Api/ManageData';
import { useForm } from 'react-hook-form';
import { ApiHelper } from '../../Utils/ApiHelper';

const ContactUsPageComponents = () => {
  const { addToast } = useToasts();
  const { requestForContact, setRequestForContact } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    const requestForContactData = {
      name: data.name,
      email: data.email,
      phone: data.tel,
      subject: data.contactRequest_subject,
      message: data.contactRequest_message,
    };

    const onSuccessCreateRequestForContact = result => {
      const { createRequestForContact } = result?.data?.data;
      if (createRequestForContact !== null) {
        const { code, data, errors } =
          result?.data?.data.createRequestForContact;

        if (code === 200 && data !== null) {
          addToast(
            'We received your phone call request. You will get phone call from us very soon.',
            {
              appearance: 'success',
              autoDismiss: true,
            }
          );
          reset();
        } else if (code !== 200 && data === null) {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      } else {
        addToast('Something went wrong. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    };
    const onErrorCreateRequestForContact = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.requestForContact
      .createRequestForContact({
        data: requestForContactData,
      })
      .then(onSuccessCreateRequestForContact)
      .catch(onErrorCreateRequestForContact);
  };

  const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

    return (
      <a
        className='text-white hover:text-secondarydark'
        href={`mailto:${email}${params}`}
      >
        {children}
      </a>
    );
  };

  return (
    <>
      <div className='relative h-auto flex justify-center'>
        <div className='-mt-34 w-full bg-deepdark pb-20'>
          {/* -------------main content--------------- */}
          <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 relative flex lg:flex-row flex-col justify-between items-center lg:mt-56 mt-40 lg:space-y-0 space-y-8 w-full z-50'>
            <img
              style={{ zIndex: '-1', top: '3%', left: '20%' }}
              className='absolute lg:flex hidden'
              src={scale}
              alt=''
            />
            <img
              style={{ zIndex: '-1', top: '65%', left: '56%' }}
              className='absolute lg:flex hidden'
              src={scaleSecond}
              alt=''
            />
            <img
              style={{ zIndex: '-1', top: '90%', left: '43%' }}
              className='absolute lg:flex hidden'
              src={hammer}
              alt=''
            />
            <img
              style={{ zIndex: '-1', top: '73%', left: '80%' }}
              className='absolute lg:flex hidden'
              src={scale}
              alt=''
            />
            <img
              style={{ zIndex: '-1', top: '56%', left: '28%' }}
              className='absolute lg:flex hidden'
              src={scaleSecond}
              alt=''
            />
            <img
              style={{ zIndex: '-1', top: '9%', left: '76%' }}
              className='absolute lg:flex hidden'
              src={hammer}
              alt=''
            />

            {/* texts and staff */}
            <div className='flex justify-between items-center relative lg:w-1/2 w-full -mt-28'>
              <div className='flex flex-col items-center w-full lg:mt-0 -mt-14'>
                <div className='flex flex-col space-y-4 w-full lg:-mt-60 mt-0'>
                  <span className='lg:text-base text-sm text-secondarydark'>
                    Where You Got Justice
                  </span>
                  <h1 className='2xl:text-5xl xl:text-4xl text-2xl text-white font-bold'>
                    Contact
                  </h1>
                  <div class='flex items-center'>
                    <span className='inline-block h-1 w-28 bg-secondarydark mt-2 mb-4' />
                    <span className='inline-block h-1 w-48 bg-white mt-2 mb-4' />
                  </div>
                  <p className='text-white lg:text-base text-sm leading-loose'>
                    House: 22, Road: 4, Nikunja 2, Khilkhet, <br /> Dhaka -
                    1229, Bangladesh. <br />
                    <Mailto
                      email='xattorny@gmail.com'
                      subject='Seeking some information about xattorney'
                    >
                      xattorny@gmail.com
                    </Mailto>
                    <br />
                    <span>
                      <a
                        href='tel:+8801886012021'
                        className='text-white hover:text-secondarydark'
                      >
                        +880 1886 012 021
                      </a>
                    </span>
                  </p>
                  <div className='flex justify-start items-center'>
                    <a href='tel:+8801886012021' style={{ outline: 'none' }}>
                      <img className='mt-4' src={callNow} alt='' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='lg:w-1/2 w-full flex flex-col items-center space-y-6 relative'
            >
              <ThemeProvider theme={theme}>
                <FormControl className='w-full' error={errors.name}>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full '
                    label='Full Name'
                    id='outlined-basic'
                    name='name'
                    variant='filled'
                    color='secondary'
                    {...register('name', { required: true })}
                  />
                  <FormHelperText>
                    {errors.name?.type === 'required' && 'Name is required'}
                  </FormHelperText>
                </FormControl>
                <FormControl className='w-full' error={errors.email}>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Email'
                    id='margin-normal'
                    name='email'
                    variant='filled'
                    color='secondary'
                    {...register('email', { required: false })}
                  />
                  <FormHelperText className='text-red-500'>
                    {errors.email?.type === 'required' && 'Email is required'}
                  </FormHelperText>
                </FormControl>
                <FormControl className='w-full' error={errors.tel}>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Phone No'
                    id='margin-normal'
                    name='tel'
                    variant='filled'
                    color='secondary'
                    inputProps={{ maxLength: 11 }}
                    {...register('tel', {
                      required: true,
                      pattern: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                    })}
                  />
                  <FormHelperText>
                    {errors.tel?.type === 'required'
                      ? 'Phone number is required'
                      : errors.tel?.type === 'pattern' &&
                        'Enter a valid phone number'}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className='w-full'
                  error={errors.contactRequest_subject}
                >
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Subject'
                    id='margin-normal'
                    name='contactRequest_subject'
                    variant='filled'
                    color='secondary'
                    {...register('contactRequest_subject', {
                      required: true,
                    })}
                  />
                  <FormHelperText>
                    {errors.contactRequest_subject?.type === 'required' &&
                      'Subject is required'}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className='w-full'
                  error={errors.contactRequest_message}
                >
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    id='margin-normal'
                    label='Your Message'
                    name='contactRequest_message'
                    multiline
                    rows={8}
                    variant='filled'
                    color='secondary'
                    {...register('contactRequest_message', {
                      required: true,
                    })}
                  />
                  <FormHelperText>
                    {errors.contactRequest_message?.type === 'required' &&
                      'Message is required'}
                  </FormHelperText>
                </FormControl>
              </ThemeProvider>
              <button
                type='submit'
                className='flex justify-center items-center'
                style={{ outline: 'none' }}
              >
                <img src={yellowSubmit} alt='' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPageComponents;
