import React, { useState , useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import moment from "moment";
import Cookies from 'js-cookie';
import Fab from '@material-ui/core/Fab';

import './style.css';

/* ------------ Actions ----------- */
import {
    getTasks,
} from '../../Actions/user_actions';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';
/*------- Components --------*/
import TaskEditDialog from '../../Components/Dialog/edit_task_dialog';
import TaskAddDialog from '../../Components/Dialog/add_task_dialog';
/*------ Calendar -------*/
import { Calendar , Views , momentLocalizer} from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
//localizer which handles date and all formates for react-big-calendar
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const UserCalendar = (props) => {
  /**
   * events : store retrived events in array
   * event  : store perticuler event for performing some actions on it like add/edit/delete
   * view : for handling view of our react-big-calendar
   */
  const [events,setEvents] = useState([]);
  const [event,setEvent] = useState({});
  const [view,setView] = useState(Views.MONTH);

  /* ------------ Retrive our events from database ------------ */
  useEffect(()=>{
      /**
       * dispatch getTasks : function which calls task_apis and return response 
       */
      props.dispatch(getTasks()); 
  },[])

  /**
   * changeDatesType : it change our date type for add/update/delete 
   */
  const changeDatesType = (date) => {
    return new Date(date)
  }


  /* -------------------------- Response Handling : fetchResponse ------------------------------ */
    
  if(  props.data.fetchResponse !== undefined) {
      if(props.data.fetchResponse.error){
        alert(props.data.fetchResponse.fetchedData.message)
        props.data.fetchResponse = {} //making response to empty object for next request 
        return <Redirect to='/login'/> 
      }else if(props.data.fetchResponse.fetchedData !== undefined){
          if(props.data.fetchResponse.fetchedData.result){
              console.log(props.data.fetchResponse.fetchedData.result)

              const Events = props.data.fetchResponse.fetchedData.result.events
              .map(event => {
                return {
                  _id : event._id,
                  title : event.title,
                  start : changeDatesType(event.start),
                  end :  changeDatesType(event.end),
                }
              })


              const user  = props.data.fetchResponse.fetchedData.result.user;
              const roll = user.roll;

              if(roll === 'admin'){
                return <Redirect to='/admin'/>
              }else if(roll === 'user'){
                console.log('Fetched Events',Events)
                setEvents(Events); 
                props.data.fetchResponse = {} //making response to empty object for next request 
              }
              
          }
      }
  }
  /* ------------X-------------- Response Handling : fetchResponse --------------X---------------- */

  /* ------------ handleViewChange : it initialize view to our react-big-calendar ---------- */
  const handleViewChange = (view) => {
    console.log(view)
    if(view === 'week'){
      setView(Views.WEEK)
    }else if(view === 'day'){
      setView(Views.DAY)
    }else if(view === 'month'){
      setView(Views.MONTH)
    }
  }
  /* -------X----- handleViewChange ------X---- */
  const logout = () => {
    console.log('admin')
    Cookies.remove('auth')
    window.location.reload(true);
  }
  /* ------------ handleEventStatus ---------- */


return (
<div className="App">
      <DnDCalendar
        defaultDate={new Date()}
        defaultView={view}
        onView = {handleViewChange}
        events={events}
        localizer={localizer}
        style={{ height: "100vh" }}
      />
      <Fab onClick={logout} variant="extended" id='logout_btn' aria-label="like" >
        Logout
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
      data : state.data
    }
  }
  
  export default connect(mapStateToProps)(UserCalendar);






