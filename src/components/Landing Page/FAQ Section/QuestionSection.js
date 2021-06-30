import QuestionBoxComp from './QuestionBoxComp';
import { FormHelperText, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../../theme';
import submit from '../../../assets/images/submit-Button.svg';
import { useForm } from 'react-hook-form';
import { FormControl } from '@material-ui/core';
import { ApiHelper } from '../../../Utils/ApiHelper';
import { useToasts } from 'react-toast-notifications';
import { useContext } from 'react';
import { DataContext } from '../../../Context Api/ManageData';

const QuestionSection = () => {
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

  return (
    <>
      <div className='bg-secondarydark min-h-104 '>
        {/* faq question and answers */}
        <div className='flex lg:flex-row flex-col items-start justify-between lg:space-x-20 space-x-0 lg:space-y-0 space-y-10 container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 py-14'>
          <div className='lg:w-1/2 w-full'>
            <div className='w-full flex flex-col justify-center items-center'>
              <h1 className='font-bold text-primarydark capitalize'>
                Any Question?
              </h1>
              <span className='inline-block h-1 w-28 bg-secondarylight mt-2 mb-4' />
            </div>
            <div className='text-white pb-10 w-full flex flex-col'>
              <h1 className='font-bold text-3xl text-center capitalize'>
                Frequently Asked Question
              </h1>
              <div className='mt-8 flex flex-col space-y-4'>
                <QuestionBoxComp
                  question='Q 1:  What is XATTORNEY ? '
                  answer='XATTORNEY is a AI based case & chamber management system for advocates. Suitable for Individual advocates or small to large law firms'
                />
                <QuestionBoxComp
                  question='Q 2: IS XATTORNET helpful for Advocates ?'
                  answer='Of course it is helpful. By using XATTORNEY, advocates can manage clients, cases, documents, get notifications of important deadlines etc. They can even bill clients and accept payments.
'
                />
                <QuestionBoxComp
                  question='Q 3: How much does XATTORNEY management cost ?'
                  answer='Our half yearly basic plan costs 3,500 tk & yearly plan goes for 6000 tk. But as our promotional sale is going on right now, the half yearly basic plan will cost you 1500 tk & the yearly basic plan will cost you 2500 tk. Grab it before the sale ends.'
                />
                <QuestionBoxComp
                  question='Q 4:  Is XATTORNEY user friendly ?'
                  answer='XATTORNEY makes it easier to keep record of case details. Access the system at any time, from anywhere because it works on computers as well as mobile devices and all the functions are convenient. So yes, it is user-friendly.'
                />
                <QuestionBoxComp
                  question='Q 5: Is XATTORNEY safe?'
                  answer='You can trust XATTORNEY as your legal software solution. Your clients’ information and your firm’s data will be safe. We consistently screen for expected vulnerabilities and update our code and systems configuration to guarantee your information is always secured.
'
                />
              </div>
            </div>
          </div>

          {/* contact form */}
          <div className='lg:w-1/2 w-full'>
            <div className='w-full flex flex-col items-center justify-center'>
              <h1 className='font-bold text-primarydark capitalize'>
                Help Center
              </h1>
              <span className='inline-block h-1 w-24 bg-secondarylight mt-2 mb-4' />
            </div>
            <div className='text-primarydark'>
              <h1 className='font-bold text-3xl capitalize text-center'>
                Get Free Phone Call
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full flex flex-col space-y-6 mt-8'
              >
                <ThemeProvider theme={theme}>
                  <FormControl error={errors.name}>
                    <TextField
                      className='bg-white rounded text-white w-full '
                      InputLabelProps={{ className: 'textfield__label' }}
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
                  <FormControl error={errors.email}>
                    <TextField
                      className='bg-white rounded text-white w-full'
                      InputLabelProps={{ className: 'textfield__label' }}
                      label='Email'
                      id='margin-normal'
                      name='email'
                      variant='filled'
                      color='primary'
                      {...register('email', { required: false })}
                    />
                    <FormHelperText className='text-red-500'>
                      {errors.email?.type === 'required' && 'Email is required'}
                    </FormHelperText>
                  </FormControl>
                  <FormControl error={errors.tel}>
                    <TextField
                      className='bg-white rounded text-white w-full'
                      InputLabelProps={{ className: 'textfield__label' }}
                      label='Phone No'
                      id='margin-normal'
                      name='tel'
                      variant='filled'
                      color='primary'
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
                  <FormControl error={errors.contactRequest_subject}>
                    <TextField
                      className='bg-white rounded text-white w-full'
                      InputLabelProps={{ className: 'textfield__label' }}
                      label='Subject'
                      id='margin-normal'
                      name='contactRequest_subject'
                      variant='filled'
                      color='primary'
                      {...register('contactRequest_subject', {
                        required: true,
                      })}
                    />
                    <FormHelperText>
                      {errors.contactRequest_subject?.type === 'required' &&
                        'Subject is required'}
                    </FormHelperText>
                  </FormControl>
                  <FormControl error={errors.contactRequest_message}>
                    <TextField
                      className='bg-white rounded text-white w-full'
                      InputLabelProps={{ className: 'textfield__label' }}
                      id='margin-normal'
                      label='Your Message'
                      name='contactRequest_message'
                      multiline
                      rows={8}
                      variant='filled'
                      color='primary'
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
                  className='flex justify-center items-center'
                  style={{ outline: 'none' }}
                  type='submit'
                >
                  <img src={submit} alt='' />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionSection;
