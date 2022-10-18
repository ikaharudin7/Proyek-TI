import * as React from 'react';
import Grid from '@mui/material/Grid'
import MediaCard from './Card.js'


export default function CollectionGrid({filteredCards}) {
    
    return (    
        <>
        <Grid container spacing = {4} sx = {{justifyContent: 'center'}}>
            {filteredCards.map((card) => (
                <Grid item key={card.date} >
                    <MediaCard card = {card} />
                </Grid>
            ))}
        </Grid>
        </>

    )
}
