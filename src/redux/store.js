import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/auth/authSlice';
import GlobalSlice from './GlobalSlice';
import agentSlice from '../pages/Users/Agent/agentSlice';
import AdminSlice from '../pages/Users/Admin/AdminSlice';
import SpecificAdminViewSlice from '../pages/Users/Admin/Components/SpecificAdminViewSlice';
import KycVerificationSlice from '../pages/Verification/KycVerification/KycVerificationSlice';
import BankSlice from '../pages/PaymaartBanks/TrustBanks/BankSlice';
import merchantSlice from '../pages/Users/Merchants/merchantSlice';
import customerSlice from '../pages/Users/Customer/customerSlice';
import KYCProfileViewSlice from '../components/KYC/KYCView/KYCProfileViewSlice';
import DeleteAccountSlice from '../pages/Verification/DeleteAccount/DeleteAccountSlice';
import G2PSlice from '../pages/Financials/G2P/G2PSlice';
import G2PCustomerViewSlice from '../pages/Financials/G2P/G2PCustomerViewSlice';
import BankTransactionViewSlice from '../pages/PaymaartBanks/BankTransactionView/BankTransactionViewSlice';

export const store = configureStore({
    reducer: {
        globalData: GlobalSlice,
        auth: authSlice,
        agentUsers: agentSlice,
        adminUsers: AdminSlice,
        SpecificAdminView: SpecificAdminViewSlice,
        KYCProfileSpecificView: KYCProfileViewSlice,
        kycVerifications: KycVerificationSlice,
        bankAccounts: BankSlice,
        merchantUsers: merchantSlice,
        customerUsers: customerSlice,
        DeleteteAccount: DeleteAccountSlice,
        G2PList: G2PSlice,
        G2PCustomerView: G2PCustomerViewSlice,
        BankTransactionViewData: BankTransactionViewSlice
    }
});
