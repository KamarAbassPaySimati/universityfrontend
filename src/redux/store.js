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

export const store = configureStore({
    reducer: {
        globalData: GlobalSlice,
        auth: authSlice,
        agentUsers: agentSlice,
        adminUsers: AdminSlice,
        SpecificAdminView: SpecificAdminViewSlice,
        kycVerifications: KycVerificationSlice,
        bankAccounts: BankSlice,
        merchantUsers: merchantSlice,
        customerUsers: customerSlice
    }
});
