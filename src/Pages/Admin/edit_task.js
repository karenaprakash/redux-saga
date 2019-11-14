import React from 'react'
import EditTaskForm from '../../Containers/Admin/Edit/edit_task_form';
const EditTask = (props) => {
    const task_id = props.match.params.id;

    return (
        <div>
            <EditTaskForm task_id={task_id} />
        </div>
    )
}

export default  EditTask;