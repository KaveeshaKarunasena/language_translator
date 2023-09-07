import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './index.css'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: 'white',
  "&:hover": {
    backgroundColor: '#102C57'
    }
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

const Index =() => {
  return (
    <>
    <Box>
        <h2 className='title'>HISTORY</h2>
    </Box>
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2 }} >
      <StyledPaper
        sx={{
          my: 3,
          mx: 'auto',
          p: 2,
      
        }}
      >
        <Grid container wrap="nowrap" spacing={2} >
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper
        sx={{
          my: 3,
          mx: 'auto',
          p: 2,
      
        }}
      >
        <Grid container wrap="nowrap" spacing={2} >
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper
        sx={{
          my: 3,
          mx: 'auto',
          p: 2,
    
        }}
      >
        <Grid container wrap="nowrap" spacing={2} >
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>

    </Box>
    </>
  );
}
export default Index;