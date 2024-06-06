/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SpecificView } from '../SpecificAdminViewSlice';
import CardHeader from '../../../../../components/CardHeader';
import ProfileName from '../../../../../components/ProfileName/ProfileName';
import ViewDetail from '../../../../../components/ViewDeatilComponent/ViewDeatil';
import Modal from 'react-responsive-modal';
import ConfirmationPopup from '../../../../../components/ConfirmationPopup/ConfirmationPopup';
import GlobalContext from '../../../../../components/Context/GlobalContext';

import { dataService } from '../../../../../services/data.services';
import { endpoints } from '../../../../../services/endpoints';

export default function SpecificAdminView () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { View, userDetails, loading } = useSelector(state => state.SpecificAdminView); // to get the api respons
    const [isModalOpen, setModalOpen] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const { adminActivateDeactivate } = endpoints;
    const { user } = useSelector((state) => state.auth);
    const { paymaart_id: PaymaartId } = user;

    const getAdminView = () => {
        try {
            dispatch(SpecificView(id));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getAdminView();
    }, []);
    console.log(View, 'adminView');

    // on tap of activate/deactivate button
    const handleStatusClick = () => {
        setModalOpen(true);
    };
    const handleClose = () => {
        setModalOpen(false);
    };
    const handleConfirmAction = async () => {
        try {
            setIsLoading(true);
            const response = await dataService.PatchAPI(`admin-users/${adminActivateDeactivate}`,
                { username: userDetails?.Email, status: View.status === 'active' ? 'false' : 'true' });
            if (!response.error) {
                setIsLoading(false);
                setModalOpen(false);
                getAdminView();
                setToastSuccess(`Admin user ${View.status === 'active' ? 'deactivated' : 'activated'} successfully`);
            } else {
                setIsLoading(false);
                setModalOpen(false);
                setToastError('Something went wrong!');
            }
        } catch (error) {
            setIsLoading(false);
            setModalOpen(false);
            setToastError('Something went wrong!');
        }
    };
    return (
        <>
            <CardHeader
                activePath='Admin Profile'
                paths={['Users', 'Admins']}
                pathurls={['users/admins']}
                header='Admin Profile'
                minHeightRequired={true}
                updateButton={loading || 'Update'}
                updateButtonPath={`/users/admins/update-admin/${id}`}
                statusButton={PaymaartId === View?.paymaart_id ? undefined : loading || (View?.status !== 'active' ? 'Activate' : 'Deactivate')}
                ChildrenElement
                onHandleStatusChange={handleStatusClick}
            >
                {<>
                    <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <div className='flex justify-between items-center'>
                            <ProfileName
                                userButtonName={`${View?.first_name?.[0] || ''}${View?.middle_name?.[0] || ''}${View?.last_name?.[0] || ''}`}
                                UserName={`${View?.first_name || '-'} ${View?.middle_name || '-'} ${View?.last_name?.toUpperCase() || '-'}`}
                                payMaartID={View?.paymaart_id}
                                loading={loading}
                            />
                            <span className={`py-[2px] px-[10px] text-[13px] font-semibold capitalize 
                                 ${View?.status === 'active'
            ? 'bg-[#ECFDF5] text-accent-positive'
            : 'bg-neutral-grey text-neutral-secondary'}`}>
                                {View?.status}
                            </span>
                        </div>
                    </div>
                    <div data-testid="view_admin" className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <h1 className='text-[#4F5962] font-semibold text-[18px] leading-[26px] my-2'>
                            Basic Details
                        </h1>
                        <div className='w-full flex flex-wrap mt-1 -mx-1'>
                            {loading
                                ? ([...Array(5)].map((_, ind) => (
                                    <div className='w-1/3 px-1'>
                                        <ViewDetail
                                            itemkey='Loading...'
                                            userDetails='Loading...'
                                            loading={loading}
                                        />
                                    </div>
                                )))
                                : (Object.keys(userDetails).map((itemkey, index = 0) => (
                                    <div key={index} className='w-1/3 px-1'>
                                        <ViewDetail
                                            itemkey={itemkey.replaceAll('_', ' ')}
                                            userDetails={userDetails[itemkey]}
                                            loading={loading}
                                        />
                                    </div>)
                                ))}
                        </div>
                    </div>
                </>}
            </CardHeader>
            <Modal center open={isModalOpen} onClose={handleClose} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={`Confirm to ${View?.status === 'active' ? 'Deactivate' : 'Activate'}?`}
                        message={`${View?.status === 'active' ? 'This action will suspend Admin user\'s account' : 'This action will activate Admin user\'s account'}`}
                        handleSubmit={handleConfirmAction}
                        isLoading={isLoading}
                        handleClose={handleClose}
                        buttonColor={`${View?.status === 'active' ? 'bg-primary-negative' : 'bg-accent-positive'}`}
                    />
                </div>
            </Modal>
        </>

    );
}
