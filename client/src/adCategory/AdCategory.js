/**
 * Created by kunee on 21/04/2019.
 */
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';

import {
    IconButton,
} from '@material-ui/core'


export default props => {
    const tileData = [
        {
            img: 'https://cdn.pixabay.com/photo/2015/06/08/14/46/piano-801707_1280.jpg',
            title: 'Piano',
            author: 'Alex'
        },
        {
            img: 'https://cdn.pixabay.com/photo/2018/11/09/08/10/board-3804006_1280.jpg',
            title: 'Math',
            author: 'Jules'
        },
        {
            img: 'https://cdn.pixabay.com/photo/2019/04/11/19/45/apple-4120453_1280.jpg',
            title: 'Cooking',
            author: 'Karen'
        }
    ];

    const {classes} = props;
    return (
        <>
        <GridList className={classes.gridList} cols={2.5}>
                           {tileData.map(tile => (
                               <GridListTile key={tile.img}>
                                   <img src={tile.img} alt={tile.title}/>
                                   <GridListTileBar
                                       title={tile.title}
                                       classes={{
                                           root: classes.titleBar,
                                           title: classes.title,
                                       }}
                                       actionIcon={
                                           <IconButton>
                                               <StarBorderIcon className={classes.title}/>
                                           </IconButton>
                                       }
                                   />
                               </GridListTile>
                           ))}
        </GridList>
        </>
    )

}