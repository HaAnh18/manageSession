const imgDiv = document.querySelector(".userImg")
const img = document.querySelector('#photo')
const file = document.querySelector("#file")
// const uploadbtn = document.querySelector("#uploadbtn")


file.addEventListener("change", function() {
  const chosenFile = this.files[0];
  console.log(chosenFile);
  if (chosenFile) {
    const reader = new FileReader();

    reader.addEventListener("load", function() {
      img.setAttribute('src', reader.result);
    })

    reader.readAsDataURL(chosenFile)

  }
})

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})