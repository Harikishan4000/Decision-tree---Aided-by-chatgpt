fetch('/get-share-output-json')
  .then(response => response.json())
  .then(finaljson => {
    fetch('/get-share1-json')
      .then(response => response.json())
      .then(share1json => {
        finaljson[1].name = share1json["Meta Data"]["2. Symbol"];
        // console.log(finaljson[1].name);
        var share1={...share1json["Monthly Adjusted Time Series"]};
            var share1avg=0;
            var share1losscount=0;
            var share1profitcount=0
            if(share1.length<36){
                let n=share1.length/12;
            }else
                n=2;
                let count=0;
                for(let k=0;k<n;k++){
                    for(key in share1){
                        // console.log(key);
                        count++;
                        if(count>12) break;
                        share1avg+=share1[key]["4. close"]-share1[key]["1. open"];
                        if(share1[key]["4. close"]>=share1[key]["1. open"]){
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

        fetch('/get-share2-json')
          .then(response => response.json())
          .then(share2json => {
            finaljson[2].name = share2json["Meta Data"]["2. Symbol"];

            var share2={...share2json["Monthly Adjusted Time Series"]};
            var share2avg=0;
            var share2losscount=0;
            var share2profitcount=0
            if(share2.length<36){
                let n=share2.length/12;
            }else
                n=2;
                let count=0;
                for(let k=0;k<n;k++){
                    for(key in share2){
                        count++;
                        if(count>12) break;
                        console.log(key);

                        share2avg+=share2[key]["4. close"]-share2[key]["1. open"];
                        if(share2[key]["4. close"]>=share2[key]["1. open"]){
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

            fetch('/get-share3-json')
              .then(response => response.json())
              .then(share3json => {
                finaljson[3].name = share3json["Meta Data"]["2. Symbol"];

                var share3={...share3json["Monthly Adjusted Time Series"]};
            var share3avg=0;
            var share3losscount=0;
            var share3profitcount=0
            if(share3.length<36){
                let n=share3.length/12;
            }else
                n=2;
                let count=0;
                for(let k=0;k<n;k++){
                    for(key in share3){
                        count++;
                        if(count>12) break;
                        share3avg+=share3[key]["4. close"]-share3[key]["1. open"];
                        if(share3[key]["4. close"]>=share3[key]["1. open"]){
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


                console.log(finaljson);
                var finalData = { ...finaljson };

                fetch('http://localhost:5000/updateoutputshare', {
                  method: "POST",
                  body: JSON.stringify(finalData),
                  headers: {
                    'Content-type': 'application/json',
                  }
                });
              })
              .catch(error => {
                console.error('Error fetching JSON:', error);
              });
          })
          .catch(error => {
            console.error('Error fetching JSON:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });
