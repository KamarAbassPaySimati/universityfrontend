import { uploadData, remove } from 'aws-amplify/storage';

export const handleUpload = async (file) => {
    console.log('file', file);
    try {
        const result = await uploadData({
            key: file.name,
            data: file,
            options: {
                accessLevel: 'private'// defaults to `guest` but can be 'private' | 'protected' | 'guest'
            }
        }).result;
        console.log('Succeeded: ', result);
        return result;
    } catch (error) {
        console.log('Error : ', error);
    }
};

export const handleDelete = async (filename) => {
    try {
        await remove({ key: filename });
    } catch (error) {
        console.log('Error ', error);
    }
};
