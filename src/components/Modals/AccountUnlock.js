import { dataService } from '../../services/data.services';

export const handleAnswerSubmit = async (body,
    setToastError, setIsUnlockMerchnat, setPrevAppearedQuestion, setQuestion, setCorrectAttemptCount) => {
    try {
        // setIsLoading(true);
        const response = await dataService.PostAPI('admin-users/unlock-user', body);
        // setToastError('Something went wrong!');

        if (!response.error) {
            setPrevAppearedQuestion((prev) => (Array.isArray(prev) ? [...prev, response.data.id] : [response.data.id]));

            const obj = {
                question: response.data.question,
                answerType: response.data.type,
                questionId: response.data.id
            };
            setQuestion(obj);
            console.log('objobjobj', obj);
            if (response.data.correct_attempts !== 0) {
                setCorrectAttemptCount(response.data.correct_attempts);
            }
            if (setIsUnlockMerchnat) {
                setIsUnlockMerchnat(true);
            }
        } else {
            console.log('Error:', response);
            setToastError(response.data.data.message);
        }
    } catch (error) {
        console.error('Error:', error.data);
        setToastError('Something went wrong!');
        // handleClose();
    } finally {
        // setIsLoading(false);
    }
};
