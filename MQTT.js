/*
 * This module runs the MQTT broker instance and displays messages on the console
 */
module.exports = {
  broker: () => {
    let mosca = require("mosca");
    let moscaSettings = {
      port: 1883,
    };
    let server = new mosca.Server(moscaSettings);
    server.on("ready", () => {
      console.log("Mosca instance initialised and running");
    });
    server.on("clientConnected", (client) => {
      console.log("Client connected with ID ", client.id);
    });
    server.on("published", (packet, client) => {
      console.log(
        `Broker: new message on topic ${packet.topic.toString()}:${packet.payload.toString()}`
      );
    });
  },
  subscriber: function () {
    this.mqtt = require("mqtt");
    this.client = null;
    this.connect = () => {
      this.client = this.mqtt.connect("http://localhost:1883", {
        clientId: "API",
      });
    };
    this.publish = (topic, message) => {
      this.client.publish(topic, message);
    };
  },
};
