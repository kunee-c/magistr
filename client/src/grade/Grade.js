/**
 * Created by kunee on 04/05/2019.
 */
import React from 'react';
import Star from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';
import StarBorder from '@material-ui/icons/StarBorder';

export default props => {

    const {reviews} = props;
    const stars = [];

    const nbReview = reviews.length;
    const nbStar = reviews.map(review => review.grade).reduce((a, b) => a + b);

    const avgGrade = nbStar / nbReview;
    const grade = Math.round(avgGrade * 2) / 2;



    console.log(grade);

    for (let i = 0; i < grade; i++) {

        console.log(grade+' '+i);
        if (i +1 > grade)
            Number.isInteger(grade) ? stars.push(<Star/>) : stars.push(<StarHalf/>);
        else
            stars.push(<Star/>);
    }

    for(let i=Math.ceil(grade); i <4; i++) {
        stars.push(<StarBorder/>);
    }


    return (<>
    {stars}
    </>)
}