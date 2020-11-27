const fs = require('fs')
const chalk = require('chalk')

//Will add a new note to the array of notes. Will not accept duplicates
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }
    else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
    
}

//Will remove the specified notes from the array of notes
const removeNote = (title) => {
    let notes = loadNotes()
    unwantedNoteIndex = notes.findIndex((note) => note.title === title)
    if (unwantedNoteIndex === -1) {
        console.log(chalk.red.inverse('Specified note is not in your notes.'))
    }
    else {
        notes.splice(unwantedNoteIndex, 1)
        saveNotes(notes)
        console.log(chalk.green.inverse('Note removed!'))
    }
    
}

const listNotes = () => {
    let notes = loadNotes()
    console.log(chalk.inverse('Your notes:'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const wantedNote = notes.find((note) => note.title === title)
    if (wantedNote) {
        console.log(chalk.inverse(wantedNote.title))
        console.log(wantedNote.body)
    }
    else {
        console.log(chalk.red.inverse('Note does not exist!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJsON)
    return
}

const loadNotes = () => {
    try {//If the file doesn't exist, then it will return a new empty array
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}