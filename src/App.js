import './App.css';
import axios from './axios';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      justifyContent:"center",
      display:'flex',
    },
  },
}));

const App = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const classes = useStyles();

    const handleChange = (e, value) => {        
        console.log(value);
        setPage(value);
    }

    useEffect(() => {        
        axios.get(`/api/users?page=${page}`).then(res => {
            setData(res?.data?.data);
            setTotal(res.data.total_pages);
        }).catch(err => {
            console.error(err);
        });
    }, [page]);

    return (
        <div className="container">
            <div className="list-table">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Profile</TableCell>
                                <TableCell align="center">First&nbsp;Name</TableCell>
                                <TableCell align="center">Last&nbsp;Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                data.map(person => (
                                    <TableRow key={person.id}>
                                        <TableCell align="center">{person.id}</TableCell>
                                        <TableCell align="center">
                                            <div className="user-img">
                                                <Avatar src={person.avatar} alt='user-img' />
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">{person.first_name}</TableCell>
                                        <TableCell align="center">{person.last_name}</TableCell>
                                        <TableCell align="center">{person.email}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
            <div className={classes.root}>                
                <Pagination count={total} size="large" onChange={handleChange} />
            </div>
        </div>
    )
}

export default App
