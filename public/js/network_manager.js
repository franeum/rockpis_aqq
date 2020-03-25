// network-manager
// Empty JS for your own code to be here

let module_list = {}
let counter_id = 0
let selected_node_id = null 

let cy_content = {

  container: $('#the-network'), // container to render in
  elements: [ // list of graph elements to start with
    // nodes and edges
  ],
  style: cy_style,
  layout: {
    name: 'grid'
    //rows: 1
  }
}


let cy = cytoscape(cy_content);


let network_clear = () => {
  let collection = cy.elements('node');
  cy.remove( collection );
}


/*
 *  EVENTI
 */



// CLICK

cy.on('tap', (event) => {
  let data = event.target 
  if (data === cy) {
    selected_node_id = null 
  }
})


// RIGHT CLICK

cy.on('cxttap', (event) => {
  console.log("right click event")
  set_controller(event.position)
})


// NODE SELECTION

cy.on('select', 'node', (event) => {
  console.log("select event")

  let id_selected = event.target._private.data.id
  
  cy.$('#' + id_selected).classes('nodeSelectedClass')
  if (selected_node_id === null) {
    selected_node_id = id_selected
  } else {
    console.log("create edge?")
    create_edge(selected_node_id, id_selected)
    selected_node_id = id_selected 
  }
})


// EDGE SELECTION

cy.on('select', 'edge', (event) => {
  console.log("edge select event", event)

  let id_selected = event.target._private.data.id
  console.log(id_selected)
  cy.$('#' + id_selected).classes('edgeSelectedClass')
  /*
  if (selected_node_id === null) {
    selected_node_id = id_selected
  } else {
    console.log("create edge?")
    create_edge(selected_node_id, id_selected)
    selected_node_id = id_selected 
  }
  */
})


// UNSELECTION

cy.on('unselect', 'node', (event) => {
  console.log("unselect event")
  //console.log(event)
  let n = event.target._private.data.id
  cy.$('#' + n).classes('nodes')
  //selected_node_id = null 
})


cy.on('unselect', 'edge', (event) => {
  console.log("unselect edge event")
  //console.log(event)
  let n = event.target._private.data.id
  cy.$('#' + n).classes('edges')
  //selected_node_id = null 
})



Mousetrap.bind("ctrl+x", function() { 
  console.log('show shortcuts X')
});


let create_module_list = (array) => {
  Object.assign(module_list, array)
}


let create_node = (name, x, y) => {
  cy.add({
    group: 'nodes',
    data: { 'id': counter_id, label: name },
    position: { x: x, y: y }
  })
  
  counter_id += 1
  destroy_module_list()
}


let create_edge = (source, target) => {
  console.log(source, target)
  cy.add({
    group: 'edges',
    data: {
      source: source,
      target: target
    }
  })
}


let destroy_module_list = () => {
  $("#the-controller").empty()
}


let set_controller = (pos) => {
  /*
  $("#the-controller").empty()

  $("#the-controller").append(
    $("<div></div>")
      .addClass("row")
      .addClass("mx-3 my-5")
      .attr("id", "slider1")
  )
  */

  $("#the-controller").empty()

  Object.keys(module_list).forEach(x => {
    let parameters = `"${x}",${pos.x},${pos.y}`
    $("#the-controller").append(
      $("<div class='row'><button type='button' onclick='create_node(" + parameters + ")' class='btn btn-block btn-sm'>" + x + "</button></div>")
    )  
  })
}