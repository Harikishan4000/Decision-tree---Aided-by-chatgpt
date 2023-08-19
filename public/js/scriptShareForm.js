import jsondata from './listing_status.json' assert { type: 'json' };


const gridDesign=document.querySelector(".gridContainer");
let totDivs= 300;

//? Add 300 gridItem with empty value string and naming all gridItems with succeeding number.
for(let i=0; i<totDivs;i++){
    var new_div=document.createElement("div");
    new_div.classList.add("grid-item");
    gridDesign.appendChild(new_div);
}

// const sub=document.querySelector(".formSubmit");

// sub.addEventListener("click", ()=>{
//     window.location.href='/tree';
// })

const sharebut=document.querySelector(".sharebut");
sharebut.addEventListener("click", ()=>{
    window.location.href='/sharetree';
})

const decisionbut=document.querySelector(".decisionbut");
decisionbut.addEventListener("click", ()=>{
    window.location.href='/';
    
})

const shareOptions=document.querySelector("#shares");  
let share1=document.querySelector('.share1');
let share2=document.querySelector('.share2');
let share3=document.querySelector('.share3');



for(let i=0; i<Object.keys(jsondata).length;i++){
    let opt=document.createElement("option");
    let val=jsondata[i].name+" : "+jsondata[i].symbol;
    opt.setAttribute("value", val);
    opt.setAttribute("symb", jsondata[i].symbol);
    shareOptions.appendChild(opt);
}



const submitBut=document.querySelector(".formSubmit");

submitBut.addEventListener("click", ()=>{
    let temp=share1.value.split(" : ");
    let temp2=share2.value.split(" : ");
    let temp3=share3.value.split(" : ");

    share1.value=temp[1];
    share2.value=temp2[1];
    share3.value=temp3[1];


})
