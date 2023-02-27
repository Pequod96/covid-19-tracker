import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './InfoBox.css';

const Infobox = ({ title, cases, isGreen, total}) => {
    
    return (
        <Card className={`infobox-cases ${"infobox-cases"}`}>
            <CardContent>
                <Typography
                className='infobox-title'
                color="textSecondary">
                {title}</Typography>
                <h2 className={`infobox-cases ${isGreen && "infobox-cases--green"}`}>{cases}</h2>
                <Typography
                className='infobox-total'
                color= "textSecondary">
                {total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox;