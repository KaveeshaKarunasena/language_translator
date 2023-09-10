import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import {IconButton} from '@mui/material'
import {useState,useEffect} from 'react'
import './index.css'

const StyledPaper = styled(Paper)(({theme}) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: 'white',
  '&:hover': {
    backgroundColor: '#102C57'
  }
}))

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `

const Index = () => {

  const [history,setHistory] = useState([])

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
                <DeleteIcon />
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
