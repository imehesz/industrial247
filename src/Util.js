/**
 * Util.js
 */
import { mainWord } from './stores.js'

export const Util = {
    ArrayUtil: {
        shuffle: (arr) => {
            var currentIndex = arr.length,  randomIndex;

            while (currentIndex != 0) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex], arr[currentIndex]];
            }

            return arr;
        }
    },

    StringUtil: {
        padLeft: (str, pad, len) => (new Array(len+1).join(pad)+str).slice(-len),
        formatTime: (time) => {
            let minutes = Math.floor(time / 60)
            let seconds = time - minutes * 60

            return `${minutes}:${Util.StringUtil.padLeft(seconds, "0", 2)}`
        }    
    },

    ServiceUtil: {
        loadData: async (url="") => {
            try {
                let response = await fetch(url)

                if(response.status == 200) {
                    let json = await response.json()
                    return json
                }

                throw new Error("meh, something went wrong", response.status)
            } catch(err) {
                console.error(err) // TypeError: failed to fetch
            }
        }
    },

    StoreUtil: {
        setMainWord: word => $mainWord = word,
    },

    SongUtil: {
        /**
         * @param raw info from stream service
         * returns songInfoObj
         */
        parseSong: (rawObj) => {
            let retObj = {}

            let bandAndSongArr = rawObj.song.text.split(" - ")

            retObj.bandName = bandAndSongArr[0]
            retObj.songTitle = bandAndSongArr[1] 
            retObj.length = Util.StringUtil.formatTime(rawObj.duration)

            return retObj
        }
    }
}