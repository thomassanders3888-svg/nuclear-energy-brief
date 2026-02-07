// Country data - fertility rates 2023-2024
countryData = {
    'South Korea': 0.72,
    'Hong Kong': 0.99,
    'Singapore': 1.04,
    'Spain': 1.19,
    'Japan': 1.20,
    'Italy': 1.24,
    'Greece': 1.39,
    'Germany': 1.46,
    'Canada': 1.47,
    'China': 1.71,
    'USA': 1.67,
    'UK': 1.56,
    'France': 1.83,
    'Brazil': 1.82,
    'Mexico': 2.14,
    'India': 2.18,
    'Indonesia': 2.18,
    'Philippines': 2.64,
    'Nigeria': 5.18
};

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initCountryChart();
    initTrendCharts();
    
    // Smooth scroll for nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

function initCountryChart() {
    const ctx = document.getElementById('countryChart').getContext('2d');
    
    const labels = Object.keys(countryData);
    const values = Object.values(countryData);
    
    // Color based on value
    const colors = values.map(v => {
        if (v < 1.5) return '#dc2626';
        if (v < 2.1) return '#f59e0b';
        return '#22c55e';
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Fertility Rate',
                data: values,
                backgroundColor: colors,
                borderColor: 'transparent',
                borderWidth: 0
            }, {
                label: 'Replacement Level',
                data: labels.map(() => 2.1),
                type: 'line',
                borderColor: '#9ca3af',
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#e5e7eb',
                        filter: item => item.datasetIndex === 1
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            if (context.datasetIndex === 1) return 'Replacement Level: 2.1';
                            return `Fertility: ${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 6,
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9ca3af',
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initTrendCharts() {
    // USA Trend (simplified historical data)
    const usaCtx = document.getElementById('usaTrendChart').getContext('2d');
    new Chart(usaCtx, {
        type: 'line',
        data: {
            labels: ['1960', '1970', '1980', '1990', '2000', '2010', '2020', '2023'],
            datasets: [{
                label: 'USA Fertility Rate',
                data: [3.65, 2.48, 1.84, 2.08, 2.06, 1.93, 1.64, 1.67],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Replacement',
                data: [2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1],
                borderColor: '#9ca3af',
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#e5e7eb' } }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 1,
                    max: 4,
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#9ca3af' },
                    grid: { display: false }
                }
            }
        }
    });
    
    // Global comparison trend
    const globalCtx = document.getElementById('globalTrendChart').getContext('2d');
    new Chart(globalCtx, {
        type: 'line',
        data: {
            labels: ['1960', '1980', '2000', '2010', '2020', '2023'],
            datasets: [{
                label: 'Japan',
                data: [2.0, 1.75, 1.36, 1.39, 1.33, 1.20],
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                tension: 0.4
            }, {
                label: 'Germany',
                data: [2.37, 1.56, 1.38, 1.39, 1.53, 1.46],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4
            }, {
                label: 'USA',
                data: [3.65, 1.84, 2.06, 1.93, 1.64, 1.67],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            }, {
                label: 'Replacement',
                data: [2.1, 2.1, 2.1, 2.1, 2.1, 2.1],
                borderColor: '#9ca3af',
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#e5e7eb' } }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 1,
                    max: 4,
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#9ca3af' },
                    grid: { display: false }
                }
            }
        }
    });
}
