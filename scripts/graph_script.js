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

  
  if (time_frame == "day") {
    let p = 0;
    for (l = 0; l < datapoints.length; l++) {
        if (datapoints[l].time == ("y|" + year)) {
            for (k = l + 1; k < datapoints.length; k++) {
                if (datapoints[k].time == ("m|" + month)) {
                    for (i = k + 1; i < datapoints.length; i++) {
                        if (datapoints[i].time == ("d|" + day)) {
                            for (j = i + 1; j < datapoints.length; j++) {
                                if (datapoints[j].time == ("d|" + (day + 1)) || (datapoints[j].time).includes("m|") || datapoints[j].time == ("y|" + (year + 1))) {
                                    break;
                                }
                                else {
                                    if (p < 24) {
                                        time.push(datapoints[j].time);
                                        value.push(datapoints[j].value);
                                        p = p + 1;
                                    }

                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
}
  else if (time_frame == "month"){
    for(i =0; i < datapoints.length; i++){
    if (datapoints[i].time == ("y|" + year)){
      for(j =i+1; j < datapoints.length; j++){ 
        if(datapoints[j].time == ("m|" + month)){
          for(k=j+1; k<datapoints.length; k++){
            if(datapoints[k].time.includes("d|")){
              time.push(datapoints[k].time);
              value.push(datapoints[k].value);
            }
            else if (datapoints[k].time.includes("m|") || datapoints[k].time.includes("y|")){
              break;
            }
          }          
        }
        else if(datapoints[j].time.includes("y|")){
          break;
        }

      }
    }
  }}
  else if (time_frame == "year"){
    console.log("yearee=")
    for(i =0; i < datapoints.length; i++){
    if (datapoints[i].time.includes("y|" + year)){
          for(j=i+1; j<datapoints.length; j++){
            if(datapoints[j].time.includes("m|")){
              time.push(datapoints[j].time);
              value.push(datapoints[j].value);
            }
            else if (datapoints[j].time.includes("y|")){
              break;
            }
          }  
          break;      
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


