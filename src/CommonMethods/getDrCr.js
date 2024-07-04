import { formattedAmount } from './formattedAmount';

export default function getDrCr (value) {
    let givenValue = value.toString();
    const absValue = Math.abs(value).toString();
    if (givenValue.substring(0, 1) === '-') {
        givenValue = `${formattedAmount(absValue)} DR`;
    } else {
        givenValue = `${formattedAmount(absValue)} CR`;
    }
    return givenValue;
};
