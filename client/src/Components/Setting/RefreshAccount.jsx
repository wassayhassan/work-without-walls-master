import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAccountLink } from '../../api';

const RefreshAccount = () => {
    const {id} = useParams();
    async function getLink(){
        let data = {id: id}
        const response = await getAccountLink(data);
        if(response.data){
           window.location =  response.data.url
        }
    }
    useEffect(()=> {
        getLink();
    },[])
  return (
    <div>

    </div>
  )
}

export default RefreshAccount