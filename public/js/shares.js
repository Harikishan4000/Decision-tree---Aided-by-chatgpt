fetch('/get-share-output-json')
  .then(response => response.json())
  .then(finaljson => {
    const shareFetchPromises = [
      '/get-share1-json',
      '/get-share2-json',
      '/get-share3-json'
    ].map(url => fetch(url).then(response => response.json()));

    return Promise.all(shareFetchPromises)
    .then(([share1json, share2json, share3json]) => {
      if (!share1json["Meta Data"] || !share1json["Meta Data"]["2. Symbol"]) {
        console.error("Symbol data not found for share 1");
        return;
      }
      if (!share2json["Meta Data"] || !share2json["Meta Data"]["2. Symbol"]) {
        console.error("Symbol data not found for share 2");
        return;
      }
      if (!share3json["Meta Data"] || !share3json["Meta Data"]["2. Symbol"]) {
        console.error("Symbol data not found for share 3");
        return;
      }
  
      finaljson[1].name = share1json["Meta Data"]["2. Symbol"];
      finaljson[2].name = share2json["Meta Data"]["2. Symbol"];
      finaljson[3].name = share3json["Meta Data"]["2. Symbol"];
  
      processShareData(finaljson, 0, share1json);
      processShareData(finaljson, 1, share2json);
      processShareData(finaljson, 2, share3json);
  
      console.log(finaljson);
  
      fetch('http://localhost:5000/updateoutputshare', {
        method: "POST",
        body: JSON.stringify(finaljson),
        headers: {
          'Content-type': 'application/json',
        }
      });
    })
    .catch(error => {
      console.error('Error fetching share JSON:', error);
    });
  
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

  function processShareData(finaljson, index, shareJson) {
    const share = shareJson["Monthly Adjusted Time Series"];
  
    if (!share) {
      console.error(`Monthly Adjusted Time Series not found for share ${index + 1}`);
      return;
    }
  
    const n = share.length < 36 ? share.length / 12 : 2;
  
    for (let k = 0; k < n; k++) {
      let shareAvg = 0;
      let shareLossCount = 0;
      let shareProfitCount = 0;
      let count=0;
      for (var key in share) {
        const dataPoint = share[key];
        console.log(dataPoint);
  
        if (!dataPoint || !dataPoint["4. close"] || !dataPoint["1. open"]) {
          console.error(`Data point missing or incomplete for share ${index + 1}, month ${i + 1}, year ${k+1}`);
          continue;
        }
  
        const close = parseFloat(dataPoint["4. close"]);
        const open = parseFloat(dataPoint["1. open"]);
  
        shareAvg += close - open;
  
        if (close >= open) {
          shareProfitCount++;
        } else {
          shareLossCount++;
        }
        count++;
        if(count==12)
            break;
      }
  
      shareAvg /= 12;
      const shareLoss = shareLossCount / 12;
      const shareProfit = shareProfitCount / 12;
  
      const payoffIndex = k * 6 + index * 3 + 5;
      const probabilityIndex = k * 6 + index * 3 + 6;
  
      finaljson[payoffIndex].payoff = shareAvg;
      finaljson[payoffIndex].probability = shareProfit;
      finaljson[probabilityIndex].payoff = shareAvg;
      finaljson[probabilityIndex].probability = shareLoss;
    }
  }
  