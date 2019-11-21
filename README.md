
Frontend : Event/Task managment project 
Backend : react-sagas-api in github repo. 

//This project is built with ReactJs + Hooks + React-Redux + Redux-Saga + react-big-calendar + Admin Authentication 

    "@material-ui/core": "^4.6.1",
    "@material-ui/icons": "^4.5.1",
    "@material-ui/pickers": "^3.2.8",
    "axios": "^0.19.0",
    "js-cookie": "^2.2.1",
    "moment": "^2.24.0",
    "react": "^16.11.0",
    "react-big-calendar": "^0.23.0",
    "react-cookie": "^4.0.1",
    "react-dnd": "^9.4.0",
    "react-dnd-html5-backend": "^9.4.0",
    "react-dom": "^16.11.0",
    "react-redux": "^7.1.3",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.2.0",
    "redux": "^4.0.4",
    "redux-saga": "^1.1.3"
 

console.log(newDate)
    console.log(view)
    let startDate;
    let endDate;
  

    if(view === 'day'){
      startDate = moment(newDate).format('YYYY-MM-DD');
      endDate = moment(newDate).format('YYYY-MM-DD');

      console.log(startDate)
      console.log(endDate)

      console.log('api for day')

    }else if(view === 'week'){
      startDate = moment(newDate).format('YYYY-MM-DD');
      endDate = moment(newDate).format('YYYY-MM-DD');

      console.log(startDate)
      console.log(endDate)

      console.log('api for week need start date and end date')
      
    }else if(view === 'month'){
      startDate = moment(newDate).format('YYYY-MM-DD');
      endDate = moment(newDate).format('YYYY-MM-DD');

      console.log(startDate)
      console.log(endDate)

      console.log('api for month need start date and end date')
  