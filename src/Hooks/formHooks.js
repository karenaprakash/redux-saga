import {useState , useEffect } from 'react';

const useForm = (inputData,callback) => {
    
    //inputs for store inputs 
    const [ inputs , setInputs ] = useState(inputData);

        //handleSubmit function for submit form 
        const handleSubmit = (event) => {
            event.preventDefault();
            callback();
        }   

        //handleInputChange function which manage input change 
        const handleInputChange = (event) => {
            event.persist();
            setInputs( inputs => ({...inputs,[event.target.name]:event.target.value}));
        }
        console.log(inputs);

    return {
        inputs,
        handleSubmit,
        handleInputChange
    };
    
}

export default useForm;