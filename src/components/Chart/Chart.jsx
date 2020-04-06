import React, { useState, useEffect } from 'react';
import { featchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ( {data: { confirmed,deaths,recovered },country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect (() => {
        const featchAPI = async () => {
            setDailyData(await featchDailyData());
        }

        featchAPI();
    }, []);

    const lineChart = (
        dailyData.length // default 0
       ? (<Line data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: 'orange',
                fill: true,
            }, {
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
            }],
        }}
        />) : null
    );

    const barChart = (
    confirmed
        ? (
            <Bar
            data={{
                labels: ['Infected','Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgba(255, 183, 0, 0.961)','rgba(0, 255, 30, 0.954)','rgba(242, 16, 16, 0.92)'],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
               legend: {display: false},
               title: { display: true, text:`Current state in ${country}`},
            }} />
        ) : null
    )
    
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;