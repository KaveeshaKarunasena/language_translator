import HistoryModel from "../model/History";


const addHistory = async (title:string,description:string) => {
    console.log("in here")
    const newHistory = new HistoryModel({
        title:title,
        description:description
    });
    const history = await newHistory.save();

    const userHistory = JSON.parse(JSON.stringify(history));
    return userHistory;
};

module.exports = {
    addHistory
};

