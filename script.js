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
testD.classList.add("decision");

const testC=document.querySelector(".gridItem88");
testC.classList.add("cost");

const testP=document.querySelector(".gridItem34");
testP.classList.add("path");



// JSON SCRIPT READ

root.innerHTML= data[0].Id;
let numOfNodesAtLevel=[];

let maxLevel=0;

//This loop is used to check maximum level of the nodes to divide the nodes equally
for(let i=0;i<data.length;i++){
    if(data[i].Level>maxLevel){
        maxLevel=data[i].Level;
    }
}

for(let i=0;i<=maxLevel;i++){
    numOfNodesAtLevel[i]=0;
}

for(let i=0;i<data.length;i++){
    numOfNodesAtLevel[data[i].Level]++;

}

    console.log(numOfNodesAtLevel);


let row=Math.ceil(12/maxLevel);
console.log(row);

for(let i=0;i<data.length;i++){

    if(data[i].Type=="Decision"){
        

    }
}