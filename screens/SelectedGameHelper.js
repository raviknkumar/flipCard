export const initializeCardInfo = (cardValuesToApply2d, faceUpImageUri) =>{

    let cardInfo = [], i=0;

    for (const cardValuesRow of cardValuesToApply2d) {
        let cardValuesInfo = [];
        for(const colorInformation of cardValuesRow){
            let colorInfoObj = {
                index:i,
                clickable: true,
                id: colorInformation.id,
                color: colorInformation.prop,
                visible: true,
                faceUpImageUri: faceUpImageUri
            };
            cardValuesInfo.push(colorInfoObj);
            i++;
        }
        cardInfo.push(cardValuesInfo);
    }
    return cardInfo;
};


export const getElementIn2dArray = (array2d, index1d, colSize) => {
    return {...array2d[~~(index1d / colSize)][index1d % colSize]};
};


export const areCardsSame = (card1, card2)=>{
    return card1.color === card2.color && card1.index !== card2.index;
};

export const toTime = time => {
    let milliseconds = parseInt(time % 1000),
        seconds = Math.floor((time / 1000) % 60),
        minutes = Math.floor(time / (1000 * 60));

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return {
        milliseconds,
        seconds,
        minutes
    };
};

export const getTimeInSeconds = time => {
    let {milliseconds, seconds, minutes} = time;
    milliseconds = parseInt(milliseconds);
    seconds = parseInt(seconds);
    minutes = parseInt(minutes);

    return seconds + (minutes * 60) + (milliseconds / 1000);
};


/*Font.loadAsync({
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
                Arial: require("native-base/Fonts/Roboto.ttf"),
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            }),*/

/* Used For playing and pausing audio*/

/*
// Use If Required
_updateScreenForSoundStatus = (status) => {
    if (status.isPlaying && this.state.playingStatus !== "playing") {
        this.setState({ playingStatus: "playing" });
    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
        this.setState({ playingStatus: "donepause" });
    }
};*/


/* Listen For Status updates On Song */
/*
this.flipSound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
_onPlaybackStatusUpdate = async playbackStatus => {

        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
        } else {
            // Update your UI for the loaded state

            if (playbackStatus.isPlaying) {
                // Update your UI for the playing state
            } else {
                // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                console.log("Finished playing and Set position to 0")
            }

        }
    };
*/