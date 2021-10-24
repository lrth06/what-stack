//call the server at localhost:5000/${user} using axios 
//an object is returned with the data and the status code
//if the status code is 200, then the data is returned
//if the status code is not 200, then an error is returned
//use react hooks to manage state
//use react-chartjs-2 to display the data in a polar chart

import { useState, useEffect } from 'react';
import {PolarArea } from 'react-chartjs-2';

import axios from 'axios';


export function RadarGraph(user){
    const [data, setData] = useState([]);
    // const [error, setError] = useState(null);

    async function fetchData(){
        try{
            const response = await axios.get(`http://localhost:5000/${user}`);
            if(response.status === 200){
                setData(response.data);
            }
        }catch(error){
            setError(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    //prepare the data for the chart
    //example data:
    //{ C: 13, HTML: 7, JavaScript: 3429, Go: 6775, Other: 12 }
    const dataSet = {
        labels: data.map(item => item.name),
        datasets: [
            {
                label: 'Languages',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.map(item => item.value)
            }
        ]
    };
    //options for the chart
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            position: 'bottom'
        }
    };




    return(
        <div>
            <PolarArea data={dataSet} options={options} />
        </div>
    )
}