export function TransactionCode (value) {
    console.log('filedData.transaction_code', value);
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
    case 'Outflow to Operations Account (Draw RM) from PTBA1 | RM debit':
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

    default:
        return 'Invalid description';
    }
}
