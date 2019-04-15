function whichButton(buttonElement){
  alert(buttonElement.id);
  var buttonClickedId = buttonElement.id;
  
  var i=0;

  var flag = 0;

  while(flag == 0){
      if(buttonClickedId == 'btn'+i){
          var div = 'hidden'+i;
          document.getElementById("div").innerHTML = i;
          flag = 1;
      }
      i = i+1;
  }

}