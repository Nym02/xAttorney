import editIcon from '@iconify-icons/akar-icons/edit';
import eyeIcon from '@iconify-icons/akar-icons/eye';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import clockCircleOutlined from '@iconify-icons/ant-design/clock-circle-outlined';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import { Button, Modal } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import addClient from '../../../../assets/images/addClient.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';

const AdvocateClientPageTableComp = () => {
  const { client, setClient } = useContext(DataContext);
  const [clientId, setClientId] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const { addToast } = useToasts();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setClientId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // -------------------------------- delete bar council data --------------------------------
  const deleteClient = () => {
    const onSuccessDeleteClient = () => {
      AdvocateApiHelper.advClient
        .getClient()
        .then(res => {
          setClient(res?.data?.data?.getClientList?.data?.clientList);
          addToast('Client data has been deleted Succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteClient = error => {
      // console.log(error);
    };

    AdvocateApiHelper.advClient
      .deleteClient(clientId)
      .then(onSuccessDeleteClient)
      .catch(onErrorDeleteClient);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  // console.log(client);

  const newClientData = [];
  client.map((item, idx) => {
    newClientData.push({
      sl: idx + 1,
      clientName: item?.name,
      clientPhone: item?.phoneList[0],
      clientAddress: item?.address?.streetAddress,
      id: item?.id,
    });
  });

  const columns = [
    {
      name: 'sl',
      label: 'Sl No.',
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
      },
    },
    {
      name: 'clientPhone',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: '',
    //   label: 'Total Case',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   name: '',
    //   label: 'Schedule Date',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: 'clientAddress',
      label: 'Address',
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: 'clientDescription',
    //   label: 'Description',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <div>
              <Button
                style={{ outline: 'none' }}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={event => handleClick(event, value)}
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
                {/* <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={clockCircleOutlined} />
                  <span>Renwew</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={eyeIcon} />
                  <span>View</span>
                </MenuItem> */}
                <MenuItem
                  className='flex justify-start items-center'
                  // onClick={() => alert(clientId)}
                >
                  <Link
                    // to={`/dashboard/advocate/client/update-client/${clientId}`}
                    onClick={() =>
                      window.location.replace(
                        `/dashboard/advocate/client/update-client/${clientId}`
                      )
                    }
                    className='flex space-x-2 items-center'
                  >
                    <Icon icon={editIcon} />
                    <span>Edit</span>
                  </Link>
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

  // -------------------------------- delete modal --------------------------------
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
          onClick={() => deleteClient()}
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

  return (
    <>
      <div className='flex items-center justify-end h-10 -mt-16'>
        <Link
          to='/dashboard/advocate/client/add-new-client'
          style={{ outline: 'none' }}
        >
          <img src={addClient} alt='' />
        </Link>
      </div>

      <MUIDataTable
        title={'Client List'}
        data={newClientData}
        columns={columns}
        options={options}
      />

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
      </Modal>
    </>
  );
};

export default AdvocateClientPageTableComp;
