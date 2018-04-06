FROM node:9
WORKDIR /tmp
RUN wget ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/1.3/GraphicsMagick-1.3.28.tar.gz
RUN tar -xvf GraphicsMagick-1.3.28.tar.gz
WORKDIR /tmp/GraphicsMagick-1.3.28
RUN ./configure
RUN make
RUN make install
WORKDIR /app
