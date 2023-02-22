import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import NewsCard from '../NewsCard/NewsCard.js';
import useStyles from './styles.js';
import Navbar from '../Navbar/Navbar.js';



const NewsCards = ({ articles }) => {
  const classes = useStyles();

  

  return (
    <>
    <Navbar/>
   <h2 style={{paddingLeft:"65px"}}>Featured Articles</h2>
    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={2}>
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard  i={i} article={article} />
          </Grid>
        ))} 
         
      </Grid>
    </Grow>
    </>
  );
};

export default NewsCards;
