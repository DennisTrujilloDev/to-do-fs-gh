function handleSubmit(event) {
  event.preventDefault();
  //stops page from refreshing b/c thats default behav for form
}
const listItem = document.querySelectorAll("li");
const clearList = document.querySelector("#byeByeList");

Array.from(listItem).forEach((ele) => {
  ele.addEventListener("click", updateLI);
});
function updateLI(e) {
  let itemID = e.target.getAttribute("data-id");
  fetch("updateIt", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: itemID,
    }),
  }).then(function (response) {
    console.log(response);
    window.location.reload();
  });
}
clearList.addEventListener("click", eraseTask);
function eraseTask() {
  const listItem = document.querySelectorAll(".line");
  const IDsToDelete = [];
  Array.from(listItem).forEach((ele) => {
    IDsToDelete.push(ele.getAttribute("data-id"));
  });

  fetch("deleteAll", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: IDsToDelete.join(";"),
    }),
  }).then(function (response) {
    console.log(response);
    window.location.reload();
  });
}
