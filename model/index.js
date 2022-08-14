class WebResponse {
  static type = "WebResponse";
  static get(isError, description, data = null) {
    return {
      type: this.type,
      isError: isError,
      description: description,
      data: data,
    };
  }
}

class CounterResponse {
  static type = "CounterResponse";
  static get(key, day, hour) {
    return {
      type: this.type,
      key: key,
      day: day,
      hour: hour,
    };
  }
}

module.exports = { WebResponse, CounterResponse };
