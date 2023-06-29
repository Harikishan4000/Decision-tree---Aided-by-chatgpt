import data from './example1.json' assert { type: 'json' };
const grid=document.querySelector(".grid-container");

for(let i=0; i<252;i++){
    var new_div=document.createElement("div");
    new_div.classList.add("gridItem");
    new_div.classList.add("gridItem"+String(i));
    grid.appendChild(new_div);
}

const root=document.querySelector(".gridItem10");
root.classList.add("root");


// JSON SCRIPT READ

root.innerHTML= data[0].Id;
let numOfNodesAtLevel=[];
let col=[];
let colDist=[];
let locs=[]; //locations of all nodes

let maxLevel=0;

//This loop is used to check maximum level of the nodes to divide the nodes equally
for(let i=0;i<data.length;i++){
    if(data[i].Level>maxLevel){
        maxLevel=data[i].Level;
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
    numOfNodesAtLevel[data[i].Level]++;

}
for(let i=0;i<=maxLevel;i++){
    col[i]=Math.floor(21/(numOfNodesAtLevel[i]+1));
    // console.log(col[i])
}


//row dist between levels
let rowInc=Math.ceil(12/maxLevel-1);
locs[data[0].Id]=10;


for(let i=0;i<data.length;i++){
    let row=rowInc*data[i].Level*21;
    colDist[data[i].Level]+=col[data[i].Level];
    // console.log(row+col[data[i].Level])
    // console.log(col[i])
    // console.log(row)


    if(data[i].Type=="Decision"){
        let temp=document.querySelector(".gridItem"+String(Math.floor(row-colDist[data[i].Level])));
        temp.classList.add("decision");
        temp.innerHTML= data[i].Id;
        // var new_line=document.createElement("div");
        locs[data[i].Id]=row-colDist[data[i].Level];
        
    }
    else if(data[i].Type=="Cost"){
        let temp2=document.querySelector(".gridItem"+String(Math.floor(row-colDist[data[i].Level])));
        temp2.classList.add("cost");
        temp2.innerHTML= data[i].Id;
        locs[data[i].Id]=row-colDist[data[i].Level];    
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
      for(let j=0; j<data[i].Children.length;j++){
        //Create new line b/w nodes
        var new_line=document.createElement("div");
        new_line.classList.add("line");
        new_line.classList.add("line"+String(linenum));
        grid.appendChild(new_line);
         adjustLine(
            document.querySelector('.gridItem'+String(locs[data[i].Id])),
            document.querySelector('.gridItem'+String(locs[data[i].Children[j]])),
            document.querySelector('.line'+String(linenum++))
          );
          console.log(locs[data[i].Children[j]]+" <- "+locs[data[i].Id]);
      
      
    }
  }