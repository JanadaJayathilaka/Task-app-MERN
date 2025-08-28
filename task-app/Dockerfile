FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install    
# can use ci(clean install) for the exact versions of dependencies


COPY . ./

CMD ["npm", "start"]
