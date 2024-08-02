import { uploadData, remove } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

export const handleUpload = async (file, path) => {
    const fileName = file.name.split('.')[0].slice(-15) + '.' + file.name.split('.')[file.name.split('.').length - 1];
    try {
        const result = await uploadData({
            key: `${path}/${uuidv4()}/${fileName}`,
            data: file,
            options: {
                contentType: file.type, // optional, automatically inferred if not provided,
                accessLevel: 'guest'// defaults to `guest` but can be 'private' | 'protected' | 'guest'
            }
        }).result;
        console.log(result, 'result');
        return result;
    } catch (error) {
        console.log('Error : ', error);
    }
};

export const handleUploadBase64 = async (base64String, path, contentType) => {
    try {
        const result = await uploadData({
            key: `${path}/${uuidv4()}/transaction-details`,
            data: base64String,
            options: {
                contentEncoding: 'base64',
                contentType, // optional, automatically inferred if not provided,
                accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
            }
        }).result;
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
