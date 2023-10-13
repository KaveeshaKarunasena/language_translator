import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
}));

interface AppProps {
  email: any;
}

export default function AvatarComponent({ user }) {
  return (
    // <Stack direction="row" spacing={1} style={{marginLeft:'9px'}}>
    //   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 25, height: 25 }}/>
    //   <h4 style={{color:'white'}}>kaveeshakarunasena@gmail.com</h4>
    // </Stack>
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
      <StyledPaper
        sx={{
          my: 3,
          mx: 'auto',
          p: 1,
        }}
      >
        <Grid container wrap="nowrap" spacing={1}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 25, height: 25 }}
            />
          </Grid>
          <Grid
            item
            xs
            zeroMinWidth
            container
            alignItems="center"
            justifyContent="center"
          >
            <Typography noWrap style={{ color: 'white' }}>
              {user.email}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}
