const amqplib = require("amqplib");
require("dotenv").config();
const MSG_QUEUE_URL = process.env.MSG_QUEUE_URL;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
const QUEUE_NAME = process.env.QUEUE_NAME;
const BINDING_KEY = process.env.BINDING_KEY;

module.exports.createChannel = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 120000));
    const rabbitmqUrl = "amqp://rabbitmq:5672";
    const connection = await amqplib.connect(rabbitmqUrl);
    // "amqp://localhost/"
    // connection.on("error", function (handle) {});
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (err) {
    throw err;
  }
};

module.exports.publishMessage = async (channel, binding_key, msg) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(msg));
  } catch (e) {
    console.log(e, "inside public messageesss");
  }
};

module.exports.subscribeMessage = async (channel, service) => {
  const q = await channel.assertQueue(QUEUE_NAME);

  channel.bindQueue(q.queue, EXCHANGE_NAME, BINDING_KEY);

  channel.consume(q.queue, (msg) => {
    if (msg.content) {
      console.log("the message is:", msg.content.toString());
      channel.ack(data);
      // service.SubscribeEvents(msg.content.toString());
    }
  });
};
