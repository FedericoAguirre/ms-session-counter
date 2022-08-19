const url = require("url");
const { WebResponse, CounterResponse } = require("../model");

function _logError(error, res) {
  console.error(error);
  res.status(500).send(WebResponse.get(true, "Look in logs for errors.", null));
}

function pingRedis(_req, res, redis) {
  let pingPromise = redis.ping();
  pingPromise
    .then((result) => {
      if (result == "PONG") {
        res.status(200).send(WebResponse.get(false, "Service OK.", null));
      }
    })
    .catch((reason) => _logError(reason, res));
}

function getKpi(req, res, redis) {
  const queryParams = url.parse(req.url, true).query;
  const hgetallPromise = redis.hgetall(queryParams["key"]);
  hgetallPromise
    .then((result) => {
      if (Object.entries(result).length !== 0) {
        res.status(200).send(WebResponse.get(false, "OK.", result));
      } else {
        res.status(404).send(WebResponse.get(true, "Key NOT FOUND.", result));
      }
    })
    .catch((reason) => _logError(reason, res));
}

function _getKeyAndHour(req) {
  date = new Date(req.body.timestamp);
  dateString = date.toISOString().split("T")[0].replace(/-/g, "");
  hour = date.getUTCHours();
  key = `kpi:sessions:app:${req.body.app}:node:${req.body.node}:day:${dateString}`;
  return {
    key: key,
    hour: hour,
  };
}

function _incrementKpi(kpi, redis) {
  return redis
    .multi()
    .hincrby(kpi.key, "day", 1)
    .hincrby(kpi.key, kpi.hour.toString(), 1)
    .exec(true);
}

function _validateIncrement(result) {
  return result
    .map((value) => (value[1] > 0 ? 0 : 1))
    .reduce((previousValue, currentValue) => previousValue + currentValue);
}

function incrementKpi(req, res, redis) {
  kpi = _getKeyAndHour(req);
  const watchPromise = redis.watch(kpi.key);
  watchPromise
    .then((_result) => {
      const incrementKpiPromise = _incrementKpi(kpi, redis);
      incrementKpiPromise
        .then((result) => {
          console.debug(result);
          sum = _validateIncrement(result);
          if (sum == 0) {
            cr = CounterResponse.get(kpi.key, result[0][1], result[1][1]);
            wr = WebResponse.get(false, "OK.", cr);
            res.status(200).send(wr);
          } else {
            _logError(
              `Key: ${kpi.key}|Hour: ${kpi.hour}|Sum: ${sum}\n${result}`,
              res
            );
          }
        })
        .catch((reason) => _logError(reason, res));
    })
    .catch((reason) => _logError(reason, res));
}

module.exports = { pingRedis, getKpi, incrementKpi };
