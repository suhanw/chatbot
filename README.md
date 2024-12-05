# Local development

1. Build and start Docker containers:

```
npm start
```

2. Monitor logs:

```
docker compose logs -f
```

3. Tear down Docker containers:

```
npm stop
```

# Build and deploy

Build the server:

```
docker build -f ./server/Dockerfile . -t server
```
