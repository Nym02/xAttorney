import { FormHelperText } from '@material-ui/core';
import {
  Chip,
  FormControl,
  InputLabel,
  lighten,
  MenuItem,
  Modal,
  Select,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import ChipInput from 'material-ui-chip-input';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNewPlans from '../../../../../assets/images/add-new-plans.svg';
import addNow from '../../../../../assets/images/add-now.svg';
import featureList from '../../../../../assets/images/featureListImg.svg';
import modalClose from '../../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../../Context Api/ManageData';
import theme from '../../../../../theme';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import SuperAdminPlansPageActivePlanCard from './SuperAdminPlansPageActivePlanCard';

const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => (
  <Chip
    className={className}
    key={key}
    label={chip}
    onClick={handleClick}
    onDelete={handleDelete}
    color='primary'
  />
);

const initialValues = {
  feature_list: '',
  benefit_list: '',
};

const SuperAdminPlansPageActivePlanComponents = () => {
  const [open, setOpen] = useState(false);
  const [newPlans, setNewPlans] = useState(initialValues);
  const [feature, setFeature] = useState([]);
  const [benefit, setBenefit] = useState([]);
  const { pricingPlan, setPricingPlan } = useContext(DataContext);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFeatureChange = e => {
    const newValue = { ...newPlans };
    newValue[e.target.name] = e.target.value;
    setNewPlans(newValue);
  };
  const handleFeature = e => {
    if (e.keyCode == 13) {
      if (feature.length < 5) {
        setFeature([...feature, newPlans.feature_list]);
        reset();
      }
    }
  };
  const handleBenefit = e => {
    if (e.keyCode == 13) {
      if (benefit.length < 5) {
        setBenefit([...benefit, newPlans.benefit_list]);
        reset();
      }
    }
  };
  const onSubmit = (data, e) => {
    // discount_price: '567';
    // plan_mode: 10;
    // plan_name: 'dfg';
    // regular_price: '56756';
    const pricingPlanData = {
      name: data.plan_name,
      planMode: data.plan_mode,
      featureList: feature,
      benefitList: benefit,
      price: parseFloat(data.regular_price),
      discountedAmount: parseFloat(data.discount_price),
      inactive: true,
    };

    //  {
    //    name: 'Test Pricing Plan';
    //    planMode: MONTHLY;
    //    featureList: ['feature1', 'feature2'];
    //    benefitList: ['benefits1', 'benefits2'];
    //    price: 20.0;
    //    discountedAmount: 5.0;
    //    inactive: false;
    //  }
    const newPricingPlanData = JSON.stringify(pricingPlanData);
    const finalPricingPlanData = newPricingPlanData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const createPricingPlanQuery = gql`
      mutation {
        createPricingPlan(
          pricingPlan: ${finalPricingPlanData}
        ) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data {
            id
            name
            planMode
            featureList
            benefitList
            price
            discountedAmount
            inactive
          }
        }
      }
    `;
    axios
      .post(
        MAIN_API,
        {
          query: print(createPricingPlanQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {})
      // .then(
      //   ApiHelper.postOffice
      //     .getPostOffice()
      //     .then(res => {
      //       setPostOffice(
      //         res?.data?.data?.getPostOfficeList?.data?.postOfficeList
      //       );
      //       addToast('Successfully added new post office', {
      //         appearance: 'success',
      //         autoDismiss: true,
      //       });
      //     })
      //     .catch(err =>
      //       addToast('Something went wrong', {
      //         appearance: 'error',
      //         autoDismiss: true,
      //       })
      //     )
      // )
      // .then(() => window.location.reload())
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
  // console.log(feature);
  // console.log(benefit);
  const addNewPlan = (
    <div
      className='2xl:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add A Plan</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpen(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      {/* main content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className='w-full px-12 flex flex-col space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Plan Name'
              id='outlined-basic'
              name='plan_name'
              variant='outlined'
              color='secondary'
              error={errors.plan_name}
              {...register('plan_name', { required: true })}
              helperText={
                errors.plan_name?.type === 'required' &&
                'Plan Name can not be empty'
              }
            />
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.plan_mode}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Plan Mode
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Plan Mode'
                name='plan_mode'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('plan_mode', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='MONTHLY'>Monthly</MenuItem>
                <MenuItem value='YEARLY'>Yearly</MenuItem>
              </Select>
              <FormHelperText>
                {errors.plan_mode?.type === 'required' &&
                  'Plan Name can not be empty'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Regular Price'
              id='outlined-basic'
              name='regular_price'
              type='number'
              variant='outlined'
              color='secondary'
              error={errors.regular_price}
              {...register('regular_price', { required: true })}
              helperText={
                errors.regular_price?.type === 'required' &&
                'Regular Price can not be empty'
              }
            />
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Discounted Price'
              id='outlined-basic'
              name='discount_price'
              type='number'
              variant='outlined'
              color='secondary'
              error={errors.discount_price}
              {...register('discount_price', { required: true })}
              helperText={
                errors.discount_price?.type === 'required' &&
                'Discount Price can not be empty'
              }
            />
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <div className='flex flex-col space-y-2 w-full h-full'>
              <h1 className='text-primarydark font-medium'>
                Feature List (Max Five)
              </h1>

              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Feature List'
                id='outlined-basic'
                name='feature_list'
                type='text'
                variant='outlined'
                color='secondary'
                onChange={handleFeatureChange}
                onKeyDown={handleFeature}
                // error={errors.feature_list}
                // {...register('feature_list', { required: true })}
                // helperText={
                //   errors.feature_list?.type === 'required' &&
                //   'Feature List can not be empty'
                // }
              />
            </div>

            <div className='flex flex-col space-y-2 w-full h-full'>
              <h1 className='text-primarydark font-medium'>
                Benefit List (Max Five)
              </h1>

              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Benefit List'
                id='outlined-basic'
                name='benefit_list'
                type='text'
                variant='outlined'
                color='secondary'
                onChange={handleFeatureChange}
                onKeyDown={handleBenefit}
                // error={errors.benefit_list}
                // {...register('benefit_list', {
                //   required: { ...(benefit.length > 0 ? true : false) },
                // })}
                // helperText={
                //   errors.benefit_list?.type === 'required' &&
                //   'Benefit List can not be empty'
                // }
              />
            </div>
          </div>
          <div className='flex  justify-between space-x-8'>
            <ul className='list-disc pl-5 w-full'>
              {feature.map(plan => (
                <li>
                  <span className=' text-xl font-bold flex items-center space-x-2'>
                    {plan}{' '}
                    <button type='button' className='ml-3'>
                      <img className='w-6' src={featureList} alt='' />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <ul className='list-disc pl-5 w-full'>
              {benefit.map(plan => (
                <li>
                  <span className=' text-xl font-bold flex items-center space-x-2'>
                    {plan}{' '}
                    <button type='button' className='ml-3'>
                      <img className='w-6' src={featureList} alt='' />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ThemeProvider>

        <div className='w-full flex justify-center items-center space-x-6'>
          <button
            type='reset'
            style={{ outline: 'none' }}
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button>
          <button style={{ outline: 'none' }} type='submit'>
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <div className='flex flex-col space-y-6 pb-6'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            Plans
          </h1>
          <button style={{ outline: 'none' }} onClick={() => setOpen(true)}>
            <img src={addNewPlans} alt='' />
          </button>
        </div>

        {/* plans section */}
        <div className='w-full flex flex-col space-y-6'>
          {pricingPlan.map(
            plan =>
              plan.inactive === false && (
                <SuperAdminPlansPageActivePlanCard
                  packageType={plan.name}
                  planMode={plan.planMode}
                  discountPrice={plan.discountedAmount}
                  mainPrice={plan.price}
                  features={plan.featureList}
                  benefits={plan.benefitList}
                />
              )
          )}
          {/* <SuperAdminPlansPageActivePlanCard
            packageType='Premium'
            discountPrice='2500'
            mainPrice='5000'
            featureOne='Feature One'
            featureTwo='Feature One'
            featureThree='Feature One'
            featureFour='Feature One'
            featureFive='Feature One'
            benefitOne='Benefit One'
            benefitTwo='Benefit One'
            benefitThree='Benefit One'
            benefitFour='Benefit One'
            benefitFive='Benefit One'
          /> */}
        </div>
      </div>
      <Modal
        open={open}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addNewPlan}
      </Modal>
    </>
  );
};

export default SuperAdminPlansPageActivePlanComponents;
