#!/bin/bash

FILE=$1;
ARTIST=$2;
ALBUM="";
SONG=$3;
DONE=false;
OK="n";

echo "Hello, welcome to id3TagSetter!"

if [ -z "$FILE" ]
then
  echo "USAGE: id3TagSetter /path/to/file/song.mp3";
else
  while [ ! $FINISHED ]
  do
    if [ -z "$ARTIST" ]
    then
      echo "Artist:";
      read ARTIST;
    fi

    echo "Album:";
    read ALBUM;

    if [ -z "$SONG" ]
    then
      echo "Title/Song:";
      read SONG;
    fi

    echo "= - = - = - = - = - =";
    echo "=   ARE YOU SURE?   =";
    echo "= - = - = - = - = - =";

    printf "File: $FILE\r\nArtist: $ARTIST\r\nAlbum: $ALBUM\r\nSong:$SONG\r\n";

    echo "OK (y/n)?";
    read OK;

    if [ "$OK" == "y" ]
    then
      FINISHED=true;
    fi
  done

  echo "Setting ID3 tags ...";
  `id3v2 -a "$ARTIST" $FILE`;
  `id3v2 -A "$ALBUM" $FILE`;
  `id3v2 -t "$SONG" $FILE`;

  echo "Done ...";
  echo `id3v2 -l $FILE`;
fi