import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref , push , onValue , remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"


const firebaseConfig = {
    apiKey: "AIzaSyAaoupwL8jZkgsdrbjswEg-5H2LWjLT2n4",
    authDomain: "playground-ba814.firebaseapp.com",
    databaseURL: "https://playground-ba814-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "playground-ba814",
    storageBucket: "playground-ba814.appspot.com",
    messagingSenderId: "444408422972",
    appId: "1:444408422972:web:512b3a191e0abbf08cd939"
  };




//initialization of firebase
const app = initializeApp(firebaseConfig)
// get ref to database service
const database = getDatabase(app)

const shoppingListInDB = ref(database, "shoppingList")




const inputfieldEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
const shoppingItems =document.getElementById("shopping-list")

addBtn.addEventListener("click",function()
{
    const inputValue = inputfieldEl.value
     push(shoppingListInDB,inputValue)

     clearInputField();

})


function clearInputField()
{
  inputfieldEl.value = ""
}

function clearShoppingList()
{
  shoppingItems.innerHTML = ""
}

function appendingItems(item)
{
  //shoppingItems.innerHTML += `<li>${itemvalue}</li>`

  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")
  newEl.textContent = itemValue
  shoppingItems.append(newEl)

  newEl.addEventListener("click" , function()
  {
    console.log(itemID)
    let excatlocationinDB = ref(database ,`shoppingList/${itemID}`)
    remove(excatlocationinDB)
  })

}

onValue(shoppingListInDB , function(snapshot)
{

    if(snapshot.exists())
    {

    
    let shoppingListArray = Object.entries(snapshot.val())
         clearShoppingList()
 

    for(let i = 0  ; i < shoppingListArray.length ; i++)
    {
      let currentItem = shoppingListArray[i]

      let currentItemValue = currentItem[1]
      let currentItemkeys = currentItem[0]

      appendingItems(currentItem) 

    }

  }

  else{
    shoppingItems.innerHTML = "please Add some items.......here"
  }

})
