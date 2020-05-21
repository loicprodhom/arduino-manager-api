module.exports = function () {
  this.mqtt = require("mqtt");
  this.client = null;
  this.connect = () => {
    this.client = this.mqtt.connect("http://localhost:1883", {
      clientId: "API",
    });
  };
  this.publish = function (topic, message) {
    this.client.publish(topic, message);
  };
  this.subscribe = function (topic) {
    this.client.subscribe(topic);
  };
  this.onMessage = function (callback) {
    this.client.on("message", callback);
  };
};
