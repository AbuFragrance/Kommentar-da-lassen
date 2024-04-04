import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champions-1741b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentListInDB = ref(database, "Kommentar")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("button")
const kommentareEl = document.getElementById("kommentare")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value 
    push(commentListInDB, inputValue)
    clearInputFieldEl()
})

onValue(commentListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearKommentareEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendCommentToList(currentItemID, currentItemValue)
        }
    } else {
        kommentareEl.innerHTML = `<p> Sei der erste Kommentar...</p>`
    }
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearKommentareEl() {
    kommentareEl.innerHTML = ""
}

function appendCommentToList(commentID, commentValue) {
    let newEl = document.createElement("li")
    newEl.textContent = commentValue

    newEl.addEventListener("click", function() {
        deleteCommentFromDB(commentID)
    })

    kommentareEl.appendChild(newEl)
}

function deleteCommentFromDB(commentID) {
    const exactLocationOfCommentInDB = ref(database, `Kommentar/${commentID}`)
    remove(exactLocationOfCommentInDB)
}