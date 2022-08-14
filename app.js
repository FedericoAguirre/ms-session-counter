require("dotenv").config();

const connection = require("./db_singleton");
const { pingRedis, getKpi, incrementKpi } = require("./service");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

const redis = connection.connect(
  process.env.REDIS_HOST,
  process.env.REDIS_PORT,
  process.env.REDIS_USERNAME,
  process.env.REDIS_PASSWORD,
  process.env.REDIS_ENABLE_READY_CHECK === "1" ? true : false,
  process.env.REDIS_KEEP_ALIVE === "1" ? true : false
);

router.use((req, _res, next) => {
  console.log(`Hour: ${Date.now()}|IP: ${req.ip}`);
  next();
});

router.get("/home", (_req, res) => {
  pingRedis(_req, res, redis);
});

router.get("/kpi", (req, res) => {
  getKpi(req, res, redis);
});

router.post("/counter", (req, res) => {
  incrementKpi(req, res, redis);
});

app.use(bodyParser.json());
app.use("/", router);

const server = app.listen(process.env.port || process.env.COUNTER_PORT);

console.log(
  "Session Counter is listening at port " +
    (process.env.port || process.env.COUNTER_PORT)
);
