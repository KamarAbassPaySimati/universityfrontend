import React from 'react';
import BankViewTopHeader from './BankViewTopHeader';
import CardHeader from '../../../components/CardHeader';
import BankDetails from './BankDetails';
import TransactionList from './TransactionList';

export default function BankTransactionView ({ type }) {
    return (
        <div>
            <CardHeader
                activePath='Transaction Details'
                paths={['Paymaart Banks', 'Trust Banks']}
                pathurls={[`paymaart-banks?type=${type}`]}
                minHeightRequired={true}
                // buttonText={isEditing ? '' : 'Update'}
                // onClickButtonFunction={handleUpdateClick}
                UpdateIcon={true}
                navigationPath=''
                table={true}
                // headerWithoutButton={isEditing}
                ChildrenElement
            >
                <BankViewTopHeader Name={'Trust Bank'}/>
                <BankDetails bankDetails={
                    {
                        'Ref No.': 'PTBA1',
                        Name: 'National Bank',
                        'Account Number': '1006171539',
                        Purpose: 'Paymaart Trust Account 1',
                        'Last Update Date / Time': '21 Mar 2024, 22:00 hours',
                        Balance: '2,500,000.00 MWK'
                    }
                }/>
                <TransactionList />
            </CardHeader>
        </div>
    );
}
