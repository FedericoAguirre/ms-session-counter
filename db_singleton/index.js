const { default: Redis } = require("ioredis");

class RedisClient {
  constructor() {
    this.client = null;
  }

  connect(host, port, username, password, enableReadyCheck, keepAlive) {
    try {
      this.client = new Redis({
        host: host,
        port: port,
        username: username,
        password: password,
        enableReadyCheck: enableReadyCheck,
        keepAlive: keepAlive,
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    return this.client;
  }

  async disconnect() {
    if (this.client !== null && this.client.isOpen) {
      await this.client.quit();
      console.log(`Is Redis open?: ${this.client.isOpen}`);
      this.client = null;
    }
  }
}

module.exports = new RedisClient();
