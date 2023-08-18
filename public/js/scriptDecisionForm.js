const gridDesign=document.querySelector(".gridContainer");
let totDivs= 300;

//? Add 300 gridItem with empty value string and naming all gridItems with succeeding number.
for(let i=0; i<totDivs;i++){
    var new_div=document.createElement("div");
    new_div.classList.add("grid-item");
    gridDesign.appendChild(new_div);
}

const sub=document.querySelector(".formSubmit");

sub.addEventListener("click", ()=>{
    window.location.href='/tree';
})

const sharebut=document.querySelector(".sharebut");
sharebut.addEventListener("click", ()=>{
    window.location.href='/sharetree';
})

const decisionbut=document.querySelector(".decisionbut");
decisionbut.addEventListener("click", ()=>{
    window.location.href='/';
    
})