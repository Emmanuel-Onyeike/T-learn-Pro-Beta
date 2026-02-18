/**
 * T LEARN PRO — Overview.js
 * 
 * FIX: Chart.js was running unconditionally on every page load.
 * Now it only initialises when the #myChart canvas actually exists in the DOM,
 * meaning the user is on the Overview tab. Called by updateView() after render.
 */

function initOverviewChart() {
    const canvas = document.getElementById('myChart');
    if (!canvas) return; // Not on Overview — do nothing

    // Prevent double-init if user navigates back
    if (canvas.dataset.chartInit === 'true') return;
    canvas.dataset.chartInit = 'true';

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Activity',
                data: [3, 7, 5, 10, 8, 12, 9],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.08)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#3b82f6',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } }
                }
            }
        }
    });
}

