graphql("https://speed-api.myfdweb.de", "{ results(limit: 168) { time ping download upload packetLoss } }", null, null, function (data) {
    let labels = [], download = [], upload = [], ping = [];
    for (let result of data.data.results) {
        let d = new Date(result.time * 1000);
        labels.push(d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes());
        download.push(Math.floor(result.download / 100000) / 10);
        upload.push(Math.floor(result.upload / 100000) / 10);
        ping.push(result.ping);
    }
    labels.reverse();
    download.reverse();
    upload.reverse();
    ping.reverse();
    new Chart(document.getElementById("chart").getContext("2d"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Download Speed",
                    data: download,
                    backgroundColor: "#6afff3",
                    borderColor: "#6afff3",
                    borderWidth: 1,
                    yAxisID: "y"
                },
                {
                    label: "Upload Speed",
                    data: upload,
                    backgroundColor: "#bf71ff",
                    borderColor: "#bf71ff",
                    borderWidth: 1,
                    yAxisID: "y"
                },
                {
                    label: "Ping",
                    data: ping,
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    borderWidth: 1,
                    yAxisID: "y1"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            scales: {
                y: {
                    beginAtZero: true,
                    type: "linear",
                    display: true,
                    position: "left"
                },
                y1: {
                    beginAtZero: true,
                    type: "linear",
                    display: true,
                    position: "right",
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
});
