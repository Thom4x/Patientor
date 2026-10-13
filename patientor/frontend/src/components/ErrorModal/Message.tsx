import { MessageError } from '../../types';
import { Alert } from '@mui/material';

const Message = ({ error, type }: MessageError) => {

    if (!error) {
        return null;
    }

    return (
        <div>
            <Alert severity={type === 'success' ? 'success' : 'error'}>{error}</Alert>
        </div>
    );
};

export default Message;
