import React from 'react';
import Typography from "@material-ui/core/Typography";

const MessageBlock = (props) => {

    const styles = {
        img: {
            width: '50px',
            height: '50px',
            borderRadius: '50%'
        },
        bot: {
            fontStyle: 'italic',
            opacity: 0.5
        },
        msgText: {
            paddingLeft: props.avatar ? 60 : 0,
        },
        alignCenter: {
            margin: '10px 0',
            paddingLeft: props.avatar ? 10 : 0
        }
    }

    return (
        <Typography component={'div'} style={props.avatar ? {} : styles.bot} paragraph>
            <Typography component={'div'} color='textSecondary'
                        variant='subtitle1'
                        style={{
                            display: "flex",
                            alignItems: 'center',
                            margin: 'auto'
                        }}
            >
                {
                    props?.avatar ?
                        <img src={props.avatar}
                             alt={`${props.userName} avatar`}
                             style={styles.img}
                        /> : null
                }
                <div style={styles.alignCenter}><b>{props.userName}</b>
                    <i> {props.time}</i>:
                </div>
            </Typography>
            <Typography style={styles.msgText}>
                {props.text}
            </Typography>
        </Typography>
    );
};

export default MessageBlock;
