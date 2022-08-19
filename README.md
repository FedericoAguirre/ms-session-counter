# ms-session-counter

This is a **Redis + Nodejs** backend microservice used for count sessions from another apps.

It can keep the session count by application, node and day (and hours). Very useful for realtime dashboards.

It is a REST API which has 3  methods:
1. **/kpi** (GET) method. It retrieves the hourly and daily counters of a particular application, node and date.
2. **/counter** (POST) method. It receives the application, node and timestamp of a new session and increases the hourly and daily counts.
3. **/home** (GET) method. It checks the microservice and Redis status doing a PING command and sending back an OK response.
4. **/dashboard** (GET) method. Shows a realtime  dashboard which updates every 100 ms. TODO.

![Architecture](docs/img/architecture.png)


[Insert app screenshots](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#uploading-assets)

# Overview video (Optional)

Here's a short video that explains the project and how it uses Redis:

[Insert your own video here, and remove the one below]

[![Embed your YouTube video](https://i.ytimg.com/vi/vyxdC1qK4NE/maxresdefault.jpg)](https://www.youtube.com/watch?v=vyxdC1qK4NE)

## How it works

### How the data is stored:

Counters are stored in [**Redis Hashes**](https://redis.io/docs/data-types/hashes/). It has the benefit of saving a whole day of session counts having a small footprint and at the same time be able to get a whole day of data in one single record.

Session counter (Hash) is saved in this form:

The key has the format:

```kpi:sessions:app:{application}:node:{nodeNumber}:day:{YYYYMMDD}```

You can see its composition that follows [Redis suggestions](https://redis.com/blog/5-key-takeaways-for-developing-with-redis/).

| Prefix | Value |
|-|-|
| kpi | sessions *fixed value |
| app | Application str |
| node | Node number |
| day | Sessions date in format: YYYYMMDD |

The application uses [transactions](https://redis.io/docs/manual/transactions/) to ensure unique counts and avoid race conditions.



Refer to [this example](https://github.com/redis-developer/basic-analytics-dashboard-redis-bitmaps-nodejs#how-the-data-is-stored) for a more detailed example of what you need for this section.

### How the data is accessed:

Refer to [this example](https://github.com/redis-developer/basic-analytics-dashboard-redis-bitmaps-nodejs#how-the-data-is-accessed) for a more detailed example of what you need for this section.

### Performance Benchmarks

[If you migrated an existing app to use Redis, please put performance benchmarks here to show the performance improvements.]

## How to run it locally?

[Make sure you test this with a fresh clone of your repo, these instructions will be used to judge your app.]

### Prerequisites

- Redis version 6+
- Nodejs version 12+
### Local installation

#### Session counter setup

1. Install **Node js**. Take as reference the [Node js downloads page](https://nodejs.org/en/download/).
2. Create a **.env** file at this project root folder with your own parameters. You can use the **.env-template** file as reference.
3. With **Redis** set and running. Start the **Session counter** app. Using the command:

```bash
node app.js
```

[Insert instructions for local installation]

## Deployment

To make deploys work, you need to create free account on [Redis Cloud](https://redis.info/try-free-dev-to)

### Google Cloud Run

[Insert Run on Google button](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-button-click-to-deploy-your-git-repos-to-google-cloud)

### Heroku

[Insert Deploy on Heroku button](https://devcenter.heroku.com/articles/heroku-button)

### Netlify

[Insert Deploy on Netlify button](https://www.netlify.com/blog/2016/11/29/introducing-the-deploy-to-netlify-button/)

### Vercel

[Insert Deploy on Vercel button](https://vercel.com/docs/deploy-button)

## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
    - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
        - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
    - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
        - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
    - [Redis OM Python](https://github.com/redis/redis-om-python)
        - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
    - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
        - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
    - [Official Redis Youtube channel](https://redis.info/youtube)
    - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
    - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
    - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io
    - [Microservices with Redis Course](https://www.youtube.com/watch?v=Cy9fAvsXGZA) by Scalable Scripts on freeCodeCamp

# ms-session-counter

## Setup

### Redis setup

Check the [Redis documentation](docs/REDIS_README.md).

### Session counter setup

1. Install **Node js**. Take as reference the [Node js downloads page](https://nodejs.org/en/download/).
2. Create a **.env** file at this project root folder with your own parameters. You can use the **.env-template** file as reference.
3. With **Redis** set and running. Start the **Session counter** app. Using the command:

```bash
node app.js
```