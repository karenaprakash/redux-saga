import React, { useState , useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import moment from "moment";
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
import TaskGetDialog from '../../Components/Dialog/get_task_dialog';


/*------ Calendar -------*/
import { Calendar , Views , momentLocalizer} from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from 'js-cookie';

//localizer which handles date and all formates for react-big-calendar
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const AdminCalendar = (props) => {
  /**
   * events : store retrived events in array
   * event  : store perticuler event for performing some actions on it like add/edit/delete
   * view : for handling view of our react-big-calendar
   */
  const [events,setEvents] = useState([]);
  const [event,setEvent] = useState({});
  const [view,setView] = useState(Views.MONTH);
  const [navigationDate,setNavigationDate] = useState({
    startDate : moment().startOf('month').format('YYYY-MM-DD'),
    endDate : moment().endOf('month').format('YYYY-MM-DD')
  });

 // console.log(navigationDate)
  /* ------------ Retrive our events from database ------------ */
  useEffect(()=>{
      /**
       * dispatch getTasks : function which calls task_apis and return response 
       */
     // props.dispatch(getTasks(navigationDate)); 
  },[])

useEffect(()=>{
    /**
     * dispatch getTasks :
     */
   console.log(navigationDate)
  props.dispatch(getTasks(navigationDate)); 
},[navigationDate])


  /**
   * changeDatesType : it change our date type for add/update/delete 
   */
  const changeDatesType = (date) => {
    return new Date(date)
  }
  
  /* --------------------- Handle Get Event ----------------------- */

  const [openGetDialog, setOpenGetDialog] = React.useState(false);

   //function which handle editDialog close event
   const handleCloseGet = () => {
    setOpenGetDialog(false);
  };

  const handleClickOpenGet = () => {
    setEvent(navigationDate);
    setOpenGetDialog(true);
  };

  const handleGetEvent = (events) => {
    setEvents(events)
    handleCloseGet();
  }

  /* ----------X----------- Handle Get Event -----------X------------ */

  /* --------------------- Handle Add Event ----------------------- */
  /**
   * openAddDialog : it handle addDialog is open or not
   */
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  //function which handle addDialog open event 
  const handleClickOpenAdd = ({start,end}) => {
    //validation for start date
    const startDate = moment(start).format('YYYY-MM-DD');
    const currentDate = moment().format('YYYY-MM-DD')
    if (startDate < currentDate ) {
      return alert('Start date is invalid.')
    }

   // console.log(start)

    //set newEvent to event state.So we can pass it to addDialog 
    let newEvent = {
      title : '',
      start : start,
      end : end,
    }
    setEvent(newEvent)
    setOpenAddDialog(true);
  };
  //function which handle addDialog close event
  const handleCloseAdd = () => {
    setEvent({})
    setOpenAddDialog(false);
  };

  /* ------------------ HandleAddEvent  : handles newly added event and set it to events ---------------------- */
  const handleAddEvent = (event) => {
    const addedEvent = {
      _id : event._id,
      title : event.title,
      start : changeDatesType(event.start),
      end : changeDatesType(event.end)
    }
    //push new added event to events 
    events.push(addedEvent)
    //set new events
    setEvents(events)
    //close addDialog 
    handleCloseAdd()
  }

  /* -----------X---------- Handle Add Event ------------X----------- */

  /* --------------------- Handle Edit Event ----------------------- */
 /**
   * openEditDialog : it handle editDialog is open or not
   */
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  //function which handle editDialog open event 
  const handleClickOpenEdit = (event) => {
    //validation for start date
    
    const startDate = moment(event.start).format('YYYY-MM-DD');
    const currentDate = moment().format('YYYY-MM-DD')

    if (startDate < currentDate ) {
      return alert('Start date is invalid.')
    }

    setEvent(event)
    setOpenEditDialog(true);
  };
  //function which handle editDialog close event
  const handleCloseEdit = () => {
    setOpenEditDialog(false);
  };

  /* ------------------ HandleUpdatedEvent  : event updated from event edit ---------------------- */
  const handleUpdatedEvent = (updatedEvent) => {
  const eventIndex = events.findIndex((event) => {
        return event._id === updatedEvent._id
    })
  
    const editedEvent = {
      _id : updatedEvent._id,
      title : updatedEvent.title,
      start : changeDatesType(updatedEvent.start),
      end : changeDatesType(updatedEvent.end)
    }

    events[eventIndex] = editedEvent;
    setEvents(events);
    handleCloseEdit()
  }
  /* --------- onEventResize ------------ */
  const onEventResize = (event) => {
   const editedEvent = event.event;
      
   const resizeEvent = {
      _id : editedEvent._id,
      title : editedEvent.title,
      start : event.start,
      end : event.end
    }
//    console.log('resize event',event)
    setEvent(resizeEvent)
    handleClickOpenEdit(resizeEvent)
   
  };
  /* -----X---- onEventResize -------X----- */

  /* --------- onEventDrop ------------ */

  const onEventDrop = ({ event, start, end }) => {
      
    const dropedEvent = {
       _id : event._id,
       title : event.title,
       start : start,
       end : end
     }
     //console.log('droped event',dropedEvent)
     setEvent(dropedEvent)
     handleClickOpenEdit(dropedEvent)
  };
  /* ------X--- onEventDrop ------X------ */

  /* -----------X---------- Handle Edit Event ------------X----------- */

  /* ------------------ HandleDeletedEvent  : event deleted  ---------------------- */

  const handleDeletedEvent = (deletedEvent) => {
  //  console.log(deletedEvent)
    const newEvents = events.filter((event) => {
      return event._id !== deletedEvent._id
    })

    setEvents(newEvents);
    handleCloseEdit()
  }

  /* -------------------------- Response Handling : fetchResponse ------------------------------ */
    
  if(  props.data.fetchResponse !== undefined) {
      if(props.data.fetchResponse.error){
        alert(props.data.fetchResponse.fetchedData.message)
        props.data.fetchResponse = {} //making response to empty object for next request 
        return <Redirect to='/login'/> 
      }else if(props.data.fetchResponse.fetchedData !== undefined){
          if(props.data.fetchResponse.fetchedData.result){
            //  console.log(props.data.fetchResponse.fetchedData.result)
          /*  if(props.data.fetchResponse.fetchedData.message === 'Task not found.'){
              alert(props.data.fetchResponse.fetchedData.message)              
            }
            */
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

              if(roll === 'user'){
                return <Redirect to='/'/>
              }else if(roll === 'admin'){
                //console.log('Fetched Events',Events)
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
    //console.log('admin')
    Cookies.remove('auth')
    window.location.reload(true);
  }
  /* ------------ handleNavigationChange ---------- */
  
  const handleNavigationChange = (date,view,actions) => {
    
  console.log(date)
  console.log(view)
  console.log(actions)

  let start, end;

  if (view === 'month') {
    start = moment(date).startOf('month').format('YYYY-MM-DD')
    end = moment(date).endOf('month').format('YYYY-MM-DD')
  }
  if (view === 'week') {
    start = moment(date).startOf('week').format('YYYY-MM-DD')
    end = moment(date).endOf('week').format('YYYY-MM-DD')
  }
  if (view === 'day' || view === 'agenda') {
    start = moment(date).startOf('day').format('YYYY-MM-DD')
    end = moment(date).add(1,'d').format('YYYY-MM-DD')
  }

  console.log(start)
  console.log(end)

    setNavigationDate({
      startDate : start,
      endDate : end
    })
  }
 // console.log('newDate',moment(navigationDate).format('YYYY-MM-DD'));
  /* -------X----- handleNavigationChange ----X------ */

return (
<div className="App">

  <Fab onClick={handleClickOpenGet} variant="extended" id='get_btn' aria-label="like" >
    Get Tasks 
  </Fab>

  {
      openEditDialog ? 
      <TaskEditDialog 
        open={openEditDialog} 
        handleDeletedEvent={handleDeletedEvent} 
        handleUpdatedEvent={handleUpdatedEvent} 
        handleClose={handleCloseEdit} 
        event={event} />
      : null
  }
  {
      openAddDialog ?
      <TaskAddDialog 
        open={openAddDialog} 
        handleAddEvent={handleAddEvent} 
        handleClose={handleCloseAdd} 
        event={event} /> 
      : null
  }
  {
      openGetDialog ? 
      <TaskGetDialog 
        open={openGetDialog} 
        setNavigationDate={setNavigationDate} 
        handleClose={handleCloseGet} 
        event={event} />
      : null
  }

      <DnDCalendar
        selectable
        defaultDate={new Date()}
        views = {['month','agenda']}
        defaultView={view}
        onView = {handleViewChange}
        onNavigate = {handleNavigationChange}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectEvent = {handleClickOpenEdit}
        onSelectSlot = {handleClickOpenAdd}
        resizable 
        style={{ height: "100vh" }}
        startAccessor="start"
        endAccessor="end"
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
  
  export default connect(mapStateToProps)(AdminCalendar);