import historyModel from '../model/History';

const addHistory = async (title: string, description: string) => {
  console.log('in here');
  const newHistory = new historyModel({
    title: title,
    description: description,
  });
  const history = await newHistory.save();

  const userHistory = JSON.parse(JSON.stringify(history));
  return userHistory;
};

export default { addHistory };
