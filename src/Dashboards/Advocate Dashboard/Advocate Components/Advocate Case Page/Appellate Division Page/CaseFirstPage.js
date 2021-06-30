import { useParams } from 'react-router-dom';
import DashboardPageHading from '../../../../Dashboard Typographys/DashboardPageHading';
import AppellateDivisionStepOneForm from './AppellateDivisionStepOneForm';

const CaseFirstPage = () => {
  const { courtDivision } = useParams();

  return (
    <>
      <DashboardPageHading
        title={
          courtDivision === 'high-court'
            ? 'High Court'
            : courtDivision === 'appellate-division'
            ? 'Appellate Division'
            : courtDivision === 'district-court'
            ? 'District Court'
            : courtDivision === 'special-tribunal-court'
            ? 'Special Tribunal Court'
            : courtDivision === 'magistrate-court'
            ? 'Magistrate Court'
            : courtDivision === 'others-court' && 'Others Court'
        }
      />
      <div className='flex justify-evenly items-center space-x-10 mt-20 mb-20'>
        <div className='flex flex-col items-center space-y-2'>
          <div className='w-14 h-14 bg-secondarydark rounded-full flex justify-center items-center'>
            <span className='text-3xl font-bold text-white'>1</span>
          </div>
          <span className='text-lg capitalize text-primarydark font-semibold  '>
            Case Information
          </span>
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <div className='w-14 h-14 bg-gray-400 rounded-full flex justify-center items-center'>
            <span className='text-3xl font-bold text-white'>2</span>
          </div>
          <span className='text-lg capitalize text-primarydark font-semibold  '>
            Client's Information
          </span>
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <div className='w-14 h-14 bg-gray-400 rounded-full flex justify-center items-center'>
            <span className='text-3xl font-bold text-white'>3</span>
          </div>
          <span className='text-lg capitalize text-primarydark font-semibold  '>
            Finish
          </span>
        </div>
      </div>
      <div>
        <AppellateDivisionStepOneForm />
      </div>
    </>
  );
};

export default CaseFirstPage;
