import React from 'react';
import Typography from "@material-ui/core/Typography";

const MessageBlock = (props) => {
    return (
        <Typography component={'div'} paragraph >
            <Typography color='textSecondary'
                        variant='subtitle1'
                        style={{paddingTop: '15px'}}
            >
                <b>{props.props.userName}</b> {props.props.time}:
            </Typography>
            <Typography>
                    {props.props.text}
            </Typography>
        </Typography>
    );
};

export default MessageBlock;
