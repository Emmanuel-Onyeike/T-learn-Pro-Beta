const ctx = document.getElementById('orderStatusChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2026-01-26', '2026-01-25', '2026-01-11', '2026-02-01', '2026-02-02'],
        datasets: [{
            data: [0, 0, 0, 0, 0], // Perfectly flat for "No Data"
            borderColor: 'rgba(16, 185, 129, 0.2)', // Faded Emerald
            borderWidth: 2,
            fill: true,
            backgroundColor: 'transparent', // Keeps it clean while empty
            tension: 0,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 2.0,
                ticks: {
                    stepSize: 0.65,
                    color: 'rgba(255, 255, 255, 0.2)', // Muted text
                    font: { size: 10, weight: '900', family: 'Inter' },
                    callback: value => value.toFixed(1)
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.03)', // Very subtle grid
                    drawBorder: false
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    font: { size: 9, weight: '800' }
                }
            }
        }
    }
});
