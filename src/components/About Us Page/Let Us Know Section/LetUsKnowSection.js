import { SectionHeaderCenter } from '../../Typographys/Headings/SectionHeaderCenter';
import { FormControl, FormHelperText, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../../theme';
import submit from '../../../assets/images/submit-Button.svg';
import justice from '../../../assets/images/justice.svg';
import nature from '../../../assets/images/nature.svg';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { ApiHelper } from '../../../Utils/ApiHelper';

const LetUsKnowSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { addToast } = useToasts();

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

  return (
    <>
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 z-40 relative mt-24'>
        <SectionHeaderCenter title='Let Us Know' />
        <h1 className='text-3xl text-primarydark font-bold text-center mt-4 leading-relaxed'>
          Call Us Today <br />
          <span>
            <a href='tel:+8801886012021'>+88 018 86 012 021</a>
          </span>
          <br />
          <span className='capitalize text-secondarydark text-lg font-bold'>
            Or
          </span>
        </h1>

        <div className='mt-9 w-full flex justify-center items-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='lg:w-1/2 w-full flex flex-col items-center space-y-6'
          >
            <ThemeProvider theme={theme}>
              <FormControl className='w-full' error={errors.name}>
                <TextField
                  InputLabelProps={{ className: 'textfield__label' }}
                  className='bg-lightSilver rounded text-white w-full '
                  label='Full Name'
                  id='outlined-basic'
                  name='name'
                  variant='filled'
                  color='primary'
                  {...register('name', { required: true })}
                />
                <FormHelperText>
                  {errors.name?.type === 'required' && 'Name is required'}
                </FormHelperText>
              </FormControl>
              <FormControl className='w-full' error={errors.email}>
                <TextField
                  InputLabelProps={{ className: 'textfield__label' }}
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
                  InputLabelProps={{ className: 'textfield__label' }}
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
                  InputLabelProps={{ className: 'textfield__label' }}
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
                  InputLabelProps={{ className: 'textfield__label' }}
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
              <button
                type='submit'
                className='flex justify-center items-center'
                style={{ outline: 'none' }}
              >
                <img src={submit} alt='' />
              </button>
            </ThemeProvider>
          </form>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <img src={justice} alt='' />
        </div>
        <div>
          <img src={nature} alt='' />
        </div>
      </div>
    </>
  );
};

export default LetUsKnowSection;
