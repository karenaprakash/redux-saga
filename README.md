Event/Task managment project

//adding react-big-calendar 

npm install --save react-big-calendar react-dnd react-dnd-html5-backend 

<div className="form_element">
                    <div className="form_element-lable">
                        <label>Start Date</label>
                    </div> 
                    <input type="date" min={moment(Date()).format('YYYY-MM-DD')} name="start" value={inputs.start} onChange={handleInputChange} required />
                </div>  
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>End Date</label>
                    </div> 
                    <input type="date" min={moment(Date()).format('YYYY-MM-DD')} name="end" value={inputs.end} onChange={handleInputChange} required />
                </div> 

   <div className="form_element">
                    <div className="form_element-lable">
                        <label>Start Time</label>
                    </div> 
                    <input type="time" name="start_time" value={inputs.start_time} onChange={handleInputChange} required />
        
                </div>  
                <div className="form_element">
                    <div className="form_element-lable">
                        <label>End Time</label>
                    </div> 
                    <input type="time" name="end_time" value={inputs.end_time} onChange={handleInputChange} required />
                </div> 




                 <div className="form_element">
                    <TextField
                        id="start"
                        label="start"
                        name="start"
                        type="datetime-local"
                        defaultValue={inputs.start}
                        onChange={handleInputChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>  
                <div className="form_element">
                    <TextField
                        id="end"
                        label="end"
                        name="end"
                        type="datetime-local"
                        defaultValue={inputs.end}
                        onChange={handleInputChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>


                  const AllEvents = props.data.fetchResponse.fetchedData.result;
                  const Events = AllEvents.map(event => {
                    return {
                      _id : event._id,
                      title : event.title,
                      start : event.start,
                      end : event.end
                    }
                  })
                  //moment(event.end).format('YYYY,MM,DD,HH,mm,ss'),
                  console.log(Events)
                  setEvents(Events); 


      start : new Date(moment(event.start).format('YYYY'),moment(event.start).format('MM'),moment(event.start).format('DD'),moment(event.start).format('HH'),moment(event.start).format('mm'),moment(event.start).format('ss')),
     end : new Date(moment(event.start).format('YYYY'),moment(event.start).format('MM'),moment(event.start).format('DD'),moment(event.start).format('HH'),moment(event.start).format('mm'),moment(event.start).format('ss')),
             