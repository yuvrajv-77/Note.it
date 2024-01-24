
document.getElementById('addnote').addEventListener('click', function() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('enternote').value;

    if (title.trim() === "" && note.trim() === "") {
        alert("Both fields are empty. Please enter a title and a note.");
        return;
    }
    
    if (localStorage.getItem('notes') == null) {
        let notesObj = [];
        notesObj.push({title: title, note: note});
        localStorage.setItem('notes', JSON.stringify(notesObj));
    } else {
        let notesObj = JSON.parse(localStorage.getItem('notes'));
        notesObj.push({title: title, note: note});
        localStorage.setItem('notes', JSON.stringify(notesObj));
    }

    document.getElementById('title').value = "";
    document.getElementById('enternote').value = "";
    successAdded();
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    console.log(notesObj);
    let html = "";

    notesObj.forEach(function(element, index) {
        html += `
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
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
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
    let notesObj = JSON.parse(localStorage.getItem('notes'));
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

function deleteAllNotes(){
    localStorage.removeItem('notes');
    showNotes();
    let successAdded = document.getElementById('successAdded')
    successAdded.innerHTML= `
    <div class="alert alert-danger border py-1 m-0" role="alert">
    Notes Deleted from local storage!
    </div>`
    setTimeout(() => successAdded.innerHTML='',3000)

}


showNotes();