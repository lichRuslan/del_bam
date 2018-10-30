FROM gliderlabs/alpine:3.1

RUN apk --update add nodejs

RUN mkdir /src

WORKDIR /src

COPY . /src
RUN npm install

EXPOSE 3000

CMD ["node", "/src/server.js"]
