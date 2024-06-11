// query Selector for button that updates the book
// const update = document.querySelector("currUpdate")
 // select button

const updateForms = document.querySelectorAll(".updateForm");

for (let i = 0; i < updateForms.length; i++) {
  updateForms[i].addEventListener("click", () => {


    fetch("/student/" + updateForms[i].value, {
      method: "PATCH"
    }).then(() => {
      window.location.reload();
    });
  });
}

//Delet

const deleteForms = document.querySelectorAll(".deleteForm");

for (let i = 0; i < deleteForms.length; i++) {
  deleteForms[i].addEventListener("click", () => {


    fetch("/student/" + deleteForms[i].value, {
      method: "DELETE"
    }).then(() => {
      window.location.reload();
    });
  });
}
const createForm = document.querySelector("form") 
// const bookRead = document.querySelector("false")
// console.log(createForm)

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
    console.log('hey')
  const formData = new FormData(createForm);
  const reqBody=Object.fromEntries(formData);
 reqBody.currentBook = reqBody.currentBook === 'true' ? true : false;
  console.log(reqBody)
 
  
  fetch("/student/:id", {
    method: "POST",
    headers: { "Content-Type" : "application/json"},
    body: JSON.stringify(reqBody)
  })
  .then(() => {
    window.location.reload();
    console.log("it works")
  })

})


 

// update.addEventListener("click", (e)=>{
//   e.preventDefault();
//   //updates the bool current book to false
//   const formData = new FormData(update);
//   let data = Object.fromEntries(formData.entries());




//   fetch("/student/:id", {
//     method: "POST",
//     headers: { "Content-Type" : "application/json"},
//     body: JSON.stringify(reqBody)
//   })
//   .then(() => {
//     window.location.href = "/"
//   })
// })

