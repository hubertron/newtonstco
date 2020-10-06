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

$.getJSON(avg25)
 .then(function(data) {
  avgValue = data.last_value
  $("#avg25value").append(avgValue);
  $("body").addClass("default-bg");
  let date = new Date(data.updated_at);

  let timeFormat = date.toLocaleDateString("en-US", dateOptions);
  $("#lastUpdate").append(timeFormat);
 
 if (avgValue > 250) {
   $("body").attr("class", "hazardous");
   $("#avg25").append("<div class='descriptive'>Hazardous</div>")
   } else if (avgValue > 150) {
    $("body").attr("class", "very-unhealthy");
    $("#avg25").append("<div class='descriptive'>Very Unhealthy</div>")
   } else if (avgValue > 55) {
    $("body").attr("class", "unhealthy");
    $("#avg25").append("<div class='descriptive'>Unhealthy</div>")
   } else if (avgValue > 35) {
    $("body").attr("class", "unhealthySensitive");
    $("#avg25").append("<div class='descriptive'>Unhealthy for Sensitive Groups</div>")
   } else if (avgValue > 12) {
    $("body").attr("class", "moderate");
    $("#avg25").append("<div class='descriptive'>Moderate</div>")
   } else {
   $("#avg25value").attr("class", "default");
   $("body").attr("class", "default-bg");
    $("#avg25").append("<div class='descriptive'>Healthy</div>")
  }
  
 })
 

 .fail(function() {
  // ...didn't work, handle it
 });

$.getJSON(pm25url)
 .then(function(data) {
  $("#pm25value").append(data.last_value);


  if (data.last_value > 12) {
   $("#pm25value").addClass("high-pollution");

  } else {
   $("#pm25value").attr("class", "default");
  }
 })
 .fail(function() {
  // ...didn't work, handle it
 });

$.getJSON(pm1url)
 .then(function(data) {
  console.log("success");

  $("#pm1value").append(data.last_value);

  if (data.last_value > 12) {
   $("#pm1value").addClass("high-pollution");
  } else {
   $("#pm1value").attr("class", "default");
  }
 })
 .fail(function() {
  // ...didn't work, handle it
 });

$.getJSON(pm10url)
 .then(function(data) {
  $("#pm10value").append(data.last_value);

  if (data.last_value > 12) {
   $("#pm10value").addClass("high-pollution");
  } else {
   $("#pm10value").attr("class", "default");
  }
 })
 .fail(function() {
  // ...didn't work, handle it
 });
