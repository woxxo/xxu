FROM oven/bun:latest
RUN mkdir -p /usr/src
RUN cd /usr/src && bun create woxxo/xxu
WORKDIR /usr/src/xxu
RUN cd /usr/src/xxu
EXPOSE 8811/tcp
ENTRYPOINT [ "bun", "run", "start" ]
