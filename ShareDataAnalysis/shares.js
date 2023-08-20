import share1data from './share1Data.json' assert { type: 'json' };
import share2data from './share2Data.json' assert { type: 'json' };
import share3data from './share3Data.json' assert { type: 'json' };
import outputshares from './outputShares.json' assert { type: 'json' };

var output={...outputshares}
var shares=[share1data, share2data, share3data]

for(let i=0;i<3;i++){   //?traverse through the shareData.json files
    let currshare=shares[i];

    
}

