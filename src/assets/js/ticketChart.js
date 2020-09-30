var ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug', 'Sept'],
        datasets: [{
            label: 'Successful',
            data: [12, 19, -4, 5, 2, 3, -30, 12, 29],
            fill: 'false',
            backgroundColor: '#4799eb',
            borderColor: '#4799eb',
            pointHoverRadius: 30,
            borderWidth: 1,
            
        },{
            label: 'Pending',
            data: [4, 19, -14, 5, 2, 3, -30, 12, -2],
            fill: 'false',
            backgroundColor: '#dd9124',
            borderColor: '#dd9124',
            pointHoverRadius: 30,
            borderWidth: 1
        },{
            label: 'Failed',
            data: [10, 19, -14, 5, 2, 3, 30, 12, -29],
            fill: 'false',
            backgroundColor: '#c14f4f',
            borderColor: '#c14f4f',
            pointHoverRadius: 30,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        legend: {
            position: 'bottom',
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
        title: {
            display: 'true',
            text: 'Hello World',
        }
    }
});