import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userList, deleteUser } from "../actions/userActions";
import Loader from "../components/Loader";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  IconButton,
} from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red, green,blue } from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const { users, loading } = useSelector((state) => state.userList);
  const navigation = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const {success:successDelete } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        dispatch(userList());
    }else{
       navigation('/'); 
    }
  }, [dispatch,successDelete]);

  const deleteUserHandler =(id)=>{
      if(window.confirm('Are you sure you want to delete')){
        dispatch(deleteUser(id));
      }
  }

  return (
    <div style={{textAlign:"center"}}>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : (
          <TableContainer style={{border:"2px solid black"}}>
    <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>NAME</strong></TableCell>
              <TableCell><strong>EMAIL</strong></TableCell>
              <TableCell><strong>ADMIN</strong></TableCell>
              <TableCell><strong></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <CheckIcon sx={{ color: green[500] }} />
                  ) : (
                    <CancelIcon sx={{ color: red[500] }} />
                  )}
                </TableCell>
                <TableCell> 
                    <IconButton href={`/admin/user/${user._id}/edit`}>
                    <EditIcon style={{color:"blue"}}/>
                    </IconButton>
                    <IconButton onClick={()=> deleteUserHandler(user._id)}>
                    <DeleteForeverIcon style={{color:"red"}}/>
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    
          </TableContainer>
      )}
    </div>
  );
};

export default UserListScreen;
