
// Connecting to db



const validateActionPost = (req, res, next) => {
    if (!req.body.description || !req.body.notes) {
        res.status(400).json({
            message: 'description and notes fields are required!'
        })
    } else {
        next()
    }
}

module.exports = {
    validateActionPost,
}