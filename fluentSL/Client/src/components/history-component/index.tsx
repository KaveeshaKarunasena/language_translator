import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import {IconButton} from '@mui/material'
import {useState,useEffect} from 'react'
// import ConfirmDialog from './ConfirmDialod';
import axios from 'axios'
import './index.css'

const StyledPaper = styled(Paper)(({theme}) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: 'black',
  '&:hover': {
    backgroundColor: '#C0EEE4'
  }
}))

const Index = () => {

  const [history,setHistory] = useState([])
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/userhistory/getHistory');
        const json = await response.json();
        

        if (response.ok) {
          setHistory(json);
        }
      } catch (err) {
        // const error = err.response.data.err;
        console.log(err)
      }
    };
    fetchDetails();
  }, []);

  const deleteDetails = async (id:any) => {
  //   setConfirmDialog({
  //     ...confirmDialog,
  //     isOpen: false
  // })
    await axios
      .delete(`http://localhost:3000/userhistory/deleteHistory/${id}`)
      .then(() => {
        const historyCopy = [...history];
        const filteredHistory = historyCopy.filter((item:any) => item._id !== id);
        setHistory(filteredHistory);
       
      })
     
  };

  return (
    <Box sx={{height: '88vh'}}>
      <Box sx={{px: 6}}>
        <h2 className="title">HISTORY</h2>
      </Box>
      {history && history.map( (data:any)=>(
      <Box sx={{flexGrow: 1, overflow: 'hidden', px: 2}}>
        <StyledPaper
          sx={{
            my: 3,
            mx: 'auto',
            p: 1
          }}
        >
         
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <IconButton aria-label="delete" color="error">
                <DeleteIcon onClick={() => {deleteDetails(data._id) }}/>
              </IconButton>
            </Grid>
            <Grid
              item
              xs
              zeroMinWidth
              container
              alignItems="center"
              justifyContent="center"
            >
              <Typography noWrap>{data.description}</Typography>
            </Grid>
          </Grid>
               
        </StyledPaper>
      </Box>
      ))}  
    </Box>
  )
}
export default Index
