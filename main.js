
/*Edit texts*/
var bookName=document.getElementById("bookName");
var bookAuthor=document.getElementById("bookAuthor");
var bookPage=document.getElementById("bookPage");
/*Buttons*/
var addCourse=document.getElementById("addCourse");
var clear=document.getElementById("clear");
var edit=document.getElementById("edit");
var deleteRowBook=document.getElementById("delete");
var deleteAll=document.getElementById("deleteAll");
/*Table body*/
var tableBody=document.getElementById("tbody");
/*Search*/
var search=document.getElementById("search")

let books=JSON.parse(localStorage.getItem('books'));
if(books==null){
  books=[];
}

displayData()
let i=-1;
addCourse.onclick=function(){
event.preventDefault();
if(addCourse.innerHTML=="Add Book"){
  addBook();
}
else{
updateBook()
}
}
function addBook(){
var book={
    name:bookName.value,
    author:bookAuthor.value,
    page:bookPage.value
}
if(bookName.className.includes("is-valid")){
  books.push(book);
  localStorage.setItem("books",JSON.stringify(books))
  bookName.classList.remove("is-valid");
  displayData()
  clearInput();
  
}
else{
  console.log("Check the data entery")
  bookName.classList.remove("is-invalid");
}

}


function clearInput(){
    bookName.value='';
    bookAuthor.value='';
    bookPage.value='';
}

function displayData(){
var data=''
for(var i=0;i<books.length;i++){
    data+=`
    <tr>
   <th scope="row">${i+1}</th>
    <td>${books[i].name}</td>
    <td>${books[i].author}</td>
    <td>${books[i].page}</td>
    <td><button type="submit"  id="edit" class="btn btn-outline-primary" onclick="editBook(${i})">edit</button></td>
    <td><button type="submit"  id="delete" class="btn btn-outline-danger" onclick="deleteBook(${i})">delete</button></td>
    </tr>`
}
tableBody.innerHTML = data;
}


deleteAll.onclick=function(){
  const swalWithBootstrapButtons = Swal.mixin({customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      books=[]
      localStorage.setItem("books",books)
    displayData()
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
    
}

function deleteBook(index){
    books.splice(index,1)
    localStorage.setItem("books",JSON.stringify(books))
    displayData()
}

function searchBook(){
   var value= search.value;
    var data='';
for(var i=0;i<books.length;i++){
    if(books[i].name.toLowerCase().includes(value)||books[i].author.toLowerCase().includes(value)){
        data+=`
        <tr>
       <th scope="row">${i+1}</th>
        <td>${books[i].name}</td>
        <td>${books[i].author}</td>
        <td>${books[i].page}</td>
        <td><button type="submit"  id="edit" class="btn btn-outline-primary"  onclick="editBook(${i})">edit</button></td>
        <td><button type="submit"  id="delete" class="btn btn-outline-danger" onclick="deleteBook(${i})">delete</button></td>
        </tr>`
    }
   
}
tableBody.innerHTML = data;
}

function editBook(index){
  bookName.value=books[index].name;
  bookAuthor.value=books[index].author;
  bookPage.value=books[index].page;
  addCourse.innerHTML="update book";
  i=index;  
  
}
function updateBook(){
  if(i!=-1){
    var oldBookName=books[i].name;
books[i].name=bookName.value;
books[i].author=bookAuthor.value;
books[i].page=bookPage.value;
clearInput();
localStorage.setItem("books",JSON.stringify(books))
displayData();
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: `Your ${oldBookName} information has been updated`,
  showConfirmButton: false,
  timer: 1500
})
addCourse.innerHTML="Add book";
i=-1;
}
}
validation()
//validation 

function validation(){
bookName.onkeyup=function(){
  pattern=/^[A-Z]{1}[a-z]{2,10}$/
  if(pattern.test(bookName.value)){
    console.log("true")
bookName.classList.add("is-valid")
bookName.classList.remove("is-invalid")
addCourse.removeAttribute("disabled")
  }
  else{
    console.log("false")
    bookName.classList.add("is-invalid")
    bookName.classList.remove("is-valid")
    addCourse.setAttribute("disabled","disabled")
  }
}
}






/*let timerInterval
Swal.fire({
  title: 'Please Wait for the system update!',
  html: 'I will close in <b></b> milliseconds.',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {

  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})*/