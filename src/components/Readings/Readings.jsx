import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table } from "react-bootstrap";
import LineChart from '../../components/LineChart/LineChart';

const Readings = () => {
    const [readings, setReadings] = useState({data: []});
    
    useEffect( () => {
        const fetchReadingsList = async () => {
            const {data} = await axios.get("https://localhost:7107/api/Reading", {
              headers:{
                Accept: 'application/json',
              },
            });
            setReadings({ data})
            console.log('readings : ' + JSON.stringify( data));            
        }

        fetchReadingsList();
    }, [setReadings])

  //const bpReadings = JSON.stringify(readings);
  return (
    <>
    
      <div>Reading</div>
      <LineChart />   

      
       
      <Table className="mt-4" striped hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Reading Taken</th>
                <th>SYS</th>
                <th>DIA</th>
                <th>Pulse</th>
              </tr>
            </thead>
            <tbody>
              {readings.data.map(reading=>(
                <tr key={reading.id}>
                <td>{reading.id}</td> 
                <td>{reading.readingTaken}</td> 
                <td>{reading.sys}</td> 
                <td>{reading.dia}</td> 
                <td>{reading.pulse}</td> 
              </tr>       
              ))}            
            </tbody>
      </Table>
    </>
  )
}

export default Readings