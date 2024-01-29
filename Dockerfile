FROM --platform=linux/amd64 node:18
ENV DATABASE_URL="DATABASE_URL"

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn prisma generate

EXPOSE 3333

CMD yarn prisma migrate dev && yarn dev


