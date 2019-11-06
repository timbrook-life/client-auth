FROM node:12-alpine

ADD https://releases.hashicorp.com/consul-template/0.22.0/consul-template_0.22.0_linux_amd64.tgz /consul-template.tgz
RUN tar -xzf /consul-template.tgz
RUN rm /consul-template.tgz

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn install

RUN npm run compile

EXPOSE 3000
CMD ["/consul-template", "-log-level", "debug", "-config", "/usr/src/app/conf/config.hcl"]