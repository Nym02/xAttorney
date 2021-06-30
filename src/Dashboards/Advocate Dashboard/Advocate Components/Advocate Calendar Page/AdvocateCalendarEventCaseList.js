import editIcon from '@iconify-icons/akar-icons/edit';
import DateFnsUtils from '@date-io/date-fns';
import bxsDownArrow from '@iconify-icons/bx/bxs-down-arrow';
import bxsRightArrow from '@iconify-icons/bx/bxs-right-arrow';
import eyeIcon from '@iconify-icons/akar-icons/eye';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import clockCircleOutlined from '@iconify-icons/ant-design/clock-circle-outlined';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import {
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  Paper,
  Select,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import addNewCase from '../../../../../assets/images/add-new-case.svg';
import appellate from '../../../../../assets/images/appellate-division.svg';
import districtCourt from '../../../../../assets/images/district-court.svg';
import highCourt from '../../../../../assets/images/high-court.svg';
import magistrateCourt from '../../../../../assets/images/magistrate-court.svg';
import modalClose from '../../../../../assets/images/modal-close.svg';
import myCalendar from '../../../../../assets/images/my-calender.svg';
import warn from '../../../../../assets/images/warn.svg';
import otherCourt from '../../../../../assets/images/other-court.svg';
import addNow from '../../../../../assets/images/update-button-large.svg';
import spacialTribunal from '../../../../../assets/images/spacial-tribunal.svg';
import { DataContext } from '../../../../../Context Api/ManageData';
import versus from '../../../../../assets/images/versus.svg';
import pencilIcon from '@iconify-icons/bi/pencil';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import theme from '../../../../../theme';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { parse, print } from 'graphql';
import gql from 'graphql-tag';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import { AdvocateApiHelper } from '../../../../../Utils/AdvocateApiHelper';
import moneyDollarCircleLine from '@iconify-icons/ri/money-dollar-circle-line';
import { useEffect } from 'react';

const AdvocateCasePageTableComponent = () => {
  const [addCase, setAddCase] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openFirstFormModal, setopenFirstFormModal] = useState(false);
  const [openSecondFormModal, setopenSecondFormModal] = useState(false);
  const [openThirdFormModal, setopenThirdFormModal] = useState(false);
  const [updateCaseInfoModal, setUpdateCaseInfoModal] = useState(false);
  const [updateFeesInfoModal, setUpdateFeesInfoModal] = useState(false);
  const [noNextDateOpen, setNoNextDateOpen] = useState(false);
  const [openDisposed, setOpenDisposed] = useState(false);
  const [openViewHistory, setOpenViewHistory] = useState(false);
  const { advocateCase, setAdvocateCase } = useContext(DataContext);
  const [advocateCaseId, setAdvocateCaseId] = useState('');
  const [realTimePrice, setRealTimePrice] = useState('');
  const [advocateCaseDetailsId, setAdvocateCaseDetailsId] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { addToast } = useToasts();
  const [primaryDate, setPrimaryDate] = useState(new Date());
  const [judgementDate, setJudgementDate] = useState(new Date());
  const [bailOnDate, setBailOnDate] = useState(new Date());
  const [wakalatnamaDate, setWakalatnamaDate] = useState(new Date());
  const [previousDate, setPreviousDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(new Date());
  const [orderDate, setOrderDate] = useState(new Date());
  const { district } = useContext(DataContext);
  const { caseCategory } = useContext(DataContext);
  const { caseType } = useContext(DataContext);
  const { courtName } = useContext(DataContext);
  const { court } = useContext(DataContext);
  const { primaryResult } = useContext(DataContext);
  const { judgementResult } = useContext(DataContext);
  const [lessForm, setLessForm] = useState(true);
  const { client } = useContext(DataContext);
  const { clientBehalf } = useContext(DataContext);
  const { clientType } = useContext(DataContext);
  const { advocateAssociate } = useContext(DataContext);
  const { policeStation } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  const [caseInfo, setCaseInfo] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    reset: reset3,
  } = useForm();

  const {
    register: register4,
    handleSubmit: handleSubmit4,
    formState: { errors: errors4 },
    reset: reset4,
  } = useForm();

  const {
    register: register5,
    handleSubmit: handleSubmit5,
    formState: { errors: errors5 },
    reset: reset5,
  } = useForm();

  //handle filling date
  const handleDateChange = (date, e) => {
    // console.log(new Date(date));
    setCaseInfo({
      ...caseInfo,
      filingDate: new Date(date),
    });
    // setSelectedDate(date);
    // setCaseInfo({
    //   ...caseInfo,
    //   [e.target.name]: e.target.value,
    // });
  };

  //handle primary date
  const hanldePrimaryDate = date => {
    // setPrimaryDate(date);
    setCaseInfo({
      ...caseInfo,
      primaryResultDate: new Date(date),
    });
  };

  //handle judgement date
  const handleJudgementDate = date => {
    // setJudgementDate(date);
    setCaseInfo({
      ...caseInfo,
      judgementDate: new Date(date),
    });
  };

  //hanlde bail on date
  const handleBailOnDate = date => {
    setBailOnDate(date);
  };

  // handle wakalatnama date
  const handleWakalatnamaDate = date => {
    // setWakalatnamaDate(date);

    setCaseInfo({
      ...caseInfo,
      entryDate: new Date(date),
    });
  };

  //handle previous date
  const handlePreviousDate = date => {
    setPreviousDate(date);
  };

  //handle next date
  const handleNextDate = date => {
    setNextDate(date);
  };

  //handle order date
  const handleOrderDate = date => {
    setOrderDate(date);
  };

  const handleClick = (e, id, item) => {
    setAnchorEl(e.currentTarget);
    setAdvocateCaseId(id);
    // setAdvocateCaseDetailsId(item.rowData);
  };

  const viewCaseDetailsByID = advocateCase?.find(
    ({ id }) => id === advocateCaseId
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  //============================================================
  //=======handling input change================================
  //============================================================

  const handleInputChange = e => {
    if (e.target.name === 'district') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'caseType') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'caseCategory') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'courtName') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'caseNumber') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === 'filingDate') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === 'judgementResult') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'primaryResult') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'wakalatnamaNo') {
      setCaseInfo({
        ...caseInfo,
        wakalatnamaList: [
          (caseInfo.wakalatnamaList[0] = {
            ...caseInfo.wakalatnamaList[0],
            number: e.target.value,
          }),
        ],
      });
    } else if (e.target.name === 'arisingOutOf') {
      setCaseInfo({
        ...caseInfo,
        arisingOutOfList: [e.target.value],
      });
    } else if (e.target.name === 'judgeName') {
      setCaseInfo({
        ...caseInfo,
        judgeNameList: [e.target.value],
      });
    } else if (e.target.name === 'actList') {
      setCaseInfo({
        ...caseInfo,
        actList: [e.target.value],
      });
    } else if (e.target.name === 'witnessList') {
      setCaseInfo({
        ...caseInfo,
        witnessList: [e.target.value],
      });
    } else {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: e.target.value,
      });
    }
  };

  //second form
  const handleSecondFormInputChange = e => {
    if (e.target.name === 'clientBehalf') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'clientType') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'assignTo') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'client') {
      setCaseInfo({
        ...caseInfo,
        client: [
          (caseInfo.client[0] = {
            ...caseInfo.client[0],
            id: e.target.value,
          }),
        ],
      });
    } else if (e.target.name === 'reference') {
      setCaseInfo({
        ...caseInfo,
        reference: [e.target.value],
      });
    } else if (e.target.name === 'opponentName') {
      setCaseInfo({
        ...caseInfo,
        opponentList: [
          (caseInfo.opponentList[0] = {
            ...caseInfo.opponentList[0],
            name: e.target.value,
          }),
        ],
      });
    } else if (e.target.name === 'opponentPhone') {
      setCaseInfo({
        ...caseInfo,
        opponentList: [
          (caseInfo.opponentList[0] = {
            ...caseInfo.opponentList[0],
            phoneList: [e.target.value],
          }),
        ],
      });
    } else if (e.target.name === 'opponentAdvocateName') {
      setCaseInfo({
        ...caseInfo,
        opponentAdvocate: [
          (caseInfo.opponentAdvocate[0] = {
            ...caseInfo.opponentAdvocate[0],
            name: e.target.value,
          }),
        ],
      });
    } else if (e.target.name === 'opponentWitness') {
      setCaseInfo({
        ...caseInfo,
        opponentWitnessList: [e.target.value],
      });
    }
  };

  //third form

  const handleThirdFormInputChange = e => {
    if (e.target.name === 'policeStation') {
      setCaseInfo({
        ...caseInfo,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'firNo') {
      setCaseInfo({
        ...caseInfo,
        fir: [e.target.value],
      });
    } else if (e.target.name === 'investigationOfficer') {
      setCaseInfo({
        ...caseInfo,
        investigationOfficerList: [
          (caseInfo.investigationOfficerList[0] = {
            ...caseInfo.investigationOfficerList[0],
            name: e.target.value,
          }),
        ],
      });
    } else if (e.target.name === 'investigationOfficerPhone') {
      setCaseInfo({
        ...caseInfo,
        investigationOfficerList: [
          (caseInfo.investigationOfficerList[0] = {
            ...caseInfo.investigationOfficerList[0],
            phoneList: [e.target.value],
          }),
        ],
      });
    }
  };

  // ############################## update first form ##############################

  useEffect(() => {
    setCaseInfo(viewCaseDetailsByID);
  }, [advocateCaseId, viewCaseDetailsByID]);

  const handleFirstFormSubmit = e => {
    e.preventDefault();
    const appellateCaseData = {
      id: advocateCaseId,
      district: {
        id: caseInfo?.district?.id,
      },
      caseType: {
        id: caseInfo?.caseType?.id,
      },
      caseNumber: caseInfo?.caseNumber,
      year: parseInt(caseInfo?.year),
      primaryResult: {
        id: caseInfo?.primaryResult?.id,
      },
      primaryResultDate: caseInfo?.primaryResultDate,
      reminderForExtension: parseInt(caseInfo?.reminderForExtension),
      caseCategory: {
        id: caseInfo?.caseCategory?.id,
      },
      courtName: {
        id: caseInfo?.courtName?.id,
      },
      filingDate: caseInfo?.filingDate,
      judgementDate: caseInfo?.judgementDate,
      judgementResult: {
        id: caseInfo?.judgementResult?.id,
      },
      bellOnStayFor: parseInt(caseInfo?.bailOnStayFor),
      wakalatnamaList: [
        {
          number: caseInfo?.wakalatnamaList[0]?.number,
          entryDate: caseInfo?.entryDate,
        },
      ],
      judgeNameList: [caseInfo?.judgeNameList[0]],
      actList: [caseInfo?.actList[0]],
      transferredCourtName: '',
      arisingOutOfList: [caseInfo?.arisingOutOfList[0]],
      witnessList: [caseInfo?.witnessList[0]],
      description: caseInfo?.description,
      newCaseNumber: [],
    };

    const newAppellateCaseData = JSON.stringify(appellateCaseData);
    const finalAppellateCaseData = newAppellateCaseData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const appellateCaseQuery = gql`
      mutation {
        updateCaseBasicInformation(
          case: ${finalAppellateCaseData}
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
            district {
              id
            }
            caseType {
              id
            }
            caseNumber
            year
            primaryResult {
              id
            }
            primaryResultDate
            reminderForExtension
            caseCategory {
              id
            }
            courtName {
              id
            }
            filingDate
            judgementDate
            judgementResult {
              id
            }
            bellOnStayFor
            wakalatnamaList {
              number
              entryDate
            }
            judgeNameList
            actList
            arisingOutOfList
            witnessList
            description
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(appellateCaseQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateCaseBasicInformation } = res?.data?.data;
        if (updateCaseBasicInformation !== null) {
          const { code, data, errors } =
            res?.data?.data.updateCaseBasicInformation;

          if (code === 200 && data !== null) {
            addToast(`Case basic information has been updated successfully`, {
              appearance: 'success',
              autoDismiss: true,
            });
            setOpen(false);
            AdvocateApiHelper.advCase
              .getAdvCase()
              .then(res => {
                setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
              })
              .then(() => reset())
              .then(() => setopenFirstFormModal(false))
              .catch(err =>
                addToast('Something wrong happend', {
                  appearance: 'error',
                  autoDismiss: true,
                })
              );
          } else if (code !== 200 && data === null) {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong!!!', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .then(() => {})
      // .then(() => window.location.reload())
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  useEffect(() => {
    if (district.length > 0 && caseInfo) {
      setLoading(false);
    }
  }, [district, caseInfo]);

  // if (loading) {
  //   return <div>Please wait</div>;
  // }
  // ############################## update first form ##############################

  // ############################## update second form ##############################
  const onSubmitSecond = e => {
    e.preventDefault();
    const caseStepTwoFormData = {
      id: advocateCaseId,
      clientBehalf: {
        id: caseInfo?.clientBehalf?.id,
      },
      clientType: {
        id: caseInfo?.clientType?.id,
      },
      client: [
        {
          id: caseInfo?.client[0]?.id,
        },
      ],
      assignTo: {
        id: caseInfo?.assignTo?.id,
      },
      reference: [caseInfo?.reference[0]],
      fileNumber: caseInfo?.fileNumber,
      opponentList: [
        {
          name: caseInfo?.opponentList[0]?.name,
          phoneList: [caseInfo?.opponentList[0]?.phoneList[0]],
        },
      ],
      opponentAdvocate: [
        {
          name: caseInfo?.opponentAdvocate[0]?.name,
        },
      ],
      opponentWitnessList: [caseInfo?.opponentWitnessList[0]?.name],
    };
    const newCaseStepTwoFormData = JSON.stringify(caseStepTwoFormData);
    const finalCaseStepTwoFormData = newCaseStepTwoFormData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    // console.log('step two form -2', caseStepTwoFormData);

    const caseStepTwoFormQuery = gql`
      mutation {
        updateCaseClientAndOpponentInformation(
          case: ${finalCaseStepTwoFormData}
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
            clientBehalf {
              id
            }
            clientType {
              id
            }
            client {
              id
            }
            assignTo {
              id
            }
            reference
            fileNumber
            opponentList {
              name
              phoneList
            }
            opponentAdvocate {
              name
            }
            opponentWitnessList
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(caseStepTwoFormQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateCaseClientAndOpponentInformation } = res?.data?.data;
        if (updateCaseClientAndOpponentInformation !== null) {
          const { code, data, errors } =
            res?.data?.data.updateCaseClientAndOpponentInformation;

          if (code === 200 && data !== null) {
            addToast(`Client's information has been updated successfully`, {
              appearance: 'success',
              autoDismiss: true,
            });
            setOpen(false);
            AdvocateApiHelper.advCase
              .getAdvCase()
              .then(res => {
                setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
              })
              .then(() => reset2())
              .then(() => setopenSecondFormModal(false))
              .catch(err =>
                addToast('Something wrong happend', {
                  appearance: 'error',
                  autoDismiss: true,
                })
              );
          } else if (code !== 200 && data === null) {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
  // ############################## update second form ##############################

  // ############################## update third form ##############################
  const onSubmitThird = e => {
    e.preventDefault();
    const stepThreeData = {
      id: advocateCaseId,
      policeStation: {
        id: caseInfo?.policeStation?.id,
      },
      fir: [caseInfo?.fir[0]],
      investigationOfficerList: [
        {
          name: caseInfo?.investigationOfficerList[0]?.name,
          phoneList: [caseInfo?.investigationOfficerList[0]?.phoneList[0]],
        },
      ],
    };

    const newStepThreeData = JSON.stringify(stepThreeData);
    const finalStepThreeData = newStepThreeData.replace(/"([^"]+)":/g, '$1:');

    // console.log('step three', stepThreeData);

    const stepThreeQuery = gql`
      mutation {
        updateAdditionalInformation(
          case: ${finalStepThreeData}
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
            policeStation {
              id
            }
            fir
            investigationOfficerList {
              name
              phoneList
            }
          }
        }
      }
    `;
    axios
      .post(
        MAIN_API,
        {
          query: print(stepThreeQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateAdditionalInformation } = res?.data?.data;
        if (updateAdditionalInformation !== null) {
          const { code, data, errors } =
            res?.data?.data.updateAdditionalInformation;

          if (code === 200 && data !== null) {
            addToast(
              `Client's additional information has been updated successfully`,
              {
                appearance: 'success',
                autoDismiss: true,
              }
            );
            setOpen(false);
            AdvocateApiHelper.advCase
              .getAdvCase()
              .then(res => {
                setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
              })
              .then(() => reset3())
              .then(() => setopenThirdFormModal(false))
              .catch(err =>
                addToast('Something wrong happend', {
                  appearance: 'error',
                  autoDismiss: true,
                })
              );
          } else if (code !== 200 && data === null) {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
  // ############################## update third form ##############################

  // ############################## delete case data ##############################
  const deleteCase = () => {
    const onSuccessDeleteCase = result => {
      AdvocateApiHelper.advCase
        .getAdvCase()
        .then(res => {
          setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
          addToast('Case data has been deleted successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteCase = error => {
      addToast('Something went wrong', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    AdvocateApiHelper.advCase
      .deleteCase(advocateCaseId)
      .then(onSuccessDeleteCase)
      .catch(onErrorDeleteCase);

    setAnchorEl(null);
    setDeleteModal(false);
  };
  // ############################## update second form ##############################

  //################################ update case info #########################
  const updateCaseInfo = (data, e) => {
    const updateCaseSchedule = {
      caseId: advocateCaseId,
      caseUpdate: {
        courtName: {
          id: caseInfo?.courtName?.id,
        },
        nextDate: nextDate,
        nextStep: data.caseNextStep,
        description: data.caseDescription,
        orderDate: orderDate,
        caseStatus: data.caseStatus,
      },
    };

    const newUpdateCaseSchedule = JSON.stringify(updateCaseSchedule);
    const finalUpdateCaseSchedule = newUpdateCaseSchedule.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const updateCaseScheduleQuery = gql`
      mutation {
        updateCaseScheduleInformation(
          caseScheduleUpdateInformation: ${finalUpdateCaseSchedule}
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
            caseUpdates {
              courtName {
                id
              }
              nextDate
              nextStep
              description
              orderDate
              caseStatus
            }
            disposed
            noNextDate
            caseStatus
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(updateCaseScheduleQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateCaseScheduleInformation } = res?.data?.data;
        if (updateCaseScheduleInformation !== null) {
          const { code, data, errors } =
            res?.data?.data.updateCaseScheduleInformation;

          if (code === 200 && data !== null) {
            addToast(`Case schedule has been updated successfully`, {
              appearance: 'success',
              autoDismiss: true,
            });
            setOpen(false);
            AdvocateApiHelper.advCase
              .getAdvCase()
              .then(res => {
                setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
              })
              .then(() => reset4())
              .then(() => setUpdateCaseInfoModal(false))
              .catch(err =>
                addToast('Something wrong happend', {
                  appearance: 'error',
                  autoDismiss: true,
                })
              );
          } else if (code !== 200 && data === null) {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
  //################################ update case info #########################

  //=============================================================================
  //---------------------------- No Next Date -----------------------------------
  //=============================================================================
  const noNextDate = () => {
    const noNextDateData = {
      caseId: advocateCaseId,
      noNextDate: true,
    };

    const onSuccessUpdateNoNextDate = result => {
      setNoNextDateOpen(false);
      const { updateCaseNoNextDateStatus } = result?.data?.data;
      if (updateCaseNoNextDateStatus !== null) {
        const { code, data, errors } =
          result?.data?.data.updateCaseNoNextDateStatus;

        if (code === 200 && data !== null) {
          addToast('This case hase no more next date', {
            appearance: 'success',
            autoDismiss: true,
          });
          AdvocateApiHelper.advCase
            .getAdvCase()
            .then(res => {
              setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
            })
            .then(() => setUpdateCaseInfoModal(false))
            .catch(err =>
              addToast('Something wrong happend', {
                appearance: 'error',
                autoDismiss: true,
              })
            );
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
    const onErrorUpdateNoNextDate = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    AdvocateApiHelper.advCase
      .neNextDate({ data: noNextDateData })
      .then(onSuccessUpdateNoNextDate)
      .catch(onErrorUpdateNoNextDate);

    handleClose();
  };
  //=============================================================================
  //---------------------------- No Next Date -----------------------------------
  //=============================================================================

  //=============================================================================
  //---------------------------- case disposed ----------------------------------
  //=============================================================================
  const disposed = () => {
    const caseDisposedData = {
      caseId: advocateCaseId,
      disposed: true,
    };

    const onSuccessUpdateCaseDisposed = result => {
      setOpenDisposed(false);
      const { updateCaseDisposedStatus } = result?.data?.data;
      if (updateCaseDisposedStatus !== null) {
        const { code, data, errors } =
          result?.data?.data.updateCaseDisposedStatus;

        if (code === 200 && data !== null) {
          addToast('This case has been disposed', {
            appearance: 'success',
            autoDismiss: true,
          });
          AdvocateApiHelper.advCase
            .getAdvCase()
            .then(res => {
              setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
            })
            .then(() => setUpdateCaseInfoModal(false))
            .catch(err =>
              addToast('Something wrong happend', {
                appearance: 'error',
                autoDismiss: true,
              })
            );
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
    const onErrorUpdateCaseDisposed = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    AdvocateApiHelper.advCase
      .caseDisposed({ data: caseDisposedData })
      .then(onSuccessUpdateCaseDisposed)
      .catch(onErrorUpdateCaseDisposed);

    handleClose();
  };
  //=============================================================================
  //---------------------------- case disposed ----------------------------------
  //=============================================================================

  //====================================================================
  //-------------------- case dispose status change -------------------
  //====================================================================
  const changeDisposeStatus = () => {
    const caseDisposedData = {
      caseId: advocateCaseId,
      disposed: false,
    };

    const onSuccessUpdateCaseDisposed = result => {
      setOpenDisposed(false);
      const { updateCaseDisposedStatus } = result?.data?.data;
      if (updateCaseDisposedStatus !== null) {
        const { code, data, errors } =
          result?.data?.data.updateCaseDisposedStatus;

        if (code === 200 && data !== null) {
          addToast('This case has been reopened', {
            appearance: 'success',
            autoDismiss: true,
          });
          AdvocateApiHelper.advCase
            .getAdvCase()
            .then(res => {
              setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
            })
            .then(() => setUpdateCaseInfoModal(false))
            .catch(err =>
              addToast('Something wrong happend', {
                appearance: 'error',
                autoDismiss: true,
              })
            );
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
    const onErrorUpdateCaseDisposed = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    AdvocateApiHelper.advCase
      .caseDisposed({ data: caseDisposedData })
      .then(onSuccessUpdateCaseDisposed)
      .catch(onErrorUpdateCaseDisposed);

    handleClose();
  };
  //====================================================================
  //-------------------- case dispose status change -------------------
  //====================================================================

  //=============================================================================
  //---------------------------- case fees and cost -----------------------------
  //=============================================================================
  const submitCaseFeesAndCost = (data, e) => {
    const earning = parseFloat(data.addFees) - parseFloat(data.addCost);
    setRealTimePrice(parseFloat(earning));

    const caseFeesAndCostData = {
      caseId: advocateCaseId,
      caseFee: {
        date: selectedDate,
        fee: parseFloat(data.addFees),
        cost: parseFloat(data.addCost),
      },
    };

    const newCaseFeesAndCostData = JSON.stringify(caseFeesAndCostData);
    const finalCaseFeesAndCostData = newCaseFeesAndCostData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const updateCaseFeeQuery = gql`
      mutation {
        updateCaseFee(
          caseFeeUpdateInformation: ${finalCaseFeesAndCostData}
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
            caseUpdates {
              courtName {
                id
              }
              nextDate
              nextStep
              description
              orderDate
              caseStatus
            }
            caseFeeList {
              date
              fee
              cost
            }
            disposed
            noNextDate
            caseStatus
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(updateCaseFeeQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateCaseFee } = res?.data?.data;
        if (updateCaseFee !== null) {
          const { code, data, errors } = res?.data?.data.updateCaseFee;

          if (code === 200 && data !== null) {
            addToast(`Fees & Cost has been updated successfully`, {
              appearance: 'success',
              autoDismiss: true,
            });
            setOpen(false);
            AdvocateApiHelper.advCase
              .getAdvCase()
              .then(res => {
                setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
              })
              .then(() => reset5())
              .then(() =>
                setTimeout(() => {
                  setUpdateFeesInfoModal(false);
                }, 5000)
              )
              // .then(() => setRealTimePrice(''))
              .catch(err =>
                addToast('Something wrong happend', {
                  appearance: 'error',
                  autoDismiss: true,
                })
              );
          } else if (code !== 200 && data === null) {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );

    setRealTimePrice('');
    handleClose();
  };
  //=============================================================================
  //---------------------------- case fees and cost -----------------------------
  //=============================================================================

  // ############################## case court card ##############################
  const CaseCourtCard = ({ path, img, title }) => {
    return (
      <Link to={path}>
        <Paper
          elevation={4}
          style={{
            width: '148px',
          }}
          className='h-34 flex justify-center items-center'
        >
          <div className='w-full h-full bg-white text-primarydark flex flex-col justify-center items-center space-y-3 py-6 border border-secondarydark border-opacity-40'>
            <div>
              <img src={img} alt='' />
            </div>
            <div className='text-xsm text-center'>
              <h1 className='capitalize'>{title}</h1>
            </div>
          </div>
        </Paper>
      </Link>
    );
  };

  const addNewCaseModal = (
    <div
      className='w-auto h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Select Court Type</span>
        <div style={{ top: '-31%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setAddCase(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex lg:flex-row flex-col items-center lg:space-x-4 space-x-0 lg:space-y-0 space-y-4 px-4 pb-8'>
        <div className='flex lg:flex-col flex-row items-center justify-between lg:space-y-4 space-y-0 lg:space-x-0 space-x-4'>
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'appellate-division'}`}
            title='Appellate Division'
            img={appellate}
          />
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'special-tribunal-court'}`}
            title='Special Tribunal Court'
            img={spacialTribunal}
          />
        </div>

        <div className='flex lg:flex-col flex-row items-center justify-between lg:space-y-4 space-y-0 lg:space-x-0 space-x-4'>
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'high-court'}`}
            title='High Court Division'
            img={highCourt}
          />
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'magistrate-court'}`}
            title='Magistrate Court'
            img={magistrateCourt}
          />
        </div>

        <div className='flex lg:flex-col flex-row items-center justify-between lg:space-y-4 space-y-0 lg:space-x-0 space-x-4'>
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'district-court'}`}
            title='District Court'
            img={districtCourt}
          />
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'others-court'}`}
            title='Others Court'
            img={otherCourt}
          />
        </div>
      </div>
    </div>
  );
  // ############################## case court card ##############################

  let newCase = [];
  advocateCase?.map((item, idx) => {
    newCase.push({
      sl: idx + 1,
      clientName: item.client,
      // clientPhone: item?.client[0]?.phoneList[0],
      caseNumber: item?.caseNumber,
      clientOpponentName: item?.opponentList,
      courtName: item?.courtName?.name,
      id: item?.id,
    });
  });

  const columns = [
    {
      name: 'sl',
      label: 'SL. No',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientName',
      label: 'Client Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <div>
              {value === null ? (
                <span>No Client Info</span>
              ) : (
                value.map(k => {
                  if (k?.name === null) {
                    return <span>No Client Name</span>;
                  } else if (k?.name !== null) {
                    return <span>{k?.name}</span>;
                  }
                })
              )}
            </div>
          );
        },
      },
    },
    {
      name: 'clientName',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
        customBodyRender: clientName => {
          return (
            <div>
              {clientName !== null
                ? clientName.map(k => {
                    if (k?.phoneList === null) {
                      return <span>No Phone Numberr</span>;
                    } else if (k?.phoneList !== null) {
                      return <span>{k?.phoneList[0]}</span>;
                    }
                  })
                : 'No Phone Number'}
            </div>
          );
        },
      },
    },
    {
      name: 'caseNumber',
      label: 'Case No.',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientOpponentName',
      label: 'Case Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <div>
              {value !== null
                ? value.map(k => <span>{k.name}</span>)
                : 'No Opponent'}
            </div>
          );
        },
      },
    },
    {
      name: 'courtName',
      label: 'Court Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'id',
      label: 'Actions',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, item) => {
          return (
            <div>
              <Button
                style={{ outline: 'none' }}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={e => handleClick(e, value, item)}
              >
                <Icon
                  className='text-2xl text-purple-400'
                  icon={overflowMenuVertical}
                />
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setUpdateCaseInfoModal(true)}
                >
                  <Icon icon={clockCircleOutlined} />
                  <span>Update</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setUpdateFeesInfoModal(true)}
                >
                  <Icon icon={moneyDollarCircleLine} />
                  <span>Add Fees & Cost</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setOpenViewHistory(true)}
                >
                  <Icon icon={moneyDollarCircleLine} />
                  <span>History</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setOpen(true)}
                >
                  <Icon icon={eyeIcon} />
                  <span>View</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setDeleteModal(true)}
                >
                  <Icon icon={trashCan} />
                  <span>Delete</span>
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  // -------------------------------------------------------------------
  // ------------------------ view case data ------------------------
  // -------------------------------------------------------------------
  const showContactInfo = (
    <div
      className='xl:w-2/4 lg:1/2 sm:w-2/3 w-11/12 bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '90%',
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Overview</span>
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
      <div className='flex flex-col space-y-8 overflow-y-scroll'>
        <div className='px-8 py-6'>
          <div className='px-6 py-8 flex flex-col space-y-8 -mt-10 bg-lightSilver rounded-lg'>
            <h1 className='text-2xl font-bold'>
              {viewCaseDetailsByID?.client !== null
                ? viewCaseDetailsByID?.client.map(k => <span>{k?.name}</span>)
                : 'No Client'}{' '}
              VS{' '}
              {viewCaseDetailsByID?.opponentList !== null
                ? viewCaseDetailsByID?.opponentList.map(k => (
                    <span>{k.name}</span>
                  ))
                : ''}
            </h1>

            <div className='flex flex-col space-y-8'>
              <div className='flex justify-between items-start space-x-3'>
                <span className='text-gray-500 text-xl font-semibold underline'>
                  Case Info
                </span>
                <button
                  onClick={() => setopenFirstFormModal(true)}
                  style={{ outline: 'none' }}
                  className='bg-secondarydark flex justify-center items-center space-x-2 px-5 py-1 rounded text-white'
                >
                  <Icon icon={pencilIcon} />
                  <span>Edit</span>
                </button>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Case Name/No</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.caseNumber}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Case Category</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.caseCategory?.name}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Court Name/ No</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.courtName?.name}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>District Name</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.district?.name}
                </span>
              </div>
            </div>

            <span className='w-full h-1 bg-white'></span>

            <div className='flex flex-col space-y-8'>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Primary Result & Date</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.primaryResult?.name}{' '}
                  {viewCaseDetailsByID?.primaryResultDate === null
                    ? ''
                    : viewCaseDetailsByID?.primaryResultDate}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Judgement Result & Date</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.judgementResult?.name}{' '}
                  {viewCaseDetailsByID?.judgementDate === null
                    ? ''
                    : viewCaseDetailsByID?.judgementDate}
                </span>
              </div>
            </div>

            <span className='w-full h-1 bg-white'></span>

            <div className='flex flex-col space-y-8'>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Bail or Stay For</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.bellOnStayFor}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Reminder for Extension</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.reminderForExtension}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Filing Date</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.filingDate}
                </span>
              </div>

              <div className='flex justify-between items-start space-x-3'>
                <span className='text-gray-500 text-xl font-semibold underline'>
                  More Info
                </span>
              </div>

              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Wakalatnama No & Date</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.wakalatnamaList !== null
                    ? viewCaseDetailsByID?.wakalatnamaList.map(k => (
                        <span>{k?.number}</span>
                      ))
                    : ''}{' '}
                  {viewCaseDetailsByID?.wakalatnamaList !== null
                    ? viewCaseDetailsByID?.wakalatnamaList.map(k => (
                        <span>{k?.entryDate}</span>
                      ))
                    : 'Add wakalatnama Date'}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Arising Out of</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.arisingOutOfList !== null
                    ? viewCaseDetailsByID?.arisingOutOfList.map(k => (
                        <span>{k}</span>
                      ))
                    : ''}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Applicable Acts</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  No fields
                </span>
              </div>
            </div>

            <span className='w-full h-1 bg-white'></span>

            <div className='flex flex-col space-y-8'>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Witness</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.witnessList !== null
                    ? viewCaseDetailsByID?.witnessList.map(k => (
                        <span>{k}</span>
                      ))
                    : ''}
                </span>
              </div>
              <div className='flex justify-between items-start space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Description</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.description}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 text-2xl text-deepdark underline px-8'>
          <h1>Client's Information</h1>
        </div>

        <div className='px-8 py-6'>
          <div className='px-6 py-8 flex flex-col space-y-8 -mt-6 bg-lightSilver rounded-lg'>
            <div className='flex justify-end items-center'>
              <button
                onClick={() => setopenSecondFormModal(true)}
                style={{ outline: 'none' }}
                className='bg-secondarydark flex justify-center items-center space-x-2 px-5 py-1 rounded text-white'
              >
                <Icon icon={pencilIcon} />
                <span>Edit</span>
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col space-y-8 w-2/5'>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>On Behalf Of</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.clientBehalf?.name}
                  </span>
                </div>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>Client’s Name</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.client !== null
                      ? viewCaseDetailsByID?.client.map(k => (
                          <span>{k?.name}</span>
                        ))
                      : ''}
                  </span>
                </div>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>Phone No</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.client !== null
                      ? viewCaseDetailsByID?.client.map(k => (
                          <span>{k?.phoneList[0]}</span>
                        ))
                      : ''}
                  </span>
                </div>
              </div>

              <div>
                <img className='w-16' src={versus} alt='' />
              </div>

              <div className='flex flex-col space-y-8 w-2/5'>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>Opponent Name</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.opponentList !== null
                      ? viewCaseDetailsByID?.opponentList.map(k => (
                          <span>{k?.name}</span>
                        ))
                      : ''}
                  </span>
                </div>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>Phone No</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.opponentList !== null
                      ? viewCaseDetailsByID?.opponentList.map(k => (
                          <span>{k?.phoneList[0]}</span>
                        ))
                      : ''}
                  </span>
                </div>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>Advocate Name</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.opponentAdvocate !== null
                      ? viewCaseDetailsByID?.opponentAdvocate.map(k => (
                          <span>{k?.name}</span>
                        ))
                      : ''}
                  </span>
                </div>
              </div>
            </div>

            <span className='w-full h-1 bg-white'></span>

            <div className='flex justify-between items-start'>
              <div className='flex flex-col space-y-8 w-2/5'>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>Assign To</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.assignTo?.name}
                  </span>
                </div>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>Reference Name/ No</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.reference !== null
                      ? viewCaseDetailsByID?.reference.map(k => (
                          <span>{k}</span>
                        ))
                      : ''}
                  </span>
                </div>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>File No</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.fileNumber}
                  </span>
                </div>
              </div>

              <div className='flex flex-col space-y-8 w-2/5'>
                <div className='flex justify-between items-start space-x-3'>
                  <h1 className='text-gray-600 w-1/2'>Witness</h1>
                  <span className='text-deepdark font-semibold w-1/2'>
                    {viewCaseDetailsByID?.opponentWitnessList !== null
                      ? viewCaseDetailsByID?.opponentWitnessList.map(k => (
                          <span>{k}</span>
                        ))
                      : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 text-2xl text-deepdark underline px-8'>
          <h1>More Information</h1>
        </div>

        <div className='px-8 py-6'>
          <div className='px-6 py-8 flex flex-col space-y-8 -mt-6 bg-lightSilver rounded-lg'>
            <div className='flex justify-end items-center'>
              <button
                onClick={() => setopenThirdFormModal(true)}
                style={{ outline: 'none' }}
                className='bg-secondarydark flex justify-center items-center space-x-2 px-5 py-1 rounded text-white'
              >
                <Icon icon={pencilIcon} />
                <span>Edit</span>
              </button>
            </div>
            <div className='flex flex-col space-y-8 w-full'>
              <div className='flex justify-between items-center space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Police Station</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.policeStation?.name}
                </span>
              </div>
              <div className='flex justify-between items-center space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Investigating Officer</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.investigationOfficerList !== null
                    ? viewCaseDetailsByID?.investigationOfficerList.map(k => (
                        <span>{k?.name}</span>
                      ))
                    : ''}
                </span>
              </div>
              <div className='flex justify-between items-center space-x-3'>
                <h1 className='text-gray-600 w-1/2'>FIR No</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.fir !== null
                    ? viewCaseDetailsByID?.fir.map(k => <span>{k}</span>)
                    : ''}
                </span>
              </div>
              <div className='flex justify-between items-center space-x-3'>
                <h1 className='text-gray-600 w-1/2'>Phone No</h1>
                <span className='text-deepdark font-semibold w-1/2'>
                  {viewCaseDetailsByID?.investigationOfficerList !== null
                    ? viewCaseDetailsByID?.investigationOfficerList.map(k => (
                        <span>{k?.phoneList[0]}</span>
                      ))
                    : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // -------------------------------------------------------------------
  // ------------------------ view case data ------------------------
  // -------------------------------------------------------------------

  // -------------------------------------------------------------------
  // ------------------------ update first form ------------------------
  // -------------------------------------------------------------------
  const editCaseFirstForm = (
    <div
      className='2xl:w-2/3 w-11/12 bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '90%',
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Edit Case Information</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setopenFirstFormModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      <div className='px-6 overflow-y-scroll'>
        <form onSubmit={handleFirstFormSubmit} className='mb-20'>
          <ThemeProvider theme={theme}>
            <div className='flex flex-col space-y-8'>
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  // error={errors.district}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    District
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='District'
                    name='district'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    value={caseInfo?.district?.id}
                    onChange={handleInputChange}
                    // {...register('district', { required: true })}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {district.map(district => (
                      <MenuItem value={district.id}>{district.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.district?.type === 'required' &&
                      'District is required'}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  // error={errors.caseCategory}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Case Category
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Case Category'
                    name='caseCategory'
                    value={caseInfo?.caseCategory?.id}
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    onChange={handleInputChange}
                    // {...register('caseCategory', { required: true })}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {caseCategory?.map(caseCategory => (
                      <MenuItem value={caseCategory?.id}>
                        {caseCategory?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                    {errors.caseCategory?.type === 'required' &&
                      'Case Category is required'}
                  </FormHelperText> */}
                </FormControl>
              </div>
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  // error={errors.caseType}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Case Type
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Case Type'
                    name='caseType'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    onChange={handleInputChange}
                    value={caseInfo?.caseType?.id}
                    // {...register('caseType', { required: true })}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {caseType?.map(caseType => (
                      <MenuItem value={caseType?.id}>{caseType?.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.caseType?.type === 'required' &&
                      'Case Type is required'}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  // error={errors.courtName}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Court Name
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Court Name'
                    name='courtName'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    value={caseInfo?.courtName?.id}
                    onChange={handleInputChange}
                    // {...register('courtName', { required: true })}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {courtName?.map(courtName => (
                      <MenuItem value={courtName?.id}>
                        {courtName?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                    {errors.courtName?.type === 'required' &&
                      'Case Type is required'}
                  </FormHelperText> */}
                </FormControl>
              </div>

              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <FormControl className='w-full'>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Case No'
                      id='outlined-basic'
                      name='caseNumber'
                      variant='outlined'
                      color='secondary'
                      value={caseInfo?.caseNumber}
                      onChange={handleInputChange}
                      // error={errors.caseNumber}
                      // {...register('caseNumber', { required: true })}
                    />
                    {/* <FormHelperText>
                      {errors?.caseNumber?.type === 'required' &&
                        'Case No. is required'}
                    </FormHelperText> */}
                  </FormControl>

                  <FormControl className='w-full'>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Case year'
                      id='outlined-basic'
                      name='year'
                      variant='outlined'
                      color='secondary'
                      onChange={handleInputChange}
                      value={caseInfo?.year}
                      // error={errors.caseYear}
                      // {...register('caseYear', { required: true })}
                    />
                    {/* <FormHelperText>
                      {errors?.caseYear?.type === 'required' &&
                        'Case Year is required'}
                    </FormHelperText> */}
                  </FormControl>
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className='bg-lightSilver rounded text-white w-full'
                    disableToolbar
                    variant='inline'
                    inputVariant='outlined'
                    color='secondary'
                    format='MM/dd/yyyy'
                    label='Filing Date'
                    name='filingDate'
                    // value={selectedDate}
                    value={caseInfo?.filingDate}
                    // onChange={handleInputChange}
                    onChange={handleDateChange}
                    // onChange={e => console.log(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    // error={errors.fillingDate}
                    // {...register("fillingDate", { required: true })}
                    // helperText={
                    //   errors?.fillingDate?.type === "required" && "aldkfjsl"
                    // }
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    // error={errors.primaryResult}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Primary Result
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Primary Result'
                      name='primaryResult'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      // {...register('primaryResult', { required: false })}
                      onChange={handleInputChange}
                      value={caseInfo?.primaryResult?.id}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {primaryResult?.map(primaryResult => (
                        <MenuItem value={primaryResult?.id}>
                          {primaryResult?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>
                  {errors.primaryResult?.type === "required" &&
                    "Case Type is required"}
                </FormHelperText> */}
                  </FormControl>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className='bg-lightSilver rounded text-white w-full'
                      disableToolbar
                      variant='inline'
                      inputVariant='outlined'
                      color='secondary'
                      format='MM/dd/yyyy'
                      label='Primary Date'
                      value={caseInfo?.primaryResultDate}
                      onChange={hanldePrimaryDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className='bg-lightSilver rounded text-white w-full'
                      disableToolbar
                      variant='inline'
                      inputVariant='outlined'
                      color='secondary'
                      format='MM/dd/yyyy'
                      label='Judgement Date'
                      value={caseInfo?.judgementDate}
                      onChange={handleJudgementDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    // error={errors.primaryResult}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Judgement Result
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Judgement Result'
                      name='judgementResult'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      // {...register('judgementResult', { required: false })}
                      onChange={handleInputChange}
                      value={caseInfo?.judgementResult?.id}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {judgementResult?.map(judgementResult => (
                        <MenuItem value={judgementResult?.id}>
                          {judgementResult?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>
                  {errors.primaryResult?.type === "required" &&
                    "Case Type is required"}
                </FormHelperText> */}
                  </FormControl>
                </div>
              </div>
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Reminder for Extension'
                  id='outlined-basic'
                  name='reminderForExtension'
                  variant='outlined'
                  color='secondary'
                  type='number'
                  value={caseInfo?.reminderForExtension}
                  onChange={handleInputChange}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Bail or Stay For'
                  id='outlined-basic'
                  name='bellOnStayFor'
                  variant='outlined'
                  color='secondary'
                  type='number'
                  value={caseInfo?.bellOnStayFor}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div
              onClick={() => setLessForm(!lessForm)}
              className='flex items-center w-full mt-17 mb-7 space-x-2 cursor-pointer'
            >
              <div className='flex items-center space-x-2'>
                {lessForm === true ? (
                  <>
                    <span className='text-primarydark text-xl'>Less</span>
                    <Icon className='text-primarydark' icon={bxsDownArrow} />
                  </>
                ) : (
                  <>
                    <span className='text-primarydark text-xl'>More</span>
                    <Icon className='text-primarydark' icon={bxsRightArrow} />
                  </>
                )}
              </div>
              <div className='border border-primarydark border-opacity-40 w-full'></div>
            </div>
            <div
              className={
                lessForm === true ? 'flex flex-col space-y-8 pb-10' : 'hidden'
              }
            >
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label=' Wakalatnama No'
                    id='outlined-basic'
                    name='wakalatnamaNo'
                    variant='outlined'
                    color='secondary'
                    value={
                      caseInfo && caseInfo?.wakalatnamaList
                        ? caseInfo?.wakalatnamaList[0]?.number
                        : ''
                    }
                    onChange={handleInputChange}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className='bg-lightSilver rounded text-white w-full'
                      disableToolbar
                      variant='inline'
                      inputVariant='outlined'
                      color='secondary'
                      format='yyyy/MM/dd'
                      label='Wakalatnama Entry Date'
                      value={caseInfo?.entryDate}
                      onChange={handleWakalatnamaDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Arising Out Of'
                  id='outlined-basic'
                  name='arisingOutOf'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo?.arisingOutOfList
                      ? caseInfo?.arisingOutOfList[0]
                      : ''
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label="Judge's Name"
                  id='outlined-basic'
                  name='judgeName'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo?.judgeNameList
                      ? caseInfo?.judgeNameList[0]
                      : ''
                  }
                  onChange={handleInputChange}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Applicable Acts'
                  id='outlined-basic'
                  name='actList'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo?.actList ? caseInfo?.actList[0] : ''
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Witness'
                  id='outlined-basic'
                  name='witnessList'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo?.witnessList
                      ? caseInfo?.witnessList[0]
                      : ''
                  }
                  onChange={handleInputChange}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Description'
                  id='outlined-basic'
                  name='description'
                  variant='outlined'
                  color='secondary'
                  value={caseInfo?.description}
                  onChange={handleInputChange}
                />
              </div>
              {/* {courtDivision === 'district-court' ||
            courtDivision === 'magistrate-court' ||
            courtDivision === 'special-tribunal-court' ||
            courtDivision === 'others-court' ? (
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Transferred Court Name'
                  id='outlined-basic'
                  name='text'
                  variant='outlined'
                  color='secondary'
                  {...register('transferredCourtName', { required: false })}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='New Case No.'
                  id='outlined-basic'
                  name='text'
                  variant='outlined'
                  color='secondary'
                  {...register('newCaseNumber', { required: false })}
                />
              </div>
            ) : (
              <></>
            )} */}
            </div>
          </ThemeProvider>
          <div className='flex justify-center items-center'>
            {/* <Link
            to={`/dashboard/advocate/case/second-form/${courtDivision}/${caseId}`}
            style={{ outline: 'none' }}
          >
          </Link> */}
            <button type='submit' style={{ outline: 'none' }}>
              <img src={addNow} alt='' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  // -------------------------------------------------------------------
  // ------------------------ update first form ------------------------
  // -------------------------------------------------------------------

  // -------------------------------------------------------------------
  // ------------------------ update second form ------------------------
  // -------------------------------------------------------------------
  const editCaseSecondForm = (
    <div
      className='2xl:w-2/3 w-11/12 bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '90%',
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Edit Client's Information</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setopenSecondFormModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='px-6 overflow-y-scroll'>
        <form
          onSubmit={onSubmitSecond}
          className='flex flex-col items-center space-y-20'
        >
          <ThemeProvider theme={theme}>
            <div className='flex lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
              <div className='flex flex-col space-y-8 w-full'>
                <FormControl className='w-full' variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Client Behalf
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Client Behalf'
                    name='clientBehalf'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    value={caseInfo?.clientBehalf?.id}
                    onChange={handleSecondFormInputChange}
                    // {...register2('client_behalf', { required: false })}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {clientBehalf?.map(clientBehalf => (
                      <MenuItem value={clientBehalf?.id}>
                        {clientBehalf?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                  {errors.sub_district?.type === 'required' &&
                    'District is required'}
                </FormHelperText> */}
                </FormControl>
                <FormControl className='w-full' variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Client Type
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Client Type'
                    name='clientType'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    value={caseInfo?.clientType?.id}
                    onChange={handleSecondFormInputChange}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {clientType?.map(clientType => (
                      <MenuItem value={clientType?.id}>
                        {clientType?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                  {errors.sub_district?.type === 'required' &&
                    'District is required'}
                </FormHelperText> */}
                </FormControl>

                <FormControl className='w-full' variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Client
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Client'
                    name='client'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    value={
                      caseInfo && caseInfo.client ? caseInfo.client[0]?.id : ''
                    }
                    onChange={handleSecondFormInputChange}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {client?.map(client => (
                      <MenuItem value={client?.id}>{client?.name}</MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                  {errors.sub_district?.type === 'required' &&
                    'District is required'}
                </FormHelperText> */}
                </FormControl>
                <FormControl className='w-full' variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Assign To
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Assign To'
                    name='assignTo'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    value={caseInfo?.assignTo?.id}
                    onChange={handleSecondFormInputChange}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {advocateAssociate?.map(advocateAssociate => (
                      <MenuItem value={advocateAssociate?.id}>
                        {advocateAssociate?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                  {errors.sub_district?.type === 'required' &&
                    'District is required'}
                </FormHelperText> */}
                </FormControl>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Reference Name/No'
                  id='outlined-basic'
                  name='text'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo.reference ? caseInfo.reference[0] : ''
                  }
                  onChange={handleSecondFormInputChange}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='File No'
                  id='outlined-basic'
                  name='fileNumber'
                  variant='outlined'
                  color='secondary'
                  value={caseInfo?.fileNumber}
                  onChange={handleSecondFormInputChange}
                />
              </div>

              <div className='self-center lg:flex hidden'>
                <img className='w-32' src={versus} alt='' />
              </div>
              <div className='flex flex-col space-y-8 w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Opponent Name'
                  id='outlined-basic'
                  name='opponentName'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo.opponentList
                      ? caseInfo.opponentList[0]?.name
                      : ''
                  }
                  onChange={handleSecondFormInputChange}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Phone Number'
                  id='outlined-basic'
                  variant='outlined'
                  color='secondary'
                  name='opponentPhone'
                  onChange={handleSecondFormInputChange}
                  value={
                    caseInfo && caseInfo.opponentList
                      ? caseInfo.opponentList[0] &&
                        caseInfo?.opponentList[0]?.phoneList &&
                        caseInfo?.opponentList[0]?.phoneList[0]
                      : ''
                  }
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Opponent Advocate Name'
                  id='outlined-basic'
                  name='opponentAdvocateName'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo?.opponentAdvocate
                      ? caseInfo?.opponentAdvocate[0]?.name
                      : ''
                  }
                  onChange={handleSecondFormInputChange}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Opponent Witness'
                  id='outlined-basic'
                  name='opponentWitness'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo?.opponentWitnessList
                      ? caseInfo?.opponentWitnessList[0]
                      : ''
                  }
                  onChange={handleSecondFormInputChange}
                />
              </div>
            </div>
            <div className='flex items-center space-x-8'>
              <button type='submit' style={{ outline: 'none' }}>
                <img src={addNow} alt='' />
              </button>
            </div>
          </ThemeProvider>
        </form>
      </div>
    </div>
  );
  // -------------------------------------------------------------------
  // ------------------------ update second form ------------------------
  // -------------------------------------------------------------------

  // -------------------------------------------------------------------
  // ------------------------ update third form ------------------------
  // -------------------------------------------------------------------
  const editCaseThirdForm = (
    <div
      className='2xl:w-2/3 w-11/12 bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '90%',
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Edit More Information</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setopenThirdFormModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='px-6 overflow-y-scroll'>
        <form
          className='flex flex-col items-center space-y-20'
          onSubmit={onSubmitThird}
        >
          <ThemeProvider theme={theme}>
            <div className='flex flex-col items-start lg:space-y-8 space-y-0 lg:space-x-0 space-x-8 w-full'>
              <div className='flex lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  // error={errors.caseType}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Police Station{' '}
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Police Station'
                    name='policeStation'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    value={caseInfo?.policeStation?.id}
                    onChange={handleThirdFormInputChange}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {policeStation?.map(policeStation => (
                      <MenuItem value={policeStation?.id}>
                        {policeStation?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                  {errors.policeStation?.type === "required" &&
                    "Case Type is required"}
                </FormHelperText> */}
                </FormControl>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='FIR No'
                  id='outlined-basic'
                  name='firNo'
                  variant='outlined'
                  color='secondary'
                  value={caseInfo && caseInfo?.fir ? caseInfo?.fir[0] : ''}
                  onChange={handleThirdFormInputChange}
                />
              </div>
              <div className='flex lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Investigating Officer'
                  id='outlined-basic'
                  name='investigationOfficer'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo.investigationOfficerList
                      ? caseInfo?.investigationOfficerList[0].name
                      : ''
                  }
                  onChange={handleThirdFormInputChange}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Phone No'
                  id='outlined-basic'
                  name='investigationOfficerPhone'
                  variant='outlined'
                  color='secondary'
                  value={
                    caseInfo && caseInfo?.investigationOfficerList
                      ? caseInfo.investigationOfficerList[0] &&
                        caseInfo?.investigationOfficerList[0].phoneList &&
                        caseInfo?.investigationOfficerList[0]?.phoneList[0]
                      : ''
                  }
                  onChange={handleThirdFormInputChange}
                />
              </div>
            </div>
          </ThemeProvider>
          <div className='flex items-center space-x-8'>
            <button>
              <img src={addNow} alt='' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  // -------------------------------------------------------------------
  // ------------------------ update third form ------------------------
  // -------------------------------------------------------------------

  // --------------------------------------------------------------
  // ------------------------ delete modal ------------------------
  // --------------------------------------------------------------
  const deleteTableData = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Confirm Delete</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setDeleteModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col space-y-3 justify-center items-center'>
        <div className='-mt-7'>
          <img src={warn} alt='' />
        </div>
        <h1 className='text-xl'>This action is not reversible.</h1>
        <h1 className='text-xl'>Are you sure to delete this?</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 w-48 capitalize'
          onClick={() => deleteCase()}
        >
          Confirm
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-800 text-white text-sm font-semibold bg-red-800 h-11 w-48 capitalize'
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
  // --------------------------------------------------------------
  // ------------------------ delete modal ------------------------
  // --------------------------------------------------------------

  // ==============================================================================
  // ------------------------ update case date information ------------------------
  // ==============================================================================
  const updateCaseInformation = (
    <div
      className='xl:w-2/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Update Info</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setUpdateCaseInfoModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      <div className='px-8'>
        <div className='p-2 flex flex-col space-y-4 -mt-10'>
          <div className='flex justify-start items-start space-x-10 w-full'>
            <div className='flex flex-col space-x-4 space-y-2'>
              <h1 className='text-xsm font-light'>Case Name/No</h1>
              <span className='font-bold text-lg'>
                {viewCaseDetailsByID?.caseNumber}
              </span>
            </div>
            <div className='flex flex-col space-x-4 space-y-2'>
              <h1 className='text-xsm font-light'>Client Name</h1>
              <span className='font-bold text-lg'>
                {viewCaseDetailsByID?.client !== null
                  ? viewCaseDetailsByID?.client.map(k => <span>{k?.name}</span>)
                  : 'No Client'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {viewCaseDetailsByID?.disposed === false ? (
        <>
          <form onSubmit={handleSubmit4(updateCaseInfo)} className='mb-10 px-8'>
            <ThemeProvider theme={theme}>
              <div className='flex flex-col space-y-8'>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    // error={errors.courtName}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Court Name
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Court Name'
                      name='caseCourtName'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register4('caseCourtName', { required: false })}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {courtName?.map(courtName => (
                        <MenuItem value={courtName?.id}>
                          {courtName?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {errors.courtName?.type === 'required' &&
                        'Case Type is required'}
                    </FormHelperText>
                  </FormControl>
                  <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className='bg-lightSilver rounded text-white w-full'
                        disableToolbar
                        variant='inline'
                        inputVariant='outlined'
                        color='secondary'
                        format='MM/dd/yyyy'
                        label='Previous Date'
                        value={previousDate}
                        onChange={handlePreviousDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        // error={errors.fillingDate}
                        // {...register("fillingDate", { required: true })}
                        // helperText={
                        //   errors?.fillingDate?.type === "required" && "aldkfjsl"
                        // }
                      />
                    </MuiPickersUtilsProvider>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Previous Step'
                      id='outlined-basic'
                      name='text'
                      variant='outlined'
                      color='secondary'
                      {...register4('casePreviousStep', {
                        required: false,
                      })}
                    />
                  </div>
                </div>

                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className='bg-lightSilver rounded text-white w-full'
                        disableToolbar
                        variant='inline'
                        inputVariant='outlined'
                        color='secondary'
                        format='MM/dd/yyyy'
                        label='Next Date'
                        value={nextDate}
                        onChange={handleNextDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        // error={errors.fillingDate}
                        // {...register("fillingDate", { required: true })}
                        // helperText={
                        //   errors?.fillingDate?.type === "required" && "aldkfjsl"
                        // }
                      />
                    </MuiPickersUtilsProvider>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Next Step'
                      id='outlined-basic'
                      name='text'
                      variant='outlined'
                      color='secondary'
                      {...register4('caseNextStep', {
                        required: false,
                      })}
                    />
                  </div>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    // error={errors.description}
                  >
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Description'
                      id='outlined-basic'
                      name='text'
                      variant='outlined'
                      color='secondary'
                      {...register4('caseDescription', { required: false })}
                    />
                  </FormControl>
                </div>

                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className='bg-lightSilver rounded text-white w-full'
                      disableToolbar
                      variant='inline'
                      inputVariant='outlined'
                      color='secondary'
                      format='MM/dd/yyyy'
                      label='Order Date'
                      value={orderDate}
                      onChange={handleOrderDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      // error={errors.fillingDate}
                      // {...register("fillingDate", { required: true })}
                      // helperText={
                      //   errors?.fillingDate?.type === "required" && "aldkfjsl"
                      // }
                    />
                  </MuiPickersUtilsProvider>

                  <FormControl
                    className='w-full'
                    variant='outlined'
                    // error={errors.primaryResult}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Case Status
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Case Status'
                      name='caseStatus'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register4('caseStatus', { required: false })}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='ACTIVE'>Active</MenuItem>
                      <MenuItem value='INACTIVE'>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className='flex justify-center items-center space-x-8'>
                  {/* <button
                type='reset'
                style={{ outline: 'none' }}
                className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
              >
                Reset
              </button> */}
                  <button>
                    <img src={addNow} alt='' />
                  </button>
                </div>
              </div>
            </ThemeProvider>
          </form>
          <div className='flex justify-end items-center space-x-3 pb-10 mb-10 px-8'>
            <button
              onClick={() => setNoNextDateOpen(true)}
              style={{ outline: 'none' }}
              className='flex justify-center items-center font-bold px-3 py-1 rounded text-secondarydark border border-secondarydark hover:text-white hover:bg-secondarydark transition duration-200 ease-in-out'
            >
              No Next Date
            </button>
            <button
              onClick={() => setOpenDisposed(true)}
              style={{ outline: 'none' }}
              className='flex justify-center items-center font-bold px-3 py-1 rounded text-secondarydark border border-secondarydark hover:text-white hover:bg-secondarydark transition duration-200 ease-in-out'
            >
              Disposed
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='mb-10 px-8 flex flex-col items-center justify-center pb-10 space-y-8'>
            <div className='text-center flex flex-col items-center space-y-2 -mt-10'>
              <h1>This case has been disposed</h1>
              <h1 className='text-pink-900 font-bold text-2xl'>
                You can <span className='text-3xl text-deepdark'>reopen</span>{' '}
                the case if you want to...
              </h1>
            </div>
            <div className='w-full flex justify-center items-center space-x-6 pb-6'>
              <button
                style={{ outline: 'none' }}
                className='rounded-md border border-deepdark text-white text-sm font-semibold bg-deepdark h-11 w-48 capitalize'
                onClick={() => changeDisposeStatus()}
              >
                Confirm
              </button>
              <button
                style={{ outline: 'none' }}
                className='rounded-md border border-red-900 text-white text-sm font-semibold bg-red-900 h-11 w-48 capitalize'
                onClick={() => setUpdateCaseInfoModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
  // ==============================================================================
  // ------------------------ update case date information ------------------------
  // ==============================================================================

  // ===================================================================
  // ------------------------ view case history ------------------------
  // ===================================================================

  const viewHistoryModal = (
    <div
      className='xl:w-2/4 lg:1/2 sm:w-2/3 w-11/12 h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        maxHeight: '80%',
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Overview</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpenViewHistory(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      {/* main content */}
      <div className='flex flex-col space-y-8 overflow-y-scroll pb-10 px-8'>
        {viewCaseDetailsByID?.caseUpdates !== null ? (
          <>
            <div className='px-8 py-6 flex flex-col justify-center items-center space-y-4 border border-primarydark border-opacity-70 rounded-xl w-full'>
              {viewCaseDetailsByID?.caseUpdates?.map((item, key) => (
                <>
                  <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-6 space-x-0 lg:space-y-0 space-y-6 w-full'>
                    <div className='flex flex-col lg:w-1/3 w-full'>
                      <h1 className='text-base font-light'>Date</h1>
                      <span className='pl-3 text-xl font-bold'>
                        {item?.nextDate}
                      </span>
                    </div>

                    <div className='flex flex-col lg:w-1/3 w-full'>
                      <h1 className='text-base font-light'>Step</h1>
                      <span className='pl-3 text-xl font-bold'>
                        {item?.nextStep}
                      </span>
                    </div>

                    <div className='flex flex-col lg:w-1/3 w-full'>
                      <h1 className='text-base font-light'>Note</h1>
                      <span className='pl-3 text-xl font-bold'>
                        {item?.description}
                      </span>
                    </div>
                  </div>
                  <span className='h-0.5 bg-deepdark bg-opacity-30 w-full'></span>{' '}
                </>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className='flex justify-center items-center px-8 text-xl font-bold'>
              No case history yet!!
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ===================================================================
  // ------------------------ view case history ------------------------
  // ===================================================================

  // --------------------------------------------------------------
  // ------------------------ confirm no next date ----------------
  // --------------------------------------------------------------
  const caseNoNextDateModal = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Confirm No Next Date</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setNoNextDateOpen(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col space-y-3 justify-center items-center'>
        <div className='-mt-7'>
          <img src={warn} alt='' />
        </div>
        <h1 className='text-xl'>This action is not reversible.</h1>
        <h1 className='text-xl'>Are you sure the case has no next date?</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 w-48 capitalize'
          onClick={() => noNextDate()}
        >
          Confirm
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-800 text-white text-sm font-semibold bg-red-800 h-11 w-48 capitalize'
          onClick={() => setNoNextDateOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
  // --------------------------------------------------------------
  // ------------------------ confirm no next date ----------------
  // --------------------------------------------------------------

  // --------------------------------------------------------------
  // ------------------------ confirm disposed --------------------
  // --------------------------------------------------------------
  const caseDisposedModal = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Confirm Disposal</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpenDisposed(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col space-y-3 justify-center items-center'>
        <div className='-mt-7'>
          <img src={warn} alt='' />
        </div>
        <h1 className='text-xl'>This action is not reversible.</h1>
        <h1 className='text-xl'>Are you sure want to dispose this case?</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 w-48 capitalize'
          onClick={() => disposed()}
        >
          Confirm
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-800 text-white text-sm font-semibold bg-red-800 h-11 w-48 capitalize'
          onClick={() => setOpenDisposed(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
  // --------------------------------------------------------------
  // ------------------------ confirm disposed---------------------
  // --------------------------------------------------------------

  // ==================================================================================
  // ------------------------ update fees and cost information ------------------------
  // ==================================================================================
  let totalEarning = [];
  let finalTotalEarning = 0;
  viewCaseDetailsByID?.caseFeeList?.forEach((item, index) =>
    totalEarning.push({
      sl: index + 1,
      earning: item?.fee - item?.cost,
    })
  );

  totalEarning?.map(
    (item, index) =>
      (finalTotalEarning =
        parseFloat(finalTotalEarning) + parseFloat(item?.earning))
  );

  const updateFeesAndCostInfo = (
    <div
      className='xl:w-2/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Update Fees and Cost</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setUpdateFeesInfoModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      <div className='px-8'>
        <div className='p-2 flex flex-col space-y-4 -mt-10'>
          <div className='flex justify-between w-full'>
            <div className='flex flex-col space-x-4 space-y-2 w-1/3'>
              <h1 className='text-xsm font-light'>Case Name/No</h1>
              <span className='font-bold text-lg'>
                {viewCaseDetailsByID?.caseNumber}
              </span>
            </div>
            <div className='flex flex-col space-x-4 space-y-2 w-1/3'>
              <h1 className='text-xsm font-light'>Client Name</h1>
              <span className='font-bold text-lg'>
                {viewCaseDetailsByID?.client !== null
                  ? viewCaseDetailsByID?.client.map(k => <span>{k?.name}</span>)
                  : 'No Client Info'}
              </span>
            </div>
            <div className='flex items-center space-x-2 w-1/3'>
              <h1 className='font-medium text-secondarydark'>
                Total Earning:{' '}
              </h1>
              <span className='text-secondarydark font-medium'>
                {finalTotalEarning}/- Taka
              </span>
            </div>
          </div>
          <ul className='list-outside list-disc pl-5'>
            {viewCaseDetailsByID?.caseFeeList?.map((item, index) => (
              <li>
                <div className='flex space-x-4 w-1/2'>
                  <span className='font-bold text-lg'>{item.date}</span>
                  <div className='flex items-center space-x-2 text-lg text-secondarydark font-semibold'>
                    <h1 className='text-secondarydark font-semibold'>
                      Earning:
                    </h1>
                    <span className='text-base'>
                      {item?.fee - item?.cost}{' '}
                      <span className='text-secondarydark'>/-</span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {viewCaseDetailsByID?.disposed === false ? (
        <>
          <form
            onSubmit={handleSubmit5(submitCaseFeesAndCost)}
            className='mb-20 px-8 pb-10'
          >
            <ThemeProvider theme={theme}>
              <div className='flex flex-col space-y-8'>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className='bg-lightSilver rounded text-white w-full'
                      disableToolbar
                      variant='inline'
                      inputVariant='outlined'
                      color='secondary'
                      format='MM/dd/yyyy'
                      label='Date'
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <FormControl className='w-full' error={errors5.addFees}>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Add Fees'
                      id='outlined-basic'
                      name='text'
                      variant='outlined'
                      color='secondary'
                      type='number'
                      {...register5('addFees', {
                        required: true,
                      })}
                    />
                    <FormHelperText>
                      {errors5.addFees?.type === 'required' &&
                        'Fees field can not be empty'}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <FormControl className='w-full' error={errors5.addCost}>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Add Cost'
                      id='outlined-basic'
                      name='text'
                      variant='outlined'
                      color='secondary'
                      type='number'
                      error={errors5.addCost}
                      {...register5('addCost', {
                        required: true,
                      })}
                    />
                    <FormHelperText>
                      {errors5.addCost?.type === 'required' &&
                        'Cost field can not be empty'}
                    </FormHelperText>
                  </FormControl>
                  <div className='w-full text-red-800 flex items-center justify-start space-x-1'>
                    <h1 className='text-primarydark font-bold'>Earning: </h1>
                    <span>
                      {realTimePrice === '' ? '0.00' : realTimePrice} /- Taka
                    </span>
                  </div>
                </div>
                <div className='flex justify-center items-center space-x-8'>
                  <button style={{ outline: 'none' }}>
                    <img src={addNow} alt='' />
                  </button>
                </div>
              </div>
            </ThemeProvider>
          </form>
        </>
      ) : (
        <>
          <div className='mb-10 px-8 flex flex-col items-center justify-center pb-10 space-y-8'>
            <div className='text-center flex flex-col items-center space-y-2 -mt-10'>
              <h1>This case has been disposed</h1>
              <h1 className='text-pink-900 font-bold text-2xl'>
                You can <span className='text-3xl text-deepdark'>reopen</span>{' '}
                the case if you want to...
              </h1>
            </div>
            <div className='w-full flex justify-center items-center space-x-6 pb-6'>
              <button
                style={{ outline: 'none' }}
                className='rounded-md border border-deepdark text-white text-sm font-semibold bg-deepdark h-11 w-48 capitalize'
                onClick={() => changeDisposeStatus()}
              >
                Confirm
              </button>
              <button
                style={{ outline: 'none' }}
                className='rounded-md border border-red-900 text-white text-sm font-semibold bg-red-900 h-11 w-48 capitalize'
                onClick={() => setUpdateFeesInfoModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
  // ==================================================================================
  // ------------------------ update fees and cost information ------------------------
  // ==================================================================================

  return (
    <>
      <div className='flex items-center justify-end space-x-4 h-10 -mt-16'>
        <button onClick={() => setAddCase(true)} style={{ outline: 'none' }}>
          <img src={addNewCase} alt='' />
        </button>
        <Link to='/dashboard/advocate/calendar' style={{ outline: 'none' }}>
          <img src={myCalendar} alt='' />
        </Link>
      </div>

      <MUIDataTable
        title={'Case List'}
        data={newCase}
        columns={columns}
        options={options}
      />
      <Modal
        open={addCase}
        onClose={() => setAddCase(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addNewCaseModal}
      </Modal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {showContactInfo}
      </Modal>
      <Modal
        open={openFirstFormModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {editCaseFirstForm}
      </Modal>
      <Modal
        open={openSecondFormModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {editCaseSecondForm}
      </Modal>
      <Modal
        open={openThirdFormModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {editCaseThirdForm}
      </Modal>
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
      </Modal>
      <Modal
        open={openViewHistory}
        onClose={() => setOpenViewHistory(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {viewHistoryModal}
      </Modal>
      <Modal
        open={updateCaseInfoModal}
        onClose={() => setUpdateCaseInfoModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateCaseInformation}
      </Modal>
      <Modal
        open={noNextDateOpen}
        onClose={() => setNoNextDateOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {caseNoNextDateModal}
      </Modal>
      <Modal
        open={openDisposed}
        onClose={() => setOpenDisposed(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {caseDisposedModal}
      </Modal>
      <Modal
        open={updateFeesInfoModal}
        onClose={() => setUpdateFeesInfoModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateFeesAndCostInfo}
      </Modal>
    </>
  );
};

export default AdvocateCasePageTableComponent;
