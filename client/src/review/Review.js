/**
 * Created by kunee on 04/05/2019.
 */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Star from '@material-ui/icons/Star';


export default props => {
    const {review} = props;
    let stars = [];
    for(let i = 0; i < review.grade; i++) {
        stars.push(<Star/>)
    }
    return (<ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="picture"
                        src={review.author.picture}/>
            </ListItemAvatar>
            <ListItemText
                primary={stars}
                secondary={
                    <React.Fragment>
                        <Typography component="span" style={{display: "inline"}}
                                    color="textPrimary">
                            {review.author.firstName} -
                        </Typography>
                        {review.comment}
                    </React.Fragment>
                }
            />
        </ListItem>)
}