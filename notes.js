const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    debugger

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!');
    }
    else {
        console.log('Note title taken!');
    }

}

const removeNote = function(title) {
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title != title)
    if(notes.length == newNotes.length)
    {
        console.log(chalk.red.inverse("No such note found!"));
    }
    else
    {
        saveNotes(newNotes)
        console.log(chalk.black.bgGreen("Note removed!"));
    }
}

const listNotes = () => {
    console.log(chalk.white.bgBlue('Your notes -'))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title)
    if(!noteToRead) {
        console.log(chalk.red.inverse('Note not found!'))
    }
    else { 
        console.log(chalk.inverse(noteToRead.title));
        console.log(noteToRead.body);
    }
} 

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)    
    } 
    catch(e) {
        return []
    }

}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}