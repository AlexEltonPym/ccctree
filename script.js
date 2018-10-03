var w = 500;
var h = 300;


var challenges = [];

//backbone
challenges.push({
  title: "The flipped triangle",
  challengeType: "backbone",
  topic: "Loops",
  time: "10 minutes",
  difficulty: 1,
  description: "Flip the triangle",
  tags: ["grid", "loop", "triangle"],
  id: 0,
  prerequisites: [],
  fixed: true,
  fx: w / 4 * 1,
  fy: h / 2,
});

challenges.push({
  title: "Conditionals",
  challengeType: "backbone",
  topic: "Using conditionals",
  time: "40 minutes",
  difficulty: 1,
  description: "Use conditionals in a loop to make patterns",
  tags: ["loops", "if", "for", "conditional", "less than", "random"],
  id: 1,
  prerequisites: [0],
  fixed: true,
  fx: w / 4 * 2,
  fy: h / 2,
});

challenges.push({
  title: "Recursive tree",
  challengeType: "backbone",
  topic: "Functions and Recursion",
  time: "30 minutes",
  difficulty: 1,
  description: "Use a recursive function to generate a natural looking tree.",
  tags: ["function", "recursion", "tree", "simulation"],
  id: 2,
  prerequisites: [1],
  fixed: true,
  fx: w / 4 * 3,
  fy: h / 2,
}); //end backbone

challenges.push({ //intermediates
  title: "A",
  challengeType: "normal",
  topic: "A topic",
  time: "10 minutes",
  difficulty: 1,
  description: "A description",
  tags: ["A", "A1", "A2"],
  id: 3,
  prerequisites: [0],
});

challenges.push({
  title: "B",
  challengeType: "normal",
  topic: "B topic",
  time: "10 minutes",
  difficulty: 1,
  description: "B description",
  tags: ["B", "B1", "B2"],
  id: 4,
  prerequisites: [0, 1],
});

challenges.push({
  title: "C",
  challengeType: "normal",
  topic: "C topic",
  time: "10 minutes",
  difficulty: 1,
  description: "C description",
  tags: ["C", "C1", "C2"],
  id: 5,
  prerequisites: [2],
}); //end intermediate

challenges.push({ //open ended
  title: "D",
  challengeType: "open",
  topic: "D topic",
  time: "10 minutes",
  difficulty: 1,
  description: "D description",
  tags: ["D", "D1", "D2"],
  id: 6,
  prerequisites: [3],
});

challenges.push({ //open ended
  title: "E",
  challengeType: "open",
  topic: "E topic",
  time: "10 minutes",
  difficulty: 1,
  description: "E description",
  tags: ["E", "E1", "E2"],
  id: 7,
  prerequisites: [3],
});


challenges.push({ //open ended
  title: "F",
  challengeType: "open",
  topic: "F topic",
  time: "10 minutes",
  difficulty: 1,
  description: "F description",
  tags: ["F", "F1", "F2"],
  id: 8,
  prerequisites: [4],
});

challenges.push({ //open ended
  title: "G",
  challengeType: "open",
  topic: "G topic",
  time: "10 minutes",
  difficulty: 1,
  description: "G description",
  tags: ["G", "G1", "G2"],
  id: 9,
  prerequisites: [5],
}); //end open ended


var students = [];

students.push({
  studentID: "450157028",
  name: "Alex",
  challenges: [],
});


var dataset = {
  "nodes": [],
  "edges": []
};

for (let challenge of challenges) {
  //let challenge = JSON.parse(JSON.stringify(challenges[j])); //for json parsing
  students[0].challenges.push({
    challengeId: challenge.id,
    status: "unavailable",
  });

  dataset.nodes.push(challenge);

  for (let pre of challenge.prerequisites) {
    dataset.edges.push({ source: pre, target: challenge.id });
  }
}
students[0].challenges[0].status = "complete";
students[0].challenges[1].status = "complete";
students[0].challenges[2].status = "complete";




for (let challenge of challenges) { //for each challenge
  let completedPres = true; //assume we have completed prerequisates

  for (let pre of challenge.prerequisites) { //for each of that challenge's prerequisates
    for (let selfCheck of students[0].challenges) { //check you have completed that prerequisate
      if (selfCheck.challengeId == pre && selfCheck.status !== "complete") {
        completedPres = false;
      }
    }
  }

  if (students[0].challenges[challenge.id].status != "complete") {
    students[0].challenges[challenge.id].status = completedPres ? "available" : "unavailable";
  }
}



var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var bg = svg.append("rect") 
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "pink");

// build the arrow.
svg.append("svg:defs").selectAll("marker")
  .data(["end"]) // Different link/path types can be defined here
  .enter().append("svg:marker") // This section adds in the arrows
  .attr("id", String)
  .attr("viewBox", "0 -5 10 10")
  .attr("refX", 15)
  .attr("refY", 0)
  .attr("markerWidth", 10)
  .attr("markerHeight", 10)
  .attr("orient", "auto")
  .append("svg:path")
  .attr("d", "M0,-5L10,0L0,5");

var force = d3.forceSimulation(dataset.nodes)
  .force("charge", d3.forceManyBody().strength(-6))
  .force("link", d3.forceLink(dataset.edges))
  .force("center", d3.forceCenter().x(w / 2).y(h / 5 * 3));


var edges = svg.selectAll("line")
  .data(dataset.edges)
  .enter()
  .append("line")
  .style("stroke", "#222")
  .style("stroke-width", 1)
  .attr("marker-end", "url(#end)");

var nodes = svg.selectAll("circle")
  .data(dataset.nodes)
  .enter()
  .append("circle")
  .attr("r", 8)
  .style("fill", function(d, i) {
    /* if (d.challengeType == "backbone") {
       return "black";
     } else if (d.challengeType == "normal") {
       return "red";
     } else if (d.challengeType == "open") {
       return "blue";
     } else {
       return "green";
     }*/
    let challengeStatus = students[0].challenges[d.id].status;

    if (challengeStatus == "unavailable") {
      return "black";
    } else if (challengeStatus == "available") {
      return "red";
    } else if (challengeStatus == "complete") {
      return "blue";
    } else {
      return "green";
    }
  });

force.on("tick", function() {

  edges.attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  nodes.attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });

});

bg.on("click", function(d) {
  d3.select("#modal").classed("hidden", true);
  d3.select("svg").classed("lightboxed", false);
});
nodes.on("click", function(d) {
  updateModal(d, this);
});

nodes.on("mouseover", function(d) { //event when we mouseover
    if (d3.select("#modal").classed("hidden")) {
      updateTooltip(d, this);
    }
  })
  .on("mouseout", function(d) {
    d3.select("#tooltip").classed("hidden", true);
  });

function updateTooltip(d, me) {

  //get tooltip location
  var xPosition = parseFloat(d3.select(me).attr("cx"));
  var yPosition = parseFloat(d3.select(me).attr("cy"));

  //update tooltip location and value
  d3.select("#tooltip")
    .style("left", xPosition + "px")
    .style("top", yPosition + "px");
  d3.select("#title")
    .text(d.title);
  d3.select("#topic")
    .text(d.topic);
  d3.select("#description")
    .text(d.description);

  //use hidden css to hide and show the tooltip
  d3.select("#tooltip").classed("hidden", false);

}


function updateModal(d, me) {

  //get tooltip location
  var xPosition = 0;
  var yPosition = 0;

  //update tooltip location and value
  //d3.select("#modal")
  ///.style("left", xPosition + "px")
  //.style("top", yPosition + "px");
  d3.select("#modalTitle")
    .text(d.title);
  d3.select("#modalTopic")
    .text(d.topic);
  d3.select("#modalDescription")
    .text(d.description);
  d3.select("#challengeLink")
    .attr("href", d.title);
  //use hidden css to hide and show the tooltip
  d3.select("#tooltip").classed("hidden", true);
  d3.select("#modal").classed("hidden", false);
  d3.select("svg").classed("lightboxed", true);

}