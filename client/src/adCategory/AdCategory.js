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
            img: 'https://cdn.pixabay.com/photo/2014/03/04/07/14/music-279332_1280.jpg',
            title: 'Piano',
            author: 'Alex'
        },
        {
            img: 'https://cdn.pixabay.com/photo/2018/11/09/08/10/board-3804006_1280.jpg',
            title: 'Math',
            author: 'Jules'
        },
        {
            img: 'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg',
            title: 'Cooking',
            author: 'Karen'
        }
    ];

    const handleSearch = (topic, city) => async() => {
        console.log(topic+' '+city);
        const resAd = await fetch(`/api/ads?location=${city}&topic=${topic}`);
        const ads = await resAd.json();

        const adsWithUser = ads.map(async ad => {
            const resUser = await fetch(`/api/users/${ad.user}`);
            const user = await resUser.json();
            ad.teacher = user;
            return ad;
        });

        Promise.all(adsWithUser).then(adsWithUserCompleted => {
            props.updateAds(adsWithUserCompleted);
            props.history.push({pathname: '/results'})
        });

    }


    const {classes, location} = props;
    return (
        <>
        <GridList className={classes.gridList} cols={2.5}>
                           {tileData.map(tile => (
                               <GridListTile key={tile.img}>
                                   <img src={tile.img} alt={tile.title}/>
                                   <GridListTileBar
                                       title={'Click here to see '+tile.title+' teachers in '+location}
                                       classes={{
                                           root: classes.titleBar,
                                           title: classes.title,
                                       }}
                                       actionIcon={
                                           <IconButton>
                                               <StarBorderIcon className={classes.title}/>
                                           </IconButton>
                                       }

                                       onClick={handleSearch(tile.title, location)}
                                   />
                               </GridListTile>
                           ))}
        </GridList>
        </>
    )

}