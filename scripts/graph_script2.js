//const charData = "https://drive.google.com/file/d/1Nmsc6bbR_yzs7V82bllOTDxtRgeK1ajY";
      
var startDateInput = document.getElementById("pick_date");
var dateType = document.getElementById("time_frame");
var startDate;
var time_frame = "day";
const charData = "https://www.googleapis.com/drive/v3/files/1FYrbkNbZVKVGDnsM5Fcji6Og3_QXfnW3?alt=media&key=AIzaSyCbqmghV90m-2pnk94hNDDSldwd2q-IYRY";

const data = {
  labels: null,
  datasets: [{
    label: 'Consumption (in KWh)',
    data: null,
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  }]
};

// config 
const config = {
  type: 'line',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

function generateGraph() {
  let date = new Date(startDate);
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  console.log("Day: " + day);
  console.log("Month: " + month);
  console.log("Year: " + year);

  // Graph
  d3.csv(charData).then(function(datapoints){
  console.log(datapoints)
  const time = [];
  const value = [];

  
  if (time_frame == "day"){
    let yearIndex = datapoints.findIndex(point => point.time == ("y|" + year));
    if (yearIndex !== -1) {
        let monthIndex = datapoints.findIndex(point => point.time == ("m|" + month), yearIndex + 1);
        if (monthIndex !== -1) {
            let dayIndex = datapoints.findIndex(point => point.time == ("d|" + day), monthIndex + 1);
            if (dayIndex !== -1) {
                for (let i = dayIndex; i < datapoints.length; i++) {
                    let currentYear = parseInt(datapoints[i].time.split('|')[1]);
                    let currentMonth = parseInt(datapoints[i].time.split('|')[1]);
                    let currentDay = parseInt(datapoints[i].time.split('|')[1]);
                    if (currentYear > year || currentMonth > month || currentDay > day) {
                        break;
                    } else{
                        time.push(datapoints[i].time);
                        value.push(datapoints[i].value);
                        }
                    }
                }
            }
        }
    }



else if (time_frame == "month") {
    let yearIndex = datapoints.findIndex(point => point.time == ("y|" + year));
    if (yearIndex !== -1) {
      let monthIndex = datapoints.findIndex(point => point.time == ("m|" + month), yearIndex + 1);
      if (monthIndex !== -1) {
        for (let i = monthIndex + 1; i < datapoints.length; i++) {
          if (datapoints[i].time.includes("d|")) {
            time.push(datapoints[i].time);
            value.push(datapoints[i].value);
          }
          else if (datapoints[i].time.includes("m|") || datapoints[i].time.includes("y|")) {
            break;
          }
        }
      }
    }
  } else if (time_frame == "year") {
    console.log("yearee=")
    let yearIndex = datapoints.findIndex(point => point.time.includes("y|" + year));
    if (yearIndex !== -1) {
      for (let i = yearIndex + 1; i < datapoints.length; i++) {
        if (datapoints[i].time.includes("m|")) {
          time.push(datapoints[i].time);
          value.push(datapoints[i].value);
        }
        else if (datapoints[i].time.includes("y|")) {
          break;
        }
      }
    }
  }
  





console.log(value)
// setup 
  myChart.data.labels = time;
  myChart.data.datasets[0].data = value;
  myChart.update();
});
};

startDateInput.addEventListener("change", function() {
  startDate = startDateInput.value;
  console.log(startDate);
  generateGraph();

});

dateType.addEventListener("change", function() {
  time_frame = dateType.value;
  console.log(time_frame);
});


