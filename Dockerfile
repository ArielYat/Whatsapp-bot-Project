FROM node:16.14.0
RUN apt-get update || : && apt-get install python -y

# Install latest chrome dev package
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/google-chrome-stable
ENV PUPPETEER_PRODUCT chrome

RUN mkdir /app

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

ENV TZ=Asia/Jerusalem
RUN ln -fs /usr/share/zoneinfo/$TZ /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN apt-get install -y tmux
RUN apt-get install -y openvpn
RUN wget "https://raw.githubusercontent.com/ProtonVPN/scripts/master/update-resolv-conf.sh" -O "/etc/openvpn/update-resolv-conf"
RUN chmod +x /etc/openvpn/update-resolv-conf
RUN chmod +x /app/script.sh
RUN /app/script.sh
COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/bin/sh", "-c", "/app/entrypoint.sh && npm start"]