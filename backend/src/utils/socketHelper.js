module.exports = {
  encoderPacket: function (event, data) {
    const packet = {
      type: event,
      data: data,
    };
    return JSON.stringify(packet);
  },

  decodePacket: function (packet) {
    return JSON.parse(packet);
  },
};
