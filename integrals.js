var calculateIntegral = function(points) {
  var val = 0;
  for (var v = 0; v < width; v++) {
    if (!isNaN(points[v])) {
      val += points[v];
    }
  }
  return val;
};

var midptSum = function(n, dx, points, yScale, postiveYAxis, xRange) {
  var area = 0;
  for (var g = n; g >= 0; g--) {
    var index = Math.floor(g * dx);
    var offset = Math.floor(dx / 2);
    stroke(0, 127, 127);
    fill(255, 0, 0, 120);
    rect(g * dx, positiveYAxis - points[index + offset]*yScale, 
          dx, points[index + offset]*yScale);
    segmentHeight = points[index + offset];
    if (!isNaN((segmentHeight * dx))) {
      area += (segmentHeight * dx);
    }
  } 
  return (xRange / n) * area;
};

var leftHandSum = function(n, dx, points, yScale, postiveYAxis) {
  var area = 0;
  for (var g = n; g >= 0; g--) {
    var index = Math.floor(g * dx);
    stroke(0, 127, 127);
    fill(255, 0, 0, 120);
    rect(g * dx, positiveYAxis - points[index]*yScale, dx, points[index]*yScale);
    segmentHeight = points[index];
    area += (segmentHeight * dx);
  } 
  return (xRange / n) * area;
};

var trapezoidalSum = function(n, dx, points, yScale, postiveYAxis, xRange) {
  var area = 0;
  for (var g = 0; g < n; g++) {
    var index = Math.floor(g * dx);
    var index2 = Math.floor((g + 1) * dx);
    stroke(0, 127, 127);
    fill(255, 0, 0, 120);
    quad((g + 1) * dx, positiveYAxis, g * dx, positiveYAxis, 
          g * dx, positiveYAxis - points[index]*yScale, (g + 1) * dx, 
          positiveYAxis - points[index2]*yScale);
    if (g == 0 || g == n - 1){
      area += points[index];
    }
    else {
      area += 2*points[index];
    }    
  }  
  return (xRange/ n) * area / 2 ;
};
