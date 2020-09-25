import React from 'react'
import { Line } from "react-chartjs-2";

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    datasets: [{
        label: 'Successful',
        data: [12, 19, -4, 5, 2, 3, -30, 12, 29],
        fill: 'false',
        backgroundColor: '#4799eb',
        borderColor: '#4799eb',
        pointHoverRadius: 30,
        borderWidth: 1,

    }, {
        label: 'Pending',
        data: [4, 19, -14, 5, 2, 3, -30, 12, -2],
        fill: 'false',
        backgroundColor: '#dd9124',
        borderColor: '#dd9124',
        pointHoverRadius: 30,
        borderWidth: 1
    }, {
        label: 'Failed',
        data: [10, 19, -14, 5, 2, 3, 30, 12, -29],
        fill: 'false',
        backgroundColor: '#c14f4f',
        borderColor: '#c14f4f',
        pointHoverRadius: 30,
        borderWidth: 1
    }]
};

// const chartTitle = "Ticket Statistics";

function Chart(props) {
    return (
        <div className="container-fluid">
            <Line
                data={data}
                options={{
                    title: {
                        display: true,
                        text: props.chartTitle,
                        fontSize: 20,
                        animation: {
                            easing: "easeInOutBack",
                        },
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                    hover: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                            display: 'true',
                            scaleLabel: {
                                display: 'true',
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: 'true',
                            scaleLabel: {
                                display: 'true',
                                labelString: 'Value'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                }} />
        </div>
    );
}

export default Chart
