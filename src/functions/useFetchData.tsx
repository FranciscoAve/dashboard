import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() : OpenMeteoResponse | undefined { 

    const [data, setData] = useState<OpenMeteoResponse | undefined>();

    const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

    useEffect(()=>{
        ( async ()=>{
                const data_fetch= await fetch(url);
                const data_enJson = await data_fetch.json();
                setData(data_enJson);
            }
        ) ();      
    }, []);

    return data;


}