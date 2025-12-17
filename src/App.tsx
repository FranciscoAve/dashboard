import { useState } from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import {Grid} from '@mui/material'
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';




function App() {
  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Comunique la opción seleccionada al hook useFetchData
  const dataFetcherOutput = useFetchData(selectedOption);


  const data = dataFetcherOutput.data;

  const tiempo = data?.hourly.time.slice(0,24).map((t:string) =>{
    return new Date(t).getHours() + ':00';
  });

  if(dataFetcherOutput.loading){
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid>
          <h2>Cargando datos del clima...</h2>
        </Grid>
      </Grid>
    );
  }

  if (dataFetcherOutput.error) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid>
          <h2>Error al cargar datos</h2>
          <p>{`${dataFetcherOutput.error.message}`}</p>
        </Grid>
      </Grid>
    );
  }

  return(
      <Grid container spacing={5} justifyContent="center" alignItems="center">
      {/* Encabezado */}
         <Grid size={ {
            xs:12,
            md:12
          } }> 
            <HeaderUI/> 
          </Grid>

         {/* Alertas */}
         <Grid container justifyContent="center" alignItems="center" > 
            <AlertUI description="No se preveen lluvias"/> 
          </Grid>

         {/* Selector */}
         <Grid size={{xs:12,md:3}}>
            <SelectorUI onOptionSelect={setSelectedOption} />
         </Grid>

         {/* Indicadores */}
         <Grid container size={{xs:12,md:9}}>
                 <Grid size={{ xs: 12, md: 3 }}>
                     {dataFetcherOutput.data &&
                              (<IndicatorUI
                              title='Temperatura (2m)'
                              description={ `${dataFetcherOutput.data.current.temperature_2m} ${dataFetcherOutput.data.current_units.temperature_2m}` } />)
                      } 
                 </Grid>

                 <Grid size={{xs:12,md:3}}>
                      {/* temperatura aparente */
                        dataFetcherOutput.data &&
                        (<IndicatorUI 
                          title='Temperatura aparente °C'
                          description={`${dataFetcherOutput.data.current.apparent_temperature} ${dataFetcherOutput.data.current_units.apparent_temperature}`}
                        />)
                      }

                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {
                     /* IndicatorUI con la Velocidad del viento en km/h' */
                     dataFetcherOutput.data && 
                     (<IndicatorUI 
                        title='Velocidad de viento(km/h)' 
                        description={`${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`}   
                     />)
                     }
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Humedad relativa en %' */
                     dataFetcherOutput.data &&
                     (<IndicatorUI title='Humedad relativa'
                        description={`${dataFetcherOutput.data.current.relative_humidity_2m} ${dataFetcherOutput.data.current_units.relative_humidity_2m}`}
                     />)
                     }
                 </Grid>
         </Grid>

         {/* Gráfico */}
         <Grid size={{xs:12,md:6}} sx={ {
            display:{
              xs:"none", 
              md:"block"
            }
          } }>
            <ChartUI temperatures={data?.hourly.temperature_2m.slice(0,24)} velocidadViento={data?.hourly.wind_speed_10m.slice(0,24)} tiempo={tiempo} temperatureUnits={data?.hourly_units.temperature_2m} velocidadVUnits={data?.hourly_units.wind_speed_10m}/>
          </Grid>

         {/* Tabla */}
         <Grid size={{xs:12,md:6}} sx={ {
            display:{
              xs:"none", 
              md:"block"
            }
          } }>
            <TableUI temperatures={data?.hourly.temperature_2m.slice(0,24)} velocidadViento={data?.hourly.wind_speed_10m.slice(0,24)} tiempo={tiempo}/>
          </Grid>

         {/* Información adicional
         <Grid>Elemento: Información adicional</Grid> */}
    </Grid>
    
  )
}

export default App
