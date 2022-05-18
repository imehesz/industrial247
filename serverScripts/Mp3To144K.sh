#!/bin/bash
MUSIC=$1
BITRATE="144k"

if [ -d "$MUSIC" ]
then
    find "${MUSIC}" -name "*.mp3" -execdir echo "{}" \; -exec mv "{}" "{}.mp3" \; -exec ffmpeg -y -loglevel "error" -i "{}.mp3" -acodec libmp3lame  -ab $BITRATE "{}" \; -exec rm "{}.mp3" \;
else
    echo "USAGE: Mp3To144k.sh /path/to/music/folder/"
fi