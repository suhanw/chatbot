# Local development

1. Start services:

```
docker compose up --build
```

2. Monitor logs:

```
docker compose logs -f
```

3. Stop services:

```
docker compose down
```


# Build and deploy

Build the server:

```
docker build -f ./server/Dockerfile . -t server
```
