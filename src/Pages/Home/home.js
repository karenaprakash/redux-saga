import React from 'react'
import Tasks from '../../Components/Tasks/tasks';
import TasksWithCalender from '../../Components/TasksWithCalendar/task_with_calendar';

const Home = (props) => {
 
    return (
      // <Tasks {...props} />
      <TasksWithCalender/>
    )

}

export default Home;