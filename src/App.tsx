/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import {Grid} from '@mui/material'
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';



function App() {
  //const [count, setCount] = useState(0)
  const dataFetcherOutput = useFetchData();

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
            <SelectorUI/>
         </Grid>

         {/* Indicadores */}
         <Grid container size={{xs:12,md:9}}>
          <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI title='Temperatura (2m)' description='XX°C' />
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {dataFetcherOutput &&
                              (<IndicatorUI
                              title='Temperatura (2m)'
                              description={ `${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}` } />)
                      } 
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Velocidad del viento en km/h' */}
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Humedad relativa en %' */}
                 </Grid>
         </Grid>

         {/* Gráfico */}
         <Grid size={{xs:12,md:6}} sx={ {
            display:{
              xs:"none", 
              md:"block"
            }
          } }>Elemento: Gráfico</Grid>

         {/* Tabla */}
         <Grid size={{xs:12,md:6}} sx={ {
            display:{
              xs:"none", 
              md:"block"
            }
          } }>Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid size={{xs:12,md:12}}>Elemento: Información adicional</Grid>
    </Grid>
    
  )
}

export default App
