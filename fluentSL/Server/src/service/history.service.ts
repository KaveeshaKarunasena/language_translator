import historyModel from '../model/History';

const addHistory = async (
  user_id: string,
  title: string,
  description: string,
) => {
  console.log('in here');
  const newHistory = new historyModel({
    user_id: user_id,
    title: title,
    description: description,
  });
  const history = await newHistory.save();

  const userHistory = JSON.parse(JSON.stringify(history));
  return userHistory;
};

export default { addHistory };
