import React , { useEffect , useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Grid} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment';

/* --------- Components --------- */
import LoaderSpinner from '../../../Components/Loader/loader_spinner';

/* ------------ Actions ----------- */
import {
    getTasks,
    deleteTask
} from '../../../Actions/user_actions';

/*------- connect react with redux --------*/
import { connect } from 'react-redux';



const TasksContainer = (props) => {


//run only once
useEffect(()=>{
  console.log('gettasks')
  props.dispatch(getTasks()); 
},[])

console.log(props);


  const deleteTaskFunc = (id) => {
    props.dispatch(deleteTask(id));
  }
  console.log(props.data.deleteResponse)

  //deleteTaskFrom Array 
  if(props.data.deleteResponse !== undefined && props.data.fetchResponse !== undefined){
    if(props.data.deleteResponse.fetchedData !== undefined && props.data.fetchResponse.fetchedData !== undefined){
      if(props.data.deleteResponse.fetchedData.result !== undefined && props.data.fetchResponse.fetchedData !== undefined){
        const deleted_id = props.data.deleteResponse.fetchedData.result._id;
        console.log(typeof(deleted_id))
        props.data.fetchResponse.fetchedData.result = props.data.fetchResponse.fetchedData.result.filter(item => {
          console.log(typeof(item._id))
          return deleted_id != item._id 
        })
        alert('Task Deleted Successfully')
        props.data.deleteResponse = {} 
      }

    }
   
  }

  if(  props.data.fetchResponse !== undefined) {
      if(props.data.fetchResponse.error){
        alert(props.data.fetchResponse.fetchedData.message)
        props.data.fetchResponse = {} //making response to empty object for next request 
        return <Redirect to='/admin/login'/> 
      }
    }


  if(  props.data.deleteResponse !== undefined) {
    if(props.data.deleteResponse.error){
      if(props.data.deleteResponse.fetchedData.message === 'Authentication Failed'){ 
        alert(props.data.deleteResponse.fetchedData.message) //alert error message
        props.data.deleteResponse = {} //making response to empty object for next request 
        return <Redirect to='/admin/login'/>
    }else { 
         alert(props.data.deleteResponse.fetchedData.message)       
         props.data.deleteResponse = {} //making response to empty object for next request 
    }
    }
  }

  const  showPosts = () =>  (
      props.data.fetchResponse.fetchedData.result.map( item  => (
      <TableRow key={item._id}>
      <TableCell component="th" scope="row">
          {item.task}
      </TableCell>
      <TableCell>{moment(item.date).format('DD-MM-YYYY')}</TableCell>
      <TableCell>{item.time}</TableCell>
      <TableCell align="center"><Link to={`/admin/edit-task/${item._id}`}><EditIcon/></Link></TableCell>
      <TableCell align="center"
      onClick={() => deleteTaskFunc(`${item._id}`)}
      ><DeleteIcon/></TableCell>
      </TableRow>
      ))
    )

  

    console.log(props.data.fetchResponse)

    return (
        
     props.data.fetchResponse ? 
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
          <Grid  item lg={10} xs={10} sm={8} md={8} >
               <Link to="/admin/add-task"><AddIcon/></Link>
              <Paper className='root'>
              <Table className='table'>
                  <TableHead>
                  <TableRow>
                      <TableCell>Task</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell align="center">Edit</TableCell>
                      <TableCell align="center">Delete</TableCell>                     
                  </TableRow>
                  </TableHead>
                  {
                  
                    props.data.fetchResponse.fetchedData !== undefined ?
                    props.data.fetchResponse.fetchedData.result !== undefined ? (
                      <TableBody>
                          {showPosts()}
                      </TableBody>
                    ) : null 
                    :null
                
                  }                
              </Table>
              {
              
                props.data.fetchResponse.isLoading ?  <LoaderSpinner/> : null
                
              }
              </Paper>
          </Grid>
     
      </Grid> 
      :null
    
  )

}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    data : state.data
  }
}

export default connect(mapStateToProps)(TasksContainer);