import data from './example1.json' assert { type: 'json' };
const grid=document.querySelector(".grid-container");
let totDivs= 300;
for(let i=0; i<totDivs;i++){
    var new_div=document.createElement("div");
    new_div.classList.add("gridItem");
    new_div.classList.add("gridItem"+String(i));
    new_div.setAttribute("details", " ")
    grid.appendChild(new_div);
}


// JSON SCRIPT READ


let numOfNodesAtLevel=[];
let col=[];
let colDist=[];
let locs=[]; //locations of all nodes
let totDivsInRow=25; //Number of columns
let maxLevel=0;


const root=document.querySelector(".gridItem"+String(Math.floor(totDivsInRow/2)));
root.classList.add("root");
// root.classList.add("decision");
root.classList.add("node");
var dets="ID: "+data[0].id+" NAME:"+data[0].name+" PROB:"+data[0].probability+" PAYOFF:"+data[0].payoff;
root.setAttribute("details", String(dets))
root.innerHTML= data[0].id;

console.log(".gridItem"+String(Math.floor(totDivsInRow/2)))

//This loop is used to check maximum level of the nodes to divide the nodes equally
for(let i=0;i<data.length;i++){
    if(data[i].level>maxLevel){
        maxLevel=data[i].level;
    }
    locs[i]=0;
}

//initialize array values to 0
for(let i=0;i<=maxLevel;i++){
    numOfNodesAtLevel[i]=0;
    col[i]=0;
    colDist[i]=0;
}

// count number of nodes in each level
for(let i=0;i<data.length;i++){
    numOfNodesAtLevel[data[i].level]++;

}
for(let i=0;i<=maxLevel;i++){
    col[i]=Math.floor(totDivsInRow/(numOfNodesAtLevel[i]+1));
    // console.log(col[i])
}


//row dist between levels
let rowInc=Math.ceil(12/maxLevel-1);
locs[data[0].id]=Math.floor(totDivsInRow/2);


for(let i=0;i<data.length;i++){
    let row=rowInc*data[i].level*totDivsInRow;
    colDist[data[i].level]+=col[data[i].level];
    // console.log(row+col[data[i].level])
    // console.log(col[i])
    // console.log(row)


    if(data[i].type=="decision"){
        let temp=document.querySelector(".gridItem"+String(Math.floor(row-colDist[data[i].level])));
        temp.classList.add("decision");
        temp.classList.add("node");
        // temp.classList.add("details");
        var dets="ID: "+data[i].id+" NAME: "+data[i].name+" PROB: "+data[i].probability+" PAYOFF: "+data[i].payoff+" CHILD OF: "+data[i].parent;
        temp.setAttribute("details", String(dets))
        temp.innerHTML= data[i].id;
        // var new_line=document.createElement("div");
        locs[data[i].id]=row-colDist[data[i].level];

        
    }
    else if(data[i].type=="cost"){
        let temp2=document.querySelector(".gridItem"+String(Math.floor(row-colDist[data[i].level])));
        temp2.classList.add("cost");
        temp2.classList.add("node");
        // temp2.classList.add("details");
        var dets="ID: "+data[i].id+" NAME: "+data[i].name+" PROB: "+data[i].probability+" PAYOFF: "+data[i].payoff+" CHILD OF: "+data[i].parent;
        temp2.setAttribute("details", String(dets))
        temp2.innerHTML= data[i].id;
        locs[data[i].id]=row-colDist[data[i].level];    
    }
}


//function to draw a line from center of two divs

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

  let linenum=0;
  for(let i=0; i<data.length;i++){
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
          // console.log(locs[data[i].children[j]]+" <- "+locs[data[i].id]);
      
      
    }
  }

  //On hovering node, gives node details
  let node=document.querySelectorAll(".node");

  for(let i=0;i<node.length;i++){
    node[i].addEventListener("mouseenter", ()=>{
      node[i].classList.add("details");
      console.log("Hii")
    })
  
    node[i].addEventListener("mouseleave", ()=>{
      node[i].classList.remove("details");
    })
  }
  