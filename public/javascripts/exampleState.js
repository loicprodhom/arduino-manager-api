const example = (state, newState) => {
  state = {
    id: 1,
    IP: "192.168.0.91",
    mac: "dead.aaaa.feed",
    type: "Relay",
    data: {
      relay1Status: "ON",
      relay2Status: "ON",
      relay1: "3.5A",
      relay2: "2.5A",
    },
  };

  newState = {
    id: 1,
    IP: "192.168.0.91",
    mac: "dead.aaaa.feed",
    type: "Relay",
    data: {
      relay1Status: "OFF",
      relay2Status: "ON",
      relay1: "3.5A",
      relay2: "2.5A",
    },
  };
};
