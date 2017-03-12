////////////////////////////////////////////////////////////
////////////////// Lecture des données /////////////////////
////////////////////////////////////////////////////////////
var width = 960,
    height = 500;

var x = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, height])
    .range([height, 0]);





var w = window.innerWidth - 22,
    h = window.innerHeight - 22,
    i = 0,
    j = 0,
    step = 10;

d3.json('./data/runs.json', function (error, data) {

  if (error) throw error;
  
  var canvas = d3.select("body").append("canvas")
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed))
      .node().getContext("2d");

  
  //////////////////////////////////////////////////////////////
  ////////////////// altitude: 168           ///////////////////
  ////////////////// latitude: 49.110855     ///////////////////
  ////////////////// longitude: 6.159251     ///////////////////
  ////////////////// routeDate: "2012-12-05" ///////////////////
  ////////////////// tempid: 1               ///////////////////
  //////////////////////////////////////////////////////////////
  
  //////////////////////////////////////////////////////////////
  //////////////// Allègement du jeu de données ////////////////
  //////////////////////////////////////////////////////////////
  var dataLight = [];

  for (i = 0; i < data.length/step; i++) {
    dataLight[i] = data[j];
    dataLight[i].routeYear = data[j].routeDate.substring(0, 4);
    switch(data[j].routeDate.substring(0, 4)) {
    case "2011":
        dataLight[i].color = "yellow";
        break;
    case "2012":
        dataLight[i].color = "orange";
        break;
    case "2013":
        dataLight[i].color = "red";
        break;
    case "2014":
        dataLight[i].color = "green";
        break;
    case "2015":
        dataLight[i].color = "blue";
        break;
    default:
        dataLight[i].color = "black";
    }
    
    j += step;
    
  }

  draw();

  function zoomed() {
    canvas.clearRect(0, 0, width, height);
    draw();
  }

  function draw() {
    var i = -1, n = dataLight.length, d, cx, cy;
    canvas.beginPath();
    while (++i < n) {
      d = dataLight[i];
      cx = x(w/10 + (d.longitude-6)*3000);
      cy = y(w/10 + (d.latitude-49)*3000);
      canvas.moveTo(cx, cy);
      canvas.arc(cx, cy, 1, 0, 2 * Math.PI);
    }
    canvas.fill();
  }
  
});