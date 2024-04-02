export default function securityAnswersCheck (securityQuestions) {
    // Filter out questions with empty or undefined answers
    const answeredQuestions = securityQuestions.filter(question => question.answer && question.answer.trim() !== '');

    // Check if there are exactly three answered questions
    if (answeredQuestions.length < 3) {
        return false; // Error: Three answers not provided
    }

    return true; // All three answers provided
};
