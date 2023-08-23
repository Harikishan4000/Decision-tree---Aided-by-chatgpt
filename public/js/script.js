// import jsondata from '../../output.json' assert { type: 'json' };

const load=document.querySelector(".loading-container");

fetch('/get-json')
  .then(response => response.json())
  .then(jsondata => {
    // Process the JSON data received from the server
    console.log(jsondata);

    var data={...jsondata};
  

//? Copy properties of json file and store it in an object 'data'


const grid=document.querySelector(".grid-container");
let totDivs= 300;

//? Add 300 gridItem with empty value string and naming all gridItems with succeeding number.
for(let i=0; i<totDivs;i++){
    var new_div=document.createElement("div");
    new_div.classList.add("gridItem");
    new_div.classList.add("gridItem"+String(i));
    new_div.setAttribute("details", " ")
    grid.appendChild(new_div);
}

load.style.display="none";


// JSON SCRIPT READ


let numOfNodesAtLevel=[];
let col=[];
let colDist=[];
let locs=[]; //locations of all nodes
let totDivsInRow=25; //Number of columns = 25, No of Rows = 12
let maxLevel=0;

//? Select the middle most column node as root item
const root=document.querySelector(".gridItem"+String(Math.floor(totDivsInRow/2)));
root.classList.add("root");
// root.classList.add("decision");
root.classList.add("node");

//? Details to display
var dets="ID: "+data[0].id+" NAME:"+data[0].name+" PROB:"+data[0].probability+" PAYOFF:"+data[0].payoff;
root.setAttribute("details", String(dets))
root.innerHTML= data[0].id;


//? loop is used to check maximum level of the nodes to divide the nodes equally vertically
for(let i=0;i<Object.keys(data).length;i++){
    if(data[i].level>maxLevel){
        maxLevel=data[i].level;
    }
    locs[i]=0;
}

//? initialize array values to 0
for(let i=0;i<=maxLevel;i++){
    numOfNodesAtLevel[i]=0;
    col[i]=0;
    colDist[i]=0;
}
//? count number of nodes in each level row-wise
for(let i=0;i<Object.keys(data).length;i++){
    numOfNodesAtLevel[data[i].level]++;

}
//? Column number of nodes
for(let i=0;i<=maxLevel;i++){
    col[i]=Math.floor(totDivsInRow/(numOfNodesAtLevel[i]+1));
    // console.log(col[i])
}


//? row dist between levels
let rowInc=Math.ceil(12/maxLevel-1);
locs[data[0].id]=Math.floor(totDivsInRow/2);


for(let i=0;i<Object.keys(data).length;i++){
    let row=rowInc*data[i].level*totDivsInRow;
    colDist[data[i].level]+=col[data[i].level];
    

    //? Mark decision node(Square nodes)
    if(data[i].type=="decision"){
        let temp=document.querySelector(".gridItem"+String(Math.floor(row-colDist[data[i].level])));
        temp.classList.add("decision");
        temp.classList.add("node");
        // temp.classList.add("details");
        var dets="ID: "+data[i].id+" NAME: "+data[i].name+" PROB: "+data[i].probability+" PAYOFF: "+data[i].payoff+" CHILD OF: "+data[i].parent;
        temp.setAttribute("details", String(dets))
        temp.innerHTML= data[i].id;
        
        locs[data[i].id]=row-colDist[data[i].level];

        
    } 
    //? Mark cost node(circlular nodes)
    else if(data[i].type=="cost"){
        let temp2=document.querySelector(".gridItem"+String(Math.floor(row-colDist[data[i].level])));
        temp2.classList.add("cost");
        temp2.classList.add("node");
        
        var dets="ID: "+data[i].id+" NAME: "+data[i].name+" PROB: "+data[i].probability+" PAYOFF: "+data[i].payoff+" CHILD OF: "+data[i].parent;
        temp2.setAttribute("details", String(dets))
        temp2.innerHTML= data[i].id;

        locs[data[i].id]=row-colDist[data[i].level];    
    } 
    //? Mark leaf node(circlular nodes) impotent
    else if(data[i].type=="leaf"){
      let temp2=document.querySelector(".gridItem"+String(Math.floor(row-colDist[data[i].level])));
      temp2.classList.add("leaf");
      temp2.classList.add("node");
      
      var dets="ID: "+data[i].id+" NAME: "+data[i].name+" PROB: "+data[i].probability+" PAYOFF: "+data[i].payoff+" CHILD OF: "+data[i].parent;
      temp2.setAttribute("details", String(dets))
      temp2.innerHTML= "<p>"+data[i].id+"</p>";

      locs[data[i].id]=row-colDist[data[i].level];    
  }
}


//?function to draw a line from center of two divs

function adjustLine(from, to, line) {

    var fT = from.offsetTop + from.offsetHeight / 2;
    var tT = to.offsetTop + to.offsetHeight / 2;
    var fL = from.offsetLeft + from.offsetWidth / 2;
    var tL = to.offsetLeft + to.offsetWidth / 2;
  
    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = 180 / Math.PI * Math.acos(CA / H);
  
    if (tT > fT) {
      var top = (tT - fT) / 2 + fT;
    } else {
      var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
      var left = (tL - fL) / 2 + fL;
    } else {
      var left = (fL - tL) / 2 + tL;
    }
  
    if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
      ANG *= -1;
    }
    top -= H / 2;
  
    line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-transform"] = 'rotate(' + ANG + 'deg)';
    line.style.top = top + 'px';
    line.style.left = left + 'px';
    line.style.height = H + 'px';
  }

  // console.log(Object.keys(data).length);
  
  //? Check if any nodes have children, if they do, add line
  let linenum=0;
  for(let i=0; i<Object.keys(data).length;i++){
      for(let j=0; j<data[i].children.length;j++){
        //Create new line b/w nodes
        var new_line=document.createElement("div");
        new_line.classList.add("line");
        new_line.classList.add("line"+String(linenum));
        grid.appendChild(new_line);
         adjustLine(
            document.querySelector('.gridItem'+String(locs[data[i].id])),
            document.querySelector('.gridItem'+String(locs[data[i].children[j]])),
            document.querySelector('.line'+String(linenum++))
          );
          
    }
  }

  //?On hovering node, gives node details
  let node=document.querySelectorAll(".node");

  for(let i=0;i<node.length;i++){
    node[i].addEventListener("mouseenter", ()=>{
      node[i].classList.add("details");

    })
  
    node[i].addEventListener("mouseleave", ()=>{
      node[i].classList.remove("details");
    })
  }
  
  const toggle=document.querySelector(".toggle");
  
  
//?Refresh page on resize


window.addEventListener("resize", ()=>{
  console.log("resized");
  document.location.reload();
})



  //? ALGORITHM TO FIND THE DECISION

  let rootCost=0;
  if(data[0].payoff!=null){
    rootCost=data[0].payoff;
    data[0].payoff=null;
  }

  function decision_tree(){
    let temp;
    let flag;
    let result;
    let child;
    let i, j, k;
    

    for(i=Object.keys(data).length-1;i>=0;i--){
       temp=-1000; flag=-1;
       result=0;

        for(j=0;j<data[i].children.length;j++){
          child=data[i].children[j];
          if(data[child].probability){  //If the children have probability, is this is a cost node?
            result+=data[child].probability*data[child].payoff;
            
            flag=0;
            
          }
          else if(j>0){
            flag=2; //This means that theres a problem
            break;
          }
          else{
            flag=1; //everything is fine
            
            break;
          }
         }
         
         if(flag==0){
          data[i].payoff=result;
         }
         if(flag==1){
          temp=data[data[i].children[0]].payoff;
          // console.log(data[i].children[0])
          for(j=1;j<data[i].children.length;j++){ //If the children dont have probability, ie this is a decision node
            child=data[i].children[j];
            // console.log(child)
            if(data[child].payoff<temp&&toggle.classList.contains("mini")){
              temp=data[child].payoff;
              // console.log(temp)
            }else if(data[child].payoff>temp&&!toggle.classList.contains("mini")){
              temp=data[child].payoff;
            }
           }
           data[i].payoff=temp;
          // console.log("No prob territory ", temp)
         }
         else if(flag==2){
          console.log("Only a few children of node "+data[i].id+" have probabilities");
          break;
         }
      }
      // console.log(data[0].payoff)
      if(data[0].payoff!=null){ //Check if the root node's payoff is updated
        for(j=0;j<data[0].children.length;j++){
          child=data[0].children[j];
          if(data[child].payoff==data[0].payoff){ //Check for the child whose payoff is equal to the root's payoff
            data[0].name=data[child].name;
            document.querySelector('.gridItem'+String(locs[data[child].id])).classList.add("answer");
          }
         }
      }
      else{
        console.log("Kuch gadbad hua he");
        for(j=0;j<Object.keys(data[0].children).length;j++){
          console.log("child: "+ data[0].children[j].id+"  Payoff: "+ data[0].children[j].payoff)
        }
      }


      //Return data to its initial values
      data={...jsondata}
    //  console.log(data[0].payoff)
     
    }
  
    const evaluate=document.querySelector(".evaluate");
    const result=document.querySelector(".result");
    

    evaluate.addEventListener("click", ()=>{
      try{
        // console.log(data)
        decision_tree();
        document.querySelector(".result").classList.add("show");
        if(data[0].payoff<0){
          result.innerHTML=data[0].name+" : "+(data[0].payoff*100)+"% loss" ;
        }
        if(data[0].payoff>0&&data[0].payoff<1){
          result.innerHTML=data[0].name+" : "+(data[0].payoff*100)+"% profit" ;
        }
        else if(data[0].payoff!=null){
          result.innerHTML=data[0].name+" : "+(data[0].payoff+rootCost);
        }
        else{
          result.innerHTML="Err";
        }
      }catch(err){
        console.log("Caught error by code: "+ err);
      }
    })



    // Maximise and  minimize toggle

    toggle.addEventListener("click", ()=>{
      result.innerHTML=""
      result.classList.remove("show");
      if(document.querySelector(".answer"))
        document.querySelector(".answer").classList.remove("answer");
      toggle.classList.toggle("mini");
      if(toggle.classList.contains("mini")){
        toggle.innerHTML="Min";
      }else{
        toggle.innerHTML="Max";
      }
    })  

  })
  .catch(error => {
    load.style.display="block";
    setTimeout(function () { 
      location.reload();
    }, 60 * 100);
    console.error('Error fetching JSONNNNN:', error);
  });