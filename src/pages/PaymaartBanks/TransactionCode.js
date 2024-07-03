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
    case 'Outflow for excess Float withdrawal from PMCA, PTBA1 | EM credit to PMCAT':
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
    default:
        return 'Invalid description';
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
        return 'Settlement to Merchant Biller from PTBA1 | RM debit';
    case 'PTDR1PTBA1':
        // return 'Outflow to Operations Account (Draw RM) from PTBA1 | RM debit';
        return 'Outflow for excess Float withdrawal from <PTBA1>, PTBA1 | EM credit to PMCAT';
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
        return 'Settlement to Merchant Biller from PTBA2 | RM debit';
    case 'PTDR1PTBA2':
        // return 'Outflow to Operations Account (Draw RM) from PTBA2 | RM debit';
        return 'Outflow for excess Float withdrawal from PMCA, PTBA2 | EM credit to PMCAT';
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
        return 'Settlement to Merchant Biller from PTBA3 | RM debit';
    case 'PTDR1PTBA3':
        // return 'Outflow to Operations Account (Draw RM) from PTBA3 | RM debit';
        return 'Outflow for excess Float withdrawal from PMCA, PTBA3 | EM credit to PMCAT';
    case 'PTDR2PTBA3':
        return 'Charge for Bank Services or Transactions by PTBA3 | RM debit';

        // Transcation Fees and Commissions
    case 'PMTFCOUTFT':
        return 'Balance EM Excess Return to Paymaart Main Capital Account for Float';
    case 'PMTFPOUTRM':
        return 'Balance EM Excess Return to Paymaart Main Capital Account for Payout';

    default:
        return 'Invalid transaction code';
    }
}
