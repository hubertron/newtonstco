



/* Fetch Weather */

pm1url = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.pm1";
pm25url = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.pm25";
pm10url = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.pm10";
avg25 = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.avg25";
aqi = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.aqi";

// Weather
tempf = "https://io.adafruit.com/api/v2/drkpxl/feeds/temp"
humidity = "https://io.adafruit.com/api/v2/drkpxl/feeds/humidity"
pressure = "https://io.adafruit.com/api/v2/drkpxl/feeds/pressure"
forecast = "https://services.drkpxl.com/feed/currentWeather.json"

const dateOptions = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric"
};


// Get JSON
var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    callback(xhr.status, xhr.response); 
    console.log(url + " " + xhr.status);
  };
  xhr.send();
};


function getData() {
  getJSON(aqi, function (err, data) {
    avgValue = data.last_value
    u("#aqivalue").html(avgValue);
    u("#home").addClass("default-bg");
    let date = new Date(data.updated_at);

    let timeFormat = date.toLocaleDateString("en-US", dateOptions);
    u("#lastUpdate").html("Last Updated: " + timeFormat);

    if (avgValue > 300) {
      u("#home").attr("class", "hazardous");
      u(".descriptive").html("Hazardous")
    } else if (avgValue > 200) {
      u("#home").attr("class", "very-unhealthy");
      u(".descriptive").html("Very Unhealthy")
    } else if (avgValue > 150) {
      u("#home").attr("class", "unhealthy");
      u(".descriptive").html("Unhealthy")
    } else if (avgValue > 100) {
      u("#home").attr("class", "unhealthySensitive");
      u(".descriptive").html("Unhealthy for Sensitive Groups")
    } else if (avgValue > 50) {
      u("#home").attr("class", "moderate");
      u(".descriptive").html("Moderate")
    } else {
      u("#avg25value").attr("class", "default");
      u("#home").attr("class", "default-bg");
      u(".descriptive").html("Healthy")
    }

  })

  getJSON(pm25url, function (err, data) {
      u("#pm25value").html(data.last_value);


      if (data.last_value > 12) {
        u("#pm25value").addClass("high-pollution");

      } else {
        u("#pm25value").attr("class", "default");
      }
    })


  getJSON(pm1url, function (err, data) {
    u("#pm1value").html(data.last_value);

    if (data.last_value > 12) {
      u("#pm1value").addClass("high-pollution");
    } else {
      u("#pm1value").attr("class", "default");
    }
  })


  getJSON(pm10url, function (err, data) {
      u("#pm10value").html(data.last_value);

      if (data.last_value > 12) {
        u("#pm10value").addClass("high-pollution");
      } else {
        u("#pm10value").attr("class", "default");
      }
    })

}

// Am I in Focus?

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
} getData();


function handleVisibilityChange() {
  if (document[hidden]) {
    console.log("Is hidden")
  } else {
    getData();
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log("Time to upgrade your browser");
} else {
  // Handle page visibility change   
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}


// Weather Initial Work
getJSON(tempf, function (err, data) {
  u("#tempf").html(data.last_value);
  // u("body#weather").attr("class", "weatherbg");
})

getJSON(humidity, function (err, data) {
  u("#humdity").html(data.last_value);
})

getJSON(pressure, function (err, data) {
  u("#pressure").html(data.last_value);
})

getJSON(forecast, function (err, data) {
  forecast_details = data;
  u("#forecast_time").html(forecast_details[0].name);
  u("#forecast").html(forecast_details[0].fullForecast);
  u("#forecast_time_future").html(forecast_details[1].name);
  u("#forecast_future").html(forecast_details[1].fullForecast);
  u("#forecast_time_future2").html(forecast_details[2].name);
  u("#forecast_future2").html(forecast_details[2].fullForecast);
})


