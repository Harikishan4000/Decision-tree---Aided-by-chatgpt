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

const mapsbut=document.querySelector(".mapsbut");
mapsbut.addEventListener("click", ()=>{
    window.location.href='/maps';
    
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



const dur=querySelector("#duration");

fetch('/get-share-output-json')
  .then(response => response.json())
  .then(finaljson => {

        fetch('/get-share1-json')
        .then(response => response.json())
        .then(share1json => {
            var share1={...share1json["Monthly Adjusted Time Series"]};
            var share1avg=0;
            var share1losscount=0;
            var share1profitcount=0
            if(dur===1){
                for(let i=0;i<12;i++){
                    share1avg+=share1[i]["4. close"]-share1[i]["1. open"];
                    if(share1[i]["4. close"]>=share1[i]["1. open"]){
                        share1profitcount++;
                    }else{
                        share1losscount++;
                    }
                }
                share1avg/=12;
                var share1loss=share1losscount/12;
                var share1profit=share1profitcount/12;
                finaljson[5].payoff=share1avg;
                finaljson[5].probability=share1profit;
                finaljson[6].payoff=share1avg;
                finaljson[6].probability=share1loss;
            }else if(dur===2){
                for(let k=0;k<dur;k++){
                    for(let i=0;i<12;i++){
                        share1avg+=share1[i]["4. close"]-share1[i]["1. open"];
                        if(share1[i]["4. close"]>=share1[i]["1. open"]){
                            share1profitcount++;
                        }else{
                            share1losscount++;
                        }
                    }
                    share1avg/=12;
                    var share1loss=share1losscount/12;
                    var share1profit=share1profitcount/12;
                    if(k==0){
                        finaljson[5].payoff=share1avg;
                        finaljson[5].probability=share1profit;
                        finaljson[6].payoff=share1avg;
                        finaljson[6].probability=share1loss;
                    }
                    if(k==1){
                        finaljson[8].payoff=share1avg;
                        finaljson[8].probability=share1profit;
                        finaljson[9].payoff=share1avg;
                        finaljson[9].probability=share1loss;
                    }
                }
            }else{
                for(let k=0;k<dur;k++){
                    for(let i=0;i<12;i++){
                        share1avg+=share1[i]["4. close"]-share1[i]["1. open"];
                        if(share1[i]["4. close"]>=share1[i]["1. open"]){
                            share1profitcount++;
                        }else{
                            share1losscount++;
                        }
                    }
                    share1avg/=12;
                    var share1loss=share1losscount/12;
                    var share1profit=share1profitcount/12;
                    if(k==0){
                        finaljson[5].payoff=share1avg;
                        finaljson[5].probability=share1profit;
                        finaljson[6].payoff=share1avg;
                        finaljson[6].probability=share1loss;
                    }
                    if(k==1){
                        finaljson[8].payoff=share1avg;
                        finaljson[8].probability=share1profit;
                        finaljson[9].payoff=share1avg;
                        finaljson[9].probability=share1loss;
                    }
                    if(k==2){
                        finaljson[11].payoff=share1avg;
                        finaljson[11].probability=share1profit;
                        finaljson[12].payoff=share1avg;
                        finaljson[12].probability=share1loss;
                    }
                }
            }
            
        })
        .catch(error => {
            console.error('Error fetching JSON: Someting wrong with share1');
            
        });


        fetch('/get-share2-json')
        .then(response => response.json())
        .then(share2json => {
            var share2={...share2json["Monthly Adjusted Time Series"]};
            var share2avg=0;
            var share2losscount=0;
            var share2profitcount=0
            if(dur===1){
                for(let i=0;i<12;i++){
                    share2avg+=share2[i]["4. close"]-share2[i]["1. open"];
                    if(share2[i]["4. close"]>=share2[i]["1. open"]){
                        share2profitcount++;
                    }else{
                        share2losscount++;
                    }
                }
                share2avg/=12;
                var share2loss=share2losscount/12;
                var share2profit=share2profitcount/12;
                finaljson[14].payoff=share2avg;
                finaljson[14].probability=share2profit;
                finaljson[15].payoff=share2avg;
                finaljson[15].probability=share2loss;
            }else if(dur===2){
                for(let k=0;k<dur;k++){
                    for(let i=0;i<12;i++){
                        share2avg+=share2[i]["4. close"]-share2[i]["1. open"];
                        if(share2[i]["4. close"]>=share2[i]["1. open"]){
                            share2profitcount++;
                        }else{
                            share2losscount++;
                        }
                    }
                    share2avg/=12;
                    var share2loss=share2losscount/12;
                    var share2profit=share2profitcount/12;
                    if(k==0){
                        finaljson[14].payoff=share2avg;
                        finaljson[14].probability=share2profit;
                        finaljson[15].payoff=share2avg;
                        finaljson[15].probability=share2loss;
                    }
                    if(k==1){
                        finaljson[17].payoff=share2avg;
                        finaljson[17].probability=share2profit;
                        finaljson[18].payoff=share2avg;
                        finaljson[18].probability=share2loss;
                    }
                }
            }else{
                for(let k=0;k<dur;k++){
                    for(let i=0;i<12;i++){
                        share2avg+=share2[i]["4. close"]-share2[i]["1. open"];
                        if(share2[i]["4. close"]>=share2[i]["1. open"]){
                            share2profitcount++;
                        }else{
                            share2losscount++;
                        }
                    }
                    share2avg/=12;
                    var share2loss=share2losscount/12;
                    var share2profit=share2profitcount/12;
                    if(k==0){
                        finaljson[14].payoff=share2avg;
                        finaljson[14].probability=share2profit;
                        finaljson[15].payoff=share2avg;
                        finaljson[15].probability=share2loss;
                    }
                    if(k==1){
                        finaljson[17].payoff=share2avg;
                        finaljson[17].probability=share2profit;
                        finaljson[18].payoff=share2avg;
                        finaljson[18].probability=share2loss;
                    }
                    if(k==2){
                        finaljson[20].payoff=share2avg;
                        finaljson[20].probability=share2profit;
                        finaljson[21].payoff=share2avg;
                        finaljson[21].probability=share2loss;
                    }
                }
            }
            
        })
        .catch(error => {
            console.error('Error fetching JSON: Someting wrong with share2');
        });

        

        fetch('/get-share3-json')
        .then(response => response.json())
        .then(share3json => {
            var share3={...share3json["Monthly Adjusted Time Series"]};
            var share3avg=0;
            var share3losscount=0;
            var share3profitcount=0
            if(dur===1){
                for(let i=0;i<12;i++){
                    share3avg+=share3[i]["4. close"]-share3[i]["1. open"];
                    if(share3[i]["4. close"]>=share3[i]["1. open"]){
                        share3profitcount++;
                    }else{
                        share3losscount++;
                    }
                }
                share3avg/=12;
                var share3loss=share3losscount/12;
                var share3profit=share3profitcount/12;
                finaljson[23].payoff=share3avg;
                finaljson[23].probability=share3profit;
                finaljson[24].payoff=share3avg;
                finaljson[24].probability=share3loss;
            }else if(dur===2){
                for(let k=0;k<dur;k++){
                    for(let i=0;i<12;i++){
                        share3avg+=share3[i]["4. close"]-share3[i]["1. open"];
                        if(share3[i]["4. close"]>=share3[i]["1. open"]){
                            share3profitcount++;
                        }else{
                            share3losscount++;
                        }
                    }
                    share3avg/=12;
                    var share3loss=share3losscount/12;
                    var share3profit=share3profitcount/12;
                    if(k==0){
                        finaljson[23].payoff=share3avg;
                        finaljson[23].probability=share3profit;
                        finaljson[24].payoff=share3avg;
                        finaljson[24].probability=share3loss;
                    }
                    if(k==1){
                        finaljson[26].payoff=share3avg;
                        finaljson[26].probability=share3profit;
                        finaljson[27].payoff=share3avg;
                        finaljson[27].probability=share3loss;
                    }
                }
            }else{
                for(let k=0;k<dur;k++){
                    for(let i=0;i<12;i++){
                        share3avg+=share3[i]["4. close"]-share3[i]["1. open"];
                        if(share3[i]["4. close"]>=share3[i]["1. open"]){
                            share3profitcount++;
                        }else{
                            share3losscount++;
                        }
                    }
                    share3avg/=12;
                    var share3loss=share3losscount/12;
                    var share3profit=share3profitcount/12;
                    if(k==0){
                        finaljson[23].payoff=share3avg;
                        finaljson[23].probability=share3profit;
                        finaljson[24].payoff=share3avg;
                        finaljson[24].probability=share3loss;
                    }
                    if(k==1){
                        finaljson[26].payoff=share3avg;
                        finaljson[26].probability=share3profit;
                        finaljson[27].payoff=share3avg;
                        finaljson[27].probability=share3loss;
                    }
                    if(k==2){
                        finaljson[29].payoff=share3avg;
                        finaljson[29].probability=share3profit;
                        finaljson[30].payoff=share3avg;
                        finaljson[30].probability=share3loss;
                    }
                }
            }
            
        })
        .catch(error => {
            console.error('Error fetching JSON: Someting wrong with share3');
        });


        fetch('/get-json')
            .then(response => response.json())
            .then(jsondata => {
                jsondata={...finaljson}
            })
            .catch(error => {
            console.error('Error fetching JSON: Couldnt copy into output.json');
            });
        


})
.catch(error => {
  load.style.display="block";
  setTimeout(function () { 
    location.reload();
  }, 60 * 100);
  console.error('Error fetching JSON:', error);
});


