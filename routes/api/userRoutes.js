const router = require('express').Router();

// Get all functions from controllers
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

// /api/users routes
router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;