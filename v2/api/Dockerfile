FROM golang:1.17 AS build

WORKDIR /app

ADD go.mod ./
ADD cmd /app/cmd

RUN go build -o /main /app/cmd

FROM scratch

WORKDIR /

COPY --from=build /main /main

USER 1000

ENTRYPOINT ["/main"]