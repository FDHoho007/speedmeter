graphql("https://speed-api.myfdweb.de", "{ results(limit: 168) { time ping download upload packetLoss } }", null, null, function (data) {
    let labels = [], download = [], upload = [], ping = [], min = [-1, -1, -1], max = [-1, -1, -1];
    function minmax(index, value) {
		if(value < min[index] || min[index] === -1)
			min[index] = value;
		if(value > max[index] || max[index] === -1)
			max[index] = value;
	}
	for (let result of data.data.results) {
        let d = new Date(result.time * 1000);
        labels.push(d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes());
        let dl = Math.floor(result.download / 100000) / 10;
		download.push(dl);
		minmax(0, dl);
		let ul = Math.floor(result.upload / 100000) / 10;
        upload.push(ul);
		minmax(1, ul);
        ping.push(result.ping);
		minmax(2, result.ping);
    }
    labels.reverse();
    download.reverse();
    upload.reverse();
    ping.reverse();
	document.getElementById("download-min").innerText = min[0];
	document.getElementById("download-max").innerText = max[0];
	document.getElementById("upload-min").innerText = min[1];
	document.getElementById("upload-max").innerText = max[1];
	document.getElementById("ping-min").innerText = min[2];
	document.getElementById("ping-max").innerText = max[2];
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
