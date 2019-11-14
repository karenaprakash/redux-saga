/**
 * 
 * useHttp: Custom Hook 
 * arguments: url and conditions 
 * function: fetch data from url and return it 
 * 
 */

import { useState , useEffect } from 'react';
import axios from 'axios';
export const useHttp = (url,conditions) => {
    
    const [isLoading,setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const [errorData , setErrorData] = useState(null);

    useEffect(() => {
        console.log('Sending request to :' + url)
        setIsLoading(true);
        axios.get(url)
          .then(response => {
            if (response.statusText != "OK") {
                throw new Error('Failed to fetch.');
            }
            return response.data;
          })
          .then(data => {
            setFetchedData(data);
            setIsLoading(false);
          })
          .catch(err => {
            console.log(err);
            setErrorData(err);
            setIsLoading(false);
          });
      },conditions)

      return [isLoading,fetchedData,errorData]

}
