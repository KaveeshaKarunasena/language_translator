const express = require('express');
const router = express.Router();
const  {createUserHistory,getUserHistory,deleteUserHistory} = require("../Controller/historycomponent")

router.post('/create',createUserHistory);
router.get('/getHistory',getUserHistory);
router.delete('/deleteHistory/:_id',deleteUserHistory);

module.exports = router;