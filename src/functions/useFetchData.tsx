import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

type FetchDataReturn = {
    data:  OpenMeteoResponse | undefined;
    loading: boolean;
    error: Error | undefined;
}


// Estrategia para convertir la opción seleccionada en un objeto
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.0447, longitude: -79.908 },
    'Quito': { latitude: -0.22985, longitude: -78.52495 },
    'Manta': { latitude: -0.94937, longitude: -80.73137 },
    'Cuenca': { latitude: -2.8953, longitude: -78.9963 },

};

export default function useFetchData(selectedOption:string|null) : FetchDataReturn{ 

    const [data, setData] = useState<OpenMeteoResponse | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(()=>{

    // Parametrice la opción seleccionada en la URL del requerimiento asíncrono
    const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
    console.log("cityConfig:", cityConfig);
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    console.log("url:", url);

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
    }, [selectedOption]);

    return { data,loading,error };


}