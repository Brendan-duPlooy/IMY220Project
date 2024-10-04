# IMY220Project

u23605376 Brendan du Plooy D0-D1

docker build -t imy220-playlist-sharing .

docker run --name imy220-playlist-sharing --env-file .env -p 3000:3000 imy220-playlist-sharing