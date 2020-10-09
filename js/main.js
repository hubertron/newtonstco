pm1url = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.pm1";
pm25url = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.pm25";
pm10url = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.pm10";
avg25 = "https://io.adafruit.com/api/v2/drkpxl/feeds/pollution.avg25";

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
  getJSON(avg25, function (err, data) {
    avgValue = data.last_value
    u("#avg25value").html(avgValue);
    u("body").addClass("default-bg");
    let date = new Date(data.updated_at);

    let timeFormat = date.toLocaleDateString("en-US", dateOptions);
    u("#lastUpdate").html(timeFormat);

    if (avgValue > 250) {
      u("body").attr("class", "hazardous");
      u(".descriptive").html("Hazardous")
    } else if (avgValue > 150) {
      u("body").attr("class", "very-unhealthy");
      u(".descriptive").html("Very Unhealthy")
    } else if (avgValue > 55) {
      u("body").attr("class", "unhealthy");
      u(".descriptive").html("Unhealthy")
    } else if (avgValue > 35) {
      u("body").attr("class", "unhealthySensitive");
      u(".descriptive").html("Unhealthy for Sensitive Groups")
    } else if (avgValue > 12) {
      u("body").attr("class", "moderate");
      u(".descriptive").html("Moderate")
    } else {
      u("#avg25value").attr("class", "default");
      u("body").attr("class", "default-bg");
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