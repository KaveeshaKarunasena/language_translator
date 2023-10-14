import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import ConfirmDialog from '../history-component/avatar-component/confirmDialog';
import axios from 'axios';
import './index.css';
import { AuthContext } from '../../auth/AuthProvider';
import jwt_decode from 'jwt-decode';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import AlertDialog from './avatar-component/alertBox';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: 'black',
  '&:hover': {
    backgroundColor: '#4B8673  ',
  },
}));

const Index = () => {
  const [user, setUser] = React.useState({});

  let authPayload = React.useContext(AuthContext);
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);

  const token = data.token;
  const headers = { Authorization: 'Bearer ' + token };

  const decoded = jwt_decode(token);
  const decodedId = decoded.id;

  console.log(decodedId);

  const [history, setHistory] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const [confirmAlert, setConfirmAlert] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/userhistory/getHistoryByUser/${decodedId}`,
          { headers },
        );
        const json = await response.json();

        if (response.ok) {
          setHistory(json);
        }
      } catch (err) {
        // const error = err.response.data.err;
        console.log(err);
      }
    };
    fetchDetails();
  }, [history]);

  const deleteDetails = async (id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await axios
      .delete(`http://localhost:3000/userhistory/deleteHistory/${id}`, {
        headers,
      })
      .then(() => {
        const historyCopy = [...history];
        const filteredHistory = historyCopy.filter(
          (item: any) => item._id !== id,
        );
        setHistory(filteredHistory);
      });
  };

  const handleClickOpen = (title: any, description: any) => {
    setConfirmAlert({
      isOpen: true,
      title: title,
      subTitle: description,
    });
  };

  return (
    <Box>
      <Scrollbars style={{ width: '100%', height: '88vh' }}>
        <Box sx={{ height: '88vh' }}>
          <Box sx={{ px: 6 }}>
            <h2 className="title">HISTORY</h2>
          </Box>
          {history &&
            history.map((data: any) => (
              <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2 }}>
                <StyledPaper
                  sx={{
                    my: 3,
                    mx: 'auto',
                    p: 1,
                  }}
                >
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <IconButton aria-label="delete" color="error">
                        <DeleteIcon
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: 'Are you sure to delete this record?',
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                deleteDetails(data._id);
                              },
                            });
                          }}
                        />
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
                      <a
                        onClick={() =>
                          handleClickOpen(data.title, data.description)
                        }
                        style={{ color: 'black' }}
                      >
                        <Typography noWrap>{data.title}</Typography>
                      </a>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </Box>
            ))}
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          <AlertDialog
            confirmAlert={confirmAlert}
            setConfirmAlert={setConfirmAlert}
          />
        </Box>
      </Scrollbars>
    </Box>
  );
};
export default Index;
