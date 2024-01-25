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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 15" height="15" width="15"><g id="recycle-bin-2--remove-delete-empty-bin-trash-garbage"><path id="Vector" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" d="M1.0714285714285714 3.75h12.857142857142858" stroke-width="1"></path><path id="Vector_2" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" d="M2.6785714285714284 3.75h9.642857142857142v9.642857142857142c0 0.28414285714285714 -0.11292857142857142 0.5567142857142856 -0.31382142857142853 0.7576071428571428s-0.4734642857142857 0.31382142857142853 -0.7576071428571428 0.31382142857142853h-7.5c-0.2841642857142857 0 -0.5566821428571428 -0.11292857142857142 -0.7576178571428571 -0.31382142857142853C2.791457142857143 13.949571428571428 2.6785714285714284 13.677 2.6785714285714284 13.392857142857142v-9.642857142857142Z" stroke-width="1.5"></path><path id="Vector_3" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" d="M4.821428571428571 3.75V3.2142857142857144c0 -0.7103999999999999 0.28220357142857144 -1.3917107142857141 0.7845321428571429 -1.8940392857142858C6.108289285714285 0.81792 6.7896 0.5357142857142857 7.5 0.5357142857142857c0.7103999999999999 0 1.3917107142857141 0.2822057142857143 1.8940392857142858 0.7845321428571429C9.896367857142858 1.822575 10.178571428571429 2.503885714285714 10.178571428571429 3.2142857142857144v0.5357142857142857" stroke-width="1.5"></path><path id="Vector_4" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" d="M5.892857142857142 6.96585V11.253214285714286" stroke-width="1.3"></path><path id="Vector_5" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" d="M9.107142857142858 6.96585V11.253214285714286" stroke-width="1"></path></g></svg>
            </a>
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