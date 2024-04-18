import { uploadData, remove } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

export const handleUpload = async (file, path) => {
    try {
        const result = await uploadData({
            key: `${path}/${uuidv4()}-${file.name}`,
            data: file,
            options: {
                contentType: file.type, // optional, automatically inferred if not provided,
                accessLevel: 'guest'// defaults to `guest` but can be 'private' | 'protected' | 'guest'
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
