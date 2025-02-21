import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

export const handleUploadG2pSheet = async (file, path) => {
    const fileName = file.name;
    try {
        const result = await uploadData({
            key: `${path}/${uuidv4()}/${fileName}`,
            data: file,
            options: {
                contentType: file.type, // optional, automatically inferred if not provided,
                accessLevel: 'guest'// defaults to `guest` but can be 'private' | 'protected' | 'guest'
            }
        }).result;
        return result;
    } catch (error) {
        console.log('Error : ', error);
    }
};
