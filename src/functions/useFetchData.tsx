import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

type FetchDataReturn = {
    data:  OpenMeteoResponse | undefined;
    loading: boolean;
    error: Error | undefined;
}

export default function useFetchData() : FetchDataReturn{ 

    const [data, setData] = useState<OpenMeteoResponse | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>();

    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1463&longitude=-79.9638&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';

    useEffect(()=>{
        ( async ()=>{
                        try{
                            const data_fetch= await fetch(url);
                            const data_enJson = await data_fetch.json();
                            //espera pa que se muestre mas loading
                            //await new Promise(resolve => setTimeout(resolve, 1000));
                            setData(data_enJson);
                        }catch(error){
                            setError(error as Error);
                        }finally{
                            setLoading(false);
                        }
                
                    }
        ) ();      
    }, []);

    return { data,loading,error };


}