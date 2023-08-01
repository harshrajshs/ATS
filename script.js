document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "TBJGJQ6AGIZ3IYDM";
    const SYMBOL = "NSEI";

    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${API_KEY}`;

    // Fetch historical Nifty 50 data from Alpha Vantage
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const seriesData = Object.entries(data["Time Series (Daily)"]).map(([date, value]) => ({
                x: new Date(date).getTime(),
                open: parseFloat(value["1. open"]),
                high: parseFloat(value["2. high"]),
                low: parseFloat(value["3. low"]),
                close: parseFloat(value["4. close"])
            }));

            // Create the candlestick chart
            Highcharts.stockChart('candlestick-chart', {
                rangeSelector: {
                    selected: 1
                },
                title: {
                    text: 'Nifty 50 Candlestick Chart'
                },
                series: [{
                    type: 'candlestick',
                    name: 'Nifty 50',
                    data: seriesData
                }]
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
