import { dataService } from '../../services/data.services';

export const handleAnswerSubmit = async (body,
    setToastError, setIsUnlock, setPrevAppearedQuestion, setQuestion, setIsResetLink) => {
    try {
        const response = await dataService.PostAPI('admin-users/unlock-user', body);
        if (!response.error) {
            setPrevAppearedQuestion((prev) => (Array.isArray(prev) ? [...prev, response.data.id] : [response.data.id]));

            const obj = {
                question: response.data.question,
                answerType: response.data.type,
                questionId: response.data.id
            };
            setQuestion(obj);
            if (response.data.is_verified) {
                setIsResetLink(true);
            }
            if (setIsUnlock) {
                setIsUnlock(true);
            }
        } else {
            setIsUnlock(false);
            setToastError(response.data.data.message);
        }
    } catch (error) {
        setIsUnlock(false);
        console.error('Error:', error);
        setToastError('Something went wrong!');
    }
};
