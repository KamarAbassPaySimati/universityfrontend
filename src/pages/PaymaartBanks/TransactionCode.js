/* eslint-disable max-len */
export function TransactionCode (value, type) {
    switch (value) {
    // PTBA1 mappings
    case 'Pay-in by Agent to PTBA1 | RM credit':
        return 'AGTCRPTBA1';
    case 'Pay-in by Standard Customer to PTBA1 | RM credit':
        return 'CSTCRPTBA1';
    case 'Pay-in by G2P Customer to PTBA1 | RM credit':
        return 'G2PCRPTBA1';
    case 'Pay-in by Paymaart OBO Agent to PTBA1 | RM credit':
        return 'PTCR1PTBA1';
    case 'Pay-in by Paymaart OBO Standard Customer to PTBA1 | RM credit':
        return 'PTCR2PTBA1';
    case 'Pay-in by Paymaart OBO G2P Customer to PTBA1 | RM credit':
        return 'PTCR3PTBA1';
    case 'Inflow For EM Float/other E-Funding to PTBA1 | RM credit':
        return 'PTCR4PTBA1';
    case 'Inflow for Marketing Campaign Fund to PTBA1 | RM credit':
        return 'PTCR5PTBA1';
    case 'Receipt of Customer Balances Interest from PTBA1 | RM credit':
        return 'PTINTPTBA1';
    case 'Pay-out to Agent from PTBA1 | RM debit':
        return 'AGTDRPTBA1';
    case 'Pay-out to Customer from PTBA1 | RM debit':
        return 'CSTDRPTBA1';
    case 'Settlement to Merchant from PTBA1 | RM debit':
        return 'MCTDRPTBA1';
    case 'Settlement to Merchant Biller from PTBA1 | RM debit':
        return 'MCBDRPTBA1';
    case 'Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT':
        return 'PTDR1PTBA1';
    case 'Charge for Bank Services or Transactions from PTBA1 | RM debit':
        return 'PTDR2PTBA1';

        // PTBA2 mappings
    case 'Pay-in by Agent to PTBA2 | RM credit':
        return 'AGTCRPTBA2';
    case 'Pay-in by Standard Customer to PTBA2 | RM credit':
        return 'CSTCRPTBA2';
    case 'Pay-in by G2P Customer to PTBA2 | RM credit':
        return 'G2PCRPTBA2';
    case 'Pay-in by Paymaart OBO Agent to PTBA2 | RM credit':
        return 'PTCR1PTBA2';
    case 'Pay-in by Paymaart OBO Standard Customer to PTBA2 | RM credit':
        return 'PTCR2PTBA2';
    case 'Pay-in by Paymaart OBO G2P Customer to PTBA2 | RM credit':
        return 'PTCR3PTBA2';
    case 'Inflow For EM Float/other E-Funding to PTBA2 | RM credit':
        return 'PTCR4PTBA2';
    case 'Inflow for Marketing Campaign Fund to PTBA2 | RM credit':
        return 'PTCR5PTBA2';
    case 'Receipt of Customer Balances Interest from PTBA2 | RM credit':
        return 'PTINTPTBA2';
    case 'Pay-out to Agent from PTBA2 | RM debit':
        return 'AGTDRPTBA2';
    case 'Pay-out to Customer from PTBA2 | RM debit':
        return 'CSTDRPTBA2';
    case 'Settlement to Merchant from PTBA2 | RM debit':
        return 'MCTDRPTBA2';
    case 'Settlement to Merchant Biller from PTBA2 | RM debit':
        return 'MCBDRPTBA2';
    case 'Outflow to Operations Account (Draw RM) from PTBA2 | RM debit':
        return 'PTDR1PTBA2';
    case 'Charge for Bank Services or Transactions by PTBA2 | RM debit':
        return 'PTDR2PTBA2';

        // PTBA3 mappings
    case 'Pay-in by Agent to PTBA3 | RM credit':
        return 'AGTCRPTBA3';
    case 'Pay-in by Standard Customer to PTBA3 | RM credit':
        return 'CSTCRPTBA3';
    case 'Pay-in by G2P Customer to PTBA3 | RM credit':
        return 'G2PCRPTBA3';
    case 'Pay-in by Paymaart OBO Agent to PTBA3 | RM credit':
        return 'PTCR1PTBA3';
    case 'Pay-in by Paymaart OBO Standard Customer to PTBA3 | RM credit':
        return 'PTCR2PTBA3';
    case 'Pay-in by Paymaart OBO G2P Customer to PTBA3 | RM credit':
        return 'PTCR3PTBA3';
    case 'Inflow For EM Float/other E-Funding to PTBA3 | RM credit':
        return 'PTCR4PTBA3';
    case 'Inflow for Marketing Campaign Fund to PTBA3 | RM credit':
        return 'PTCR5PTBA3';
    case 'Receipt of Customer Balances Interest from PTBA3 | RM credit':
        return 'PTINTPTBA3';
    case 'Pay-out to Agent from PTBA3 | RM debit':
        return 'AGTDRPTBA3';
    case 'Pay-out to Customer from PTBA3 | RM debit':
        return 'CSTDRPTBA3';
    case 'Settlement to Merchant from PTBA3 | RM debit':
        return 'MCTDRPTBA3';
    case 'Settlement to Merchant Biller from PTBA3 | RM debit':
        return 'MCBDRPTBA3';
    case 'Outflow to Operations Account (Draw RM) from PTBA3 | RM debit':
        return 'PTDR1PTBA3';
    case 'Charge for Bank Services or Transactions by PTBA3 | RM debit':
        return 'PTDR2PTBA3';
        // Transcation Fees and Commissions
        // Taxes
    case 'Balance EM Excess Return to Paymaart Main Capital Account for Float':
        if (type === 'taxes') {
            return 'PMTXCOUTFT';
        } else {
            return 'PMTFCOUTFT';
        }
    case 'Balance EM Excess Return to Paymaart Main Capital Account for Payout':
        if (type === 'taxes') {
            return 'PMTXPOUTRM';
        } else {
            return 'PMTFPOUTRM';
        }

        // Main Capital Settlement for Merchants
    case 'Settlement to Merchant Biller from PTBA1 | EM credit to PMCAT':
        return 'MCBDRPTBA1';
    case 'Settlement to Merchant Biller from PTBA2 | EM credit to PMCAT':
        return 'MCBDRPTBA2';
    case 'Settlement to Merchant Biller from PTBA3 | EM credit to PMCAT':
        return 'MCBDRPTBA3';

        // Main Capital charge for bank service
    case 'Inflow For EM Float/Funding for Transaction fee and Commission| EM credit to PMTF':
        return 'PTCR6PMCA1';

        // Main Capital charge for Operations for excess Float
    case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA1':
        return 'PTCASHOPT1';
    case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA2':
        return 'PTCASHOPT2';
    case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA3':
        return 'PTCASHOPT3';

    // suspense account transaction
    case 'Pay-out to Agent Post Deactivation from PTBA1 | EM credit to PMCAT':
    case 'Pay-out to Agent Post Deactivation from PTBA2 | EM credit to PMCAT':
    case 'Pay-out to Agent Post Deactivation from PTBA3 | EM credit to PMCAT':
    case 'Pay-out to Customer Post Deactivation from PTBA1 | EM credit to PMCAT':
    case 'Pay-out to Customer Post Deactivation from PTBA2 | EM credit to PMCAT':
    case 'Pay-out to Customer Post Deactivation from PTBA3 | EM credit to PMCAT':
        return 'PMSPPOUT02';
    case 'Pay-out to Agent Post Deletion from PTBA1 | EM credit to PMCAT':
    case 'Pay-out to Agent Post Deletion from PTBA2 | EM credit to PMCAT':
    case 'Pay-out to Agent Post Deletion from PTBA3 | EM credit to PMCAT':
    case 'Pay-out to Customer Post Deletion from PTBA1 | EM credit to PMCAT':
    case 'Pay-out to Customer Post Deletion from PTBA2 | EM credit to PMCAT':
    case 'Pay-out to Customer Post Deletion from PTBA3 | EM credit to PMCAT':
        return 'PMSPPOUT03';

    default:
        return '-';
    }
}

export function TransactionDescription (value, type, transactionType) {
    switch (value) {
    // PTBA1 mappings
    case 'AGTCRPTBA1':
        return `Pay-in by Agent to PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'RM credit'}`;
    case 'CSTCRPTBA1':
        return `Pay-in by Standard Customer to PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Standard Customer' : 'RM credit'}`;
    case 'G2PCRPTBA1':
        return `Pay-in by G2P Customer to PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Suspense Account' : 'RM credit'}`;
    case 'PTCR1PTBA1':
        return `Pay-in by Paymaart OBO Agent to PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'RM credit'}`;
    case 'PTCR2PTBA1':
        return `Pay-in by Paymaart OBO Standard Customer to PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Standard Customer' : 'RM credit'}`;
    case 'PTCR3PTBA1':
        return `Pay-in by Paymaart OBO G2P Customer to PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Suspense Account' : 'RM credit'}`;
    case 'PTCR4PTBA1':
        return `Inflow For EM Float/other E-Funding to PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'PTCR5PTBA1':
        return `Inflow for Marketing Campaign Fund to PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'PTINTPTBA1':
        return `Receipt of Customer Balances Interest from PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'AGTDRPTBA1':
        return 'Pay-out to Agent from PTBA1 | RM debit';
    case 'CSTDRPTBA1':
        return 'Pay-out to Customer from PTBA1 | RM debit';
    case 'MCTDRPTBA1':
        return 'Settlement to Merchant from PTBA1 | RM debit';
    case 'MCBDRPTBA1':
        if (type === 'main-capital') {
            return 'Settlement to Merchant Biller from PTBA1 | EM credit to PMCAT';
        }
        return 'Settlement to Merchant Biller from PTBA1 | RM debit';
    case 'PTDR1PTBA1':
        // return 'Outflow to Operations Account (Draw RM) from PTBA1 | RM debit';
        return 'Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT';
    case 'PTDR2PTBA1':
        return 'Charge for Bank Services or Transactions from PTBA1 | RM debit';

        // PTBA2 mappings
    case 'AGTCRPTBA2':
        return `Pay-in by Agent to PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'RM credit'}`;
    case 'CSTCRPTBA2':
        return `Pay-in by Standard Customer to PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Standard Customer' : 'RM credit'}`;
    case 'G2PCRPTBA2':
        return `Pay-in by G2P Customer to PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Suspense Account' : 'RM credit'}`;
    case 'PTCR1PTBA2':
        return `Pay-in by Paymaart OBO Agent to PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'RM credit'}`;
    case 'PTCR2PTBA2':
        return `Pay-in by Paymaart OBO Standard Customer to PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Standard Customer' : 'RM credit'}`;
    case 'PTCR3PTBA2':
        return `Pay-in by Paymaart OBO G2P Customer to PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Suspense Account' : 'RM credit'}`;
    case 'PTCR4PTBA2':
        return `Inflow For EM Float/other E-Funding to PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'PTCR5PTBA2':
        return `Inflow for Marketing Campaign Fund to PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'PTINTPTBA2':
        return `Receipt of Customer Balances Interest from PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'AGTDRPTBA2':
        return 'Pay-out to Agent from PTBA2 | RM debit';
    case 'CSTDRPTBA2':
        return 'Pay-out to Customer from PTBA2 | RM debit';
    case 'MCTDRPTBA2':
        return 'Settlement to Merchant from PTBA2 | RM debit';
    case 'MCBDRPTBA2':
        if (type === 'main-capital') {
            return 'Settlement to Merchant Biller from PTBA2 | EM credit to PMCAT';
        }
        return 'Settlement to Merchant Biller from PTBA2 | RM debit';
    case 'PTDR1PTBA2':
        // return 'Outflow to Operations Account (Draw RM) from PTBA2 | RM debit';
        return 'Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT';
    case 'PTDR2PTBA2':
        return 'Charge for Bank Services or Transactions by PTBA2 | RM debit';

        // PTBA3 mappings
    case 'AGTCRPTBA3':
        return `Pay-in by Agent to PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'RM credit'}`;
    case 'CSTCRPTBA3':
        return `Pay-in by Standard Customer to PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Standard Customer' : 'RM credit'}`;
    case 'G2PCRPTBA3':
        return `Pay-in by G2P Customer to PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Suspense Account' : 'RM credit'}`;
    case 'PTCR1PTBA3':
        return `Pay-in by Paymaart OBO Agent to PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'RM credit'}`;
    case 'PTCR2PTBA3':
        return `Pay-in by Paymaart OBO Standard Customer to PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Standard Customer' : 'RM credit'}`;
    case 'PTCR3PTBA3':
        return `Pay-in by Paymaart OBO G2P Customer to PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Suspense Account' : 'RM credit'}`;
    case 'PTCR4PTBA3':
        return `Inflow For EM Float/other E-Funding to PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'PTCR5PTBA3':
        return `Inflow for Marketing Campaign Fund to PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'PTINTPTBA3':
        return `Receipt of Customer Balances Interest from PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit PMCA Float' : 'RM credit'}`;
    case 'AGTDRPTBA3':
        return 'Pay-out to Agent from PTBA3 | RM debit';
    case 'CSTDRPTBA3':
        return 'Pay-out to Customer from PTBA3 | RM debit';
    case 'MCTDRPTBA3':
        return 'Settlement to Merchant from PTBA3 | RM debit';
    case 'MCBDRPTBA3':
        if (type === 'main-capital') {
            return 'Settlement to Merchant Biller from PTBA3 | EM credit to PMCAT';
        }
        return 'Settlement to Merchant Biller from PTBA3 | RM debit';
    case 'PTDR1PTBA3':
        // return 'Outflow to Operations Account (Draw RM) from PTBA3 | RM debit';
        return 'Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT';
    case 'PTDR2PTBA3':
        return 'Charge for Bank Services or Transactions by PTBA3 | RM debit';

        // Transcation Fees and Commissions
    case 'PMTFCOUTFT':
    case 'PMTXCOUTFT':
        return 'Balance EM Excess Return to Paymaart Main Capital Account for Float';
    case 'PMTFPOUTRM':
    case 'PMTXPOUTRM' :
        return 'Balance EM Excess Return to Paymaart Main Capital Account for Payout';

        // Main Capital charge for bank service
    case 'PTCR6PMCA1':
        return 'Inflow For EM Float/Funding for Transaction fee and Commission| EM credit to PMTF';
    case 'PTCASHOPT1':
        return 'Payout to Paymaart Operations for excess Float in PMCA to PTBA1';
    case 'PTCASHOPT2':
        return 'Payout to Paymaart Operations for excess Float in PMCA to PTBA2';
    case 'PTCASHOPT3':
        return 'Payout to Paymaart Operations for excess Float in PMCA to PTBA3';
        // suspense account transaction
    case 'PMSPPOUT02AGTPTBA1':
        return `Pay-out to Agent Post Deactivation from PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT02AGTPTBA2':
        return `Pay-out to Agent Post Deactivation from PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT02AGTPTBA3':
        return `Pay-out to Agent Post Deactivation from PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT02CMRPTBA1':
        return `Pay-out to Customer Post Deactivation from PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Customer' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT02CMRPTBA2':
        return `Pay-out to Customer Post Deactivation from PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Customer' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT02CMRPTBA3':
        return `Pay-out to Customer Post Deactivation from PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Customer' : 'EM credit to PMCAT'}`;

    case 'PMSPPOUT03AGTPTBA1':
        return `Pay-out to Agent Post Deletion from PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT03AGTPTBA2':
        return `Pay-out to Agent Post Deletion from PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT03AGTPTBA3':
        return `Pay-out to Agent Post Deletion from PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Agent' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT03CMRPTBA1':
        return `Pay-out to Customer Post Deletion from PTBA1 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Customer' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT03CMRPTBA2':
        return `Pay-out to Customer Post Deletion from PTBA2 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Customer' : 'EM credit to PMCAT'}`;
    case 'PMSPPOUT03CMRPTBA3':
        return `Pay-out to Customer Post Deletion from PTBA3 | ${type === 'main-capital' ? transactionType !== 'CR' ? transactionType : 'Credit Customer' : 'EM credit to PMCAT'}`;

    case 'PMMS1':
        return 'Membership | Prepaid, 30 Days';
    case 'PMMS2':
        return 'Membership | Prepaid, 91 Days';
    case 'PMCN1':
        return 'Cash-in | Via Paymaart Agent';
    case 'PMCU1':
        return 'Cash-out | Via Paymaart Agent';
    case 'PMPP1':
        return 'Pay Person | To Paymaart member';
    case 'PMPP3':
        return 'Pay Person | To Un-registered user';
    case 'PMPM1':
        return 'Pay Afrimax | For Mobile Data, Devices; Services';
    case 'PMPM2':
        return 'Pay Paymaart | For Membership services';
    case 'PMPM3':
        return 'Pay Merchant | For Goods; Services';
    case 'PMPG1':
        return 'Pay via Agent | To Un-registered user';
    case 'PMPG2':
        return 'Pay via Agent | For Afrimax; Paymaart';
    case 'PMPG3':
        return 'Pay via Agent | For Merchant';
    case 'PMMS1C':
        return 'Membership Go | Prepaid, 30 Days';
    case 'PMMS1A':
    case 'PMMS1B':
        return 'Membership Prime, PrimeX | Prepaid, 30 Days';
    case 'PMCC1':
        return 'Micro-merchant service, 30 Days';
    case 'PMCC3':
        return 'Standard merchant service';
    case 'PMCU4':
        return 'Cash-out | Paymaart Agent, Un-registered user';
    case 'G2PCRPTBA':
        return 'Pay-in by G2P Customer to Beneficiary | EM credit';
    case 'G2PCRPMSP':
        return 'Reverse to  G2P Customer from , PMSP | EM credit';
    case 'PMSPPOUT':
        return 'Balance RM Payout to Beneficiary on Paymaart Account Deactivation/Deletion';
    case 'PMSPRTPM':
        return 'Balance EM Return to Paymaart User on Account Reactivation';
    default:
        return '-';
    }
}
