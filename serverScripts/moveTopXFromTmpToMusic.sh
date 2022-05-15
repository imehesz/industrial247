#!/bin/bash

PATH_FROM=$1;
PATH_TO=$2;
MAX_FILES=2;
FILE_CNT=0;

if [ -z "$PATH_FROM" ] || [ -z "$PATH_TO" ]
then
    echo "USAGE: moveTopXFromTmpToMusic /path/to/tmp/folder /path/to/music/folder";
else
    ls $PATH_FROM/*.mp3 |sort -R |tail -$N |while read file; do
        if [ "$FILE_CNT" -lt "$MAX_FILES" ]
        then
                echo "$file<br/>" >> /PATH/TO/www/i247songs.html
                mv $file $PATH_TO/.
        fi

        ((FILE_CNT++))
    done
fi