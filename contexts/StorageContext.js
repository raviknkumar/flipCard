import React, {createContext} from "react";
import {AsyncStorage} from 'react-native';
import {gameCategories, levels} from "../config/ResourceConfig";

export const StorageContext = createContext();

// Store Data as GAME_LEVEL wise
const StorageContextProvider = (props) => {

    // methods

    const addDataToLevel = async (gameDataObtained) => {

        let level = gameDataObtained.level;
        let levelDescription = gameDataObtained.levelDescription;
        let category = gameDataObtained.category;

        try {

            const key = getKey(category, level);
            let dataInStorage = '', gameLevelDataExisting = new LevelData();

            try {
                dataInStorage = await AsyncStorage.getItem(key);
                console.log("Existing Data", dataInStorage);
                if(dataInStorage) {
                    gameLevelDataExisting = JSON.parse(dataInStorage);
                } else {
                    gameLevelDataExisting = null;
                }
            }
            catch(e){
                console.log("Got Error");console.warn(e);
            }

            // No Game Summary Exists
            if (!gameLevelDataExisting) {

                console.log("No Data Exists");
                // created level wise summary
                gameLevelDataExisting = new LevelData(category, level, levelDescription, 1);

            }
            // Already Level data exists
            else{
                console.log("Data Exists", gameLevelDataExisting);
                gameLevelDataExisting.gamesPlayed = gameLevelDataExisting.gamesPlayed + 1;
            }
            gameLevelDataExisting.minTime = calculateMinTime(gameLevelDataExisting.minTime, gameDataObtained.time);
            gameLevelDataExisting.averageTime = calculateAverageTime(gameLevelDataExisting.averageTime, gameDataObtained.time, gameLevelDataExisting.gamesPlayed);
            gameLevelDataExisting.averageTimeReadable = getTimeAsReadable(gameLevelDataExisting.averageTime);
            gameLevelDataExisting.minTimeReadable = getTimeAsReadable(gameLevelDataExisting.minTime);

            console.log("Game Data New", gameLevelDataExisting);

            // persisting game Summary
            let response;

            AsyncStorage.setItem(key, JSON.stringify(gameLevelDataExisting), () => {
                response = gameLevelDataExisting;
                console.warn('Done!')
            });

        } catch (error) {
            console.warn("Error Updatinf LevelWise Data Stats: ", error)
        }
    };

    const getAllLevelsData = async () => {

        // get All Categories
        let response = {};
        let allKeys = getAllKeys();

        let res = await AsyncStorage.getAllKeys();
        console.log("Keys in DB", res);
        res = []

        const responseArray = await AsyncStorage.multiGet(allKeys);
        console.log("Resp Array", responseArray);

        responseArray.map((result, i) => {
            // get at each store's key/value so you can work with it
            let key = result[0];
            let value = result[1];
            res = [...res, {key:key, value:value}];
        });

        // res is key value pair
        for (const keyValue of res) {
            let key = keyValue.key;
            let dataFromKey =getDataFromKey(key);
            response[dataFromKey.category] = response[dataFromKey.category] ? response[dataFromKey.category] : {};
            response[dataFromKey.category][dataFromKey.level] = keyValue.value ? JSON.parse(keyValue.value) : null;
        }
        console.log("Response ", response);
        return response;
    };


    const printAllLevelsData = async () => {
        console.log(getAllLevelsData());
    };

    const clearData = async () => {
        await AsyncStorage.clear();
    };

    // Helper

    const getKey = (category, level) => {
        return category + "_" + level
    };

    const getDataFromKey = (key) => {
        let data = key.split("_");
        return {
            category: data[0],
            level: data[1]
        };
    }

    const getAllKeys = () => {

        let allKeys= [];

        for (const gameCategory of gameCategories) {
            // Get All Levels
            for (const level of levels) {
                // add to all keys
                allKeys = [...allKeys, getKey(gameCategory, level)]
            }
        }
        return allKeys;
    };

    // Render

    return (
        <StorageContext.Provider value={{ addDataToLevel: addDataToLevel, getAllLevelsData: getAllLevelsData, clearData: clearData}}>
            {props.children}
        </StorageContext.Provider>
    );
};


class GameSummary {
    // contains an object with levelwise data


}

class LevelData {

    category; // Game Category
    level; // for Internal Tracking
    levelDescription; // For Showing FrontEnd
    gamesPlayed; // Total Games Played
    minTime; // Stored In seconds
    minTimeReadable;
    averageTimeReadable;
    averageTime; // Stored In seconds

    constructor(category,level, levelDescription, gamesPlayed){
        this.category = category;
        this.levelDescription = levelDescription;
        this.gamesPlayed = gamesPlayed;
        this.level = level;
    }
}

// Helper, Send Updated totalGames
const calculateAverageTime = (oldTime, newTime, totalGames) => {

    console.log("Existing and New And Total", oldTime, " ", newTime, " ", totalGames);
    if(!oldTime || totalGames === 1){
        console.log("Update With New");
         return newTime;
    } else {
        let average = oldTime;
        let oldGamesPlayed = (totalGames - 1);
        average = (average * oldGamesPlayed) + newTime;
        average = average / totalGames;
        console.log("Average*oldGames + newTime / totalGames",oldTime,"*",(totalGames-1),'+',newTime , "/", totalGames);
        console.log("Calculate With New", average.toFixed(2));
        return average.toFixed(2);
    }
};

const getTimeAsReadable = (time) => {

    let seconds = parseInt(time % 60),
        minutes = Math.floor(time / 60);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return minutes + ":" + seconds;
};

const calculateMinTime = (oldMinTime, newMinTime) => {
    console.log("Existing and New", oldMinTime, " ", newMinTime);
    if (!oldMinTime || oldMinTime > newMinTime) {
        console.log("MinTime Update With New");
        return newMinTime;
    } else {
        console.log("MinTime Stays The Same");
        return oldMinTime;
    }
};

export default StorageContextProvider;