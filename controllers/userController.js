const { User, Though } = require("../models")

const friendCount = async () => 
    User.aggregate()
        .count('friendCount')
        .then((numberOfFriends) => numberOfFriends);

module.exports = {
    // Get all Users
    getUsers(req,res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
                friendCount: await friendCount(),
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    }
}