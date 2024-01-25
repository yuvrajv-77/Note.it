// below function is to store the title and note to local storage when button is cliked
document.getElementById('addnote').addEventListener('click', function() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('enternote').value;

    // check if the input fields aren't empty after removing spaces
    if (title.trim() === "" && note.trim() === "") {
        alert("Both fields are empty. Please enter a title and a note.");
        return;
    }
    
    // checks if any item named 'localnotes' present in local storage.
    if (localStorage.getItem('localnotes') == null) {   //if not present
        let notesObj = [];                             // create an empty array
        notesObj.push({title: title, note: note});      // push the title and note text as object in key-value pairs(title and note) in the array
        localStorage.setItem('localnotes', JSON.stringify(notesObj));   // store this array in local storage with key as 'localnotes' and value as json string form of the array
        console.log("array is created and stored in local storage");
        //this block will occur only once when theres no any notes and first note is added
    } 

    // if item named 'localnotes' is present
    else {
        // console.log("typ is ", JSON.parse(localStorage.getItem('localnotes')));
        let notesObj = JSON.parse(localStorage.getItem('localnotes')); // then get the localnotes from local storage convert it to json and store it in variable (it will be in an array of objects)
        notesObj.push({title: title, note: note});  // push the title and note text as object in key-value pairs(title and note) in the array
        localStorage.setItem('localnotes', JSON.stringify(notesObj));   // store this array in local storage with key as 'localnotes' and value as json string form of the array
        // now whenever button is clicked to add another note, access the item from local storage -> store it in variable -> push new note values in it -> store it back
    }
    // if button clicked with values in input a new note is added and immediately clear the input fields
    document.getElementById('title').value = "";
    document.getElementById('enternote').value = "";

    successAdded();

    showNotes();    // necessary to call this function in click event function bcoz after successfully adding the note the all notes must be shown immediately below
});

// show notes in DOM
function showNotes() {      // it read the local storage, retrive notes and show in DOM
    let retrive_notes = localStorage.getItem('localnotes');     // get the item from local storage and store it in a variable
    console.log("retrive notes ",retrive_notes );

    let notesObj;

    // check if item is null or it have something in it to show
    if (retrive_notes === null) {
        notesObj = [];      // if null just create an empty array as nothing to show here
    } else {
        notesObj = JSON.parse(retrive_notes);   // if there are notes in the item, parse it in json and store it in variable
    }


    let HTML = "";
    // now loop over each element(object) in notesObj created in this function
    notesObj.forEach(function(element, index) {
        // for each element(object) is append this string of html in a HTML variable
        HTML += `                       
        <div class="card overflow-hidden" style="max-width: 18rem; min-height: 10rem">
        <div class="card-header">
            ${element.title}
        </div>
        <div class="card-body d-flex justify-content-between flex-column">
          <p class="card-text">${element.note}</p>
          <div class="text-end">
            <a href="#" class="btn btn-danger text-center" id='${index}' onclick="deleteNote(this.id)">
            <i class="fi fi-rr-trash "></i></a>
          </div>
        </div>
    </div>

        `;
    });

    let notesElm = document.getElementById('notes-container');

    if (notesObj.length != 0) {     // if the length of notesObj is not empty means there are something to show then
        notesElm.innerHTML = HTML;      // insert the code of HTML variable
    } else {             
        notesElm.innerHTML = `Kuchh nahi hai yaha 'Add Note' pe click karo note bnao`;
    }
}

const successAdded = () => {
    let successAdded = document.getElementById('successAdded')
    successAdded.innerHTML= `
    <div class="alert alert-success border py-1 m-0" role="alert">
    Note Added To local storage !
    </div>`
    setTimeout(() => successAdded.innerHTML='',2300)
}

function deleteNote(index) {
    let notesObj = JSON.parse(localStorage.getItem('localnotes'));
    notesObj.splice(index, 1);
    localStorage.setItem('localnotes', JSON.stringify(notesObj));
    showNotes();
}


function deleteAllNotes(){
    localStorage.removeItem('localnotes');
    showNotes();
    let successAdded = document.getElementById('successAdded')
    successAdded.innerHTML= `
    <div class="alert alert-danger border py-1 m-0" role="alert">
    Notes Deleted from local storage!
    </div>`
    setTimeout(() => successAdded.innerHTML='',3000)

}


showNotes();