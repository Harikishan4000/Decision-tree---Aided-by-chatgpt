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

const testD=document.querySelector(".gridItem100");
// testD.classList.add("decision");

const testC=document.querySelector(".gridItem88");
// testC.classList.add("cost");

const testP=document.querySelector(".gridItem34");
// testP.classList.add("path");



// JSON SCRIPT READ

root.innerHTML= data[0].Id;
let numOfNodesAtLevel=[];
let col=[];
let colDist=[];


let maxLevel=0;

//This loop is used to check maximum level of the nodes to divide the nodes equally
for(let i=0;i<data.length;i++){
    if(data[i].Level>maxLevel){
        maxLevel=data[i].Level;
    }
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
    console.log(col[i])
}

    // console.log(numOfNodesAtLevel);

//row dist between levels
let rowInc=Math.ceil(12/maxLevel-1);
// console.log(rowInc);

for(let i=0;i<data.length;i++){
    let row=rowInc*data[i].Level*21;
    colDist[data[i].Level]+=col[data[i].Level];
    // console.log(row+col[data[i].Level])
    // console.log(col[i])
    // console.log(row)


    if(data[i].Type=="Decision"){
        let temp=document.querySelector(".gridItem"+String(Math.floor(row+colDist[data[i].Level])));
        temp.classList.add("decision");
        temp.innerHTML= data[i].Id;

        
    }
    else if(data[i].Type=="Cost"){
        let temp2=document.querySelector(".gridItem"+String(Math.floor(row+colDist[data[i].Level])));
        temp2.classList.add("cost");
        temp2.innerHTML= data[i].Id;
        temp2.innerHTML= data[i].Name;
        
    }
}