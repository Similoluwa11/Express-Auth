const checkSize = (req, res, next) => {
    existingSizes = ['small(s)', 'medium(m)', 'large(l)'];

    if(!existingSizes.includes(req.body.size)){
        return res.status(422).json({
            data: null,
            error: 'Invalid size, item only comes in small(s), medium(m) or large(l)'
        })
    
}
next()
}
module.exports = {
    checkSize
}