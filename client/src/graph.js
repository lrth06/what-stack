//call the server at localhost:5000/${user} using axios 
//an object is returned with the data and the status code
//if the status code is 200, then the data is returned
//if the status code is not 200, then an error is returned
//use react hooks to manage state
//use react-chartjs-2 to display the data in a polar chart

import { useState, useEffect } from 'react';
import { PolarArea,Radar,Bar } from 'react-chartjs-2';
import axios from 'axios';

export function PolarGraph(){
    const [user, setUser] =useState('lrth06');
    const [type, setType] = useState('polar');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData(){
            setError(null);
            setLoading(true);
            try{
                const response = await axios.get(`http://localhost:5000/${user}`);
                if(response){
                    setLoading(false);
                }
                if(response.status === 200){
                    if(response.data.length === 0){
                        setError('No data found');
                        setLoading(false);
                    }
                    else{
                    setData(response.data);
                    console.log(response.data)
                }}
            }catch(error){
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [user]);

    if(data.length === 0 || loading){
        return <div>Application Loading...</div>
    }

    const dataSet = {
        labels: data.map(item => item.language),
        datasets: [
            {
                label: 'Lines of Code',
                data: data.map(item => item.size),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',

                ],
            }]}

            const options = {
                overScaleMode: "xy",
                plugins: {
                    zoom: {
                        limits: {
                            x: {
                                min: 0, 
                                max: data.map(item => item.size).reduce((a, b) => Math.max(a, b))
                            },
                            y: {
                                min: -5,
                                max: 5
                            }
                          },
                      zoom: {
                        wheel: {
                          enabled: true,
                        },
                        pinch: {
                          enabled: true
                        },
                        mode: 'xy',
                      }
                    }
                  },
                maintainAspectRatio: true,
                responsive: true,
                title: {
                    display: true,
                    text: 'Languages',
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#000'
                    }
        
                }
            }
       

    if(error){
        return(
             <div>
                <h1>Error</h1>
                <p>The user {user} does not exist</p>
                <p>Please enter a valid user:</p>
                    <form className="form" onSubmit={(e) => {
                        e.preventDefault();
                        setUser(e.target.elements.user.value);
                    }}>
                    <input type="text" name="user" placeholder="github username" />
                    <button type="submit">Submit</button>
                </form>
            </div>
         )
    }else{
    return(
        <div>
            <div className='graph'>
                <h1>whatStack?</h1>
                <p>Enter any Github user's name and get a visualization of what languages are used and at what frequency in their code!</p>
                <p>A few things about this chart:</p>
                <ul>
                    <li>The chart is interactive and allows you to zoom in and out</li>
                    <li>The chart is responsive and will adapt to the size of the screen</li>
                    <li>The data can be filtered by clicking on the legend</li>
                    <li>The values in the chart represent lines of code among a users public repositories</li>
                    </ul>
                <span>Data for: {user}</span>
                {/* <PolarArea data={dataSet}  /> */}
                {type === 'polar' && <PolarArea data={dataSet} options={options} /> }
                {type ==='radar' && <Radar data={dataSet} options={options}  />}
                {type ==='bar' && <Bar data={dataSet}  />}
                    <form className="form" onSubmit={(e) => {
                        e.preventDefault();
                        setUser(e.target.elements.user.value);
                    }}>
                    <input type="text" name="user" placeholder="github username" />
                    <button type="submit">Submit</button>
                </form>
                {/* put a list of radio buttons to allow the user to decide the type of chart to display   */}
                <div className='radio'>
                    <input type="radio" name="chart" value="polar" onChange={(e) => {
                        setType(e.target.value)
                    }}/>
                    <label>Polar</label>
                    <input type="radio" name="chart" value="radar" onChange={(e) => {
                        setType(e.target.value)
                    }}/>
                    <label>Radar</label>
                    <input type="radio" name="chart" value="bar" onChange={(e) => {
                        setType(e.target.value)
                    }}/>
                    <label>Bar</label>
                    <br />
                   
                </div>
            </div>
      </div>
    )
}
}