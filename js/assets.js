var nodes, edges, network;

// convenience method to stringify a JSON object
function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}

function addNode() {
  try {
    var id = document.getElementById("node-label").value;
    for (let i = 1; i <= id; i++) {
      nodes.add({
        id: i,
        label: `${i}`,
      });
    }
    document.getElementById("crearNodo").innerHTML = `
    <div class="alert alert-success" role="alert">
      Se ha creado una grafica de ${id} nodos
    </div>`;
  } catch (err) {
    alert(err);
  }
}

function addEdge() {
  try {
    var from = parseInt(document.getElementById("edge-from").value);
    var to = parseInt(document.getElementById("edge-to").value);
    edges.add({
      id: edges.length + 1,
      from: from,
      to: to,
    });
    document.getElementById("crearEdge").innerHTML = "";
    document.getElementById("crearEdge").innerHTML = `
    <div class="alert alert-success" role="alert">
      Se ha creado una conexion de ${from} con ${to}
    </div>`;
  } catch (err) {
    alert(err);
  }
}

function edgeRandom() {
  var id = document.getElementById("node-label").value;
  var conec = edges.get();
  for (let b = 1; b <= conec.length; b++) {
    edges.remove({
      id: b,
    });  
  }
  for (let a = 1; a <= 6; a++) {
    var from = Math.floor(Math.random() * (id - 1 + 1) + 1);
    var to = Math.floor(Math.random() * (id - 1 + 1) + 1);;
    for (let c = 0; c < conec.length; c++) {
      if (conec[c].from == from && conec[c].to == to) {
        c = conec.length
        a = a - 1
      } else {
        if (c == (conec.length - 1)) {
          edges.add({
            id: edges.length + 1,
            from: from,
            to: to,
          });
        }
      }
    }
  }
}
function draw() {
  nodes = new vis.DataSet();
  edges = new vis.DataSet();
  edges.on("*", function () {
    var id = document.getElementById("node-label").value;
    var tabla = "";
    for (let i = 1; i <= id; i++) {
      tabla += `<th>${i}</th>`;
    }
    var id = document.getElementById("node-label").value;
    var d = 0;
    var datos = "";
    document.getElementById("datos").innerHTML = "";
    var conec = edges.get();
    for (let i = 1; i <= id; i++) {
      datos += `<tr>`;
      datos += `<th scope="row">${i}</th>`;
      for (let a = 1; a <= id; a++) {
        for (let c = 0; c < conec.length; c++) {
          if (conec[c].from == i && conec[c].to == a) {
            d = 1;
            datos += `<td>${d}</td>`;
            c = conec.length;
          } else {
            if (c == conec.length - 1) {
              d = 0;
              datos += `<td>${d}</td>`;
            }
          }
        }
      }
      datos += `</tr>`;
    }
    document.getElementById("datos").innerHTML = `
    <table class="table table-bordered table-hover">
    <thead>
        <tr>
          <th></th>
          ${tabla}
        </tr>
      </thead>
      <tbody>
        ${datos}
      </tbody>
    </table>
    `;
  });
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  network = new vis.Network(container, data, options);
}
