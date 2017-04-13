const passport = require('passport')
const noteHandler = require('./noteHandler')

function init(app) {
    app.get('/notes', passport.authenticationMiddleware(), renderNote)

    app.get('/setNote', passport.authenticationMiddleware(), noteHandler.setNote)

}


function renderNote(req, res) {
    //get the notes from the database
    noteHandler.getNotes(req, function(note) {
        var errorMsg = ''
        if (req.query.err === 'emptyNote')
            errorMsg = '<font color="red">There is no note to save. Please fill note field!!!</font></br>'
        else if (req.query.err)
            errorMsg = '<font color="red">An error occured. Please try again!!!</font></br>'

        res.render('note/note', {
            name: req.user.name,
            notes: note,
            errMsg: errorMsg
        })
    })
}

module.exports.init = init