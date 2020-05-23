/**
 * This is the module handling all backend API operations,
 * namely MQTT message handling and UI request processing
 */
module.exports = function (clientInstance) {
  this.boxes = [];
  clientInstance.connect();
  clientInstance.publish("hello", "hello");
  clientInstance.subscribe("boxes/#");
  clientInstance.subscribe("$SYS/#");
  clientInstance.onMessage((topic, message) => {
    console.log(`API: new message on topic ${topic}: ${message}`);
    //Handle new box
    if (topic === "boxes") {
      console.log("New box: parsing data...");
      let box = JSON.parse(message);
      console.log(box);
      this.boxes.push(box);
      clientInstance.publish(`boxes/${box.id}`, `Arduino${box.id} registered`);
    }
    //Handle box removal
    if (topic.includes("disconnect")) {
      let id = message.slice(message.indexOf("Arduino") + 7);
      console.log(`Disconnect: ${id}`);
      this.removeBox(id);
    }
  });
  //Function that returns the box with the specified id
  this.findBoxById = (id) => {
    return this.boxes.find((element) => element.id === id);
  };
  //Function that removes the box with the specified id
  this.removeBox = (id) => {
    let index = this.boxes.indexOf(this.findBoxById(id));
    this.boxes.splice(index, 1);
  };
  //Function that replaces a box with updated information
  this.updateBox = (newBox) => {
    let index = this.boxes.indexOf(this.findBoxById(newBox.id));
    console.log(`API: box index is ${index}`);
    this.boxes.splice(index, 1, newBox);
    console.log(this.boxes);
    clientInstance.publish(`boxes/${newBox.id}`, `${JSON.stringify(newBox)}`);
  };
};
