function handleSubmit(event){
  event.preventDefault() 
  //stops page from refreshing b/c thats default behav for form 
}

  const input = document.querySelector("#input")
  const ul = document.querySelector ("#ul")
  const clearList = document.querySelector("#byeByeList")
  
  ul.addEventListener("click", lineThruToDoTask)

  document.querySelector("#byeByeTask").addEventListener("click", eraseTask) 
  
  function lineThruToDoTask(e){
    if(e.target.classList.contains("line")){
      e.target.classList.toggle("strikeThrough")
    }
  }

  function eraseTask(){
    const listItem = document.querySelectorAll('.strikeThrough')
    let IDsToDelete = []
    Array.from(listItem).forEach((ele)=>{
      IDsToDelete.push(ele.getAttribute('data-id'))
    })

    fetch('messages', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'id': IDsToDelete.join(';')
      })
    }).then(function (response) {
      console.log(response);
      window.location.reload()
    })
};


