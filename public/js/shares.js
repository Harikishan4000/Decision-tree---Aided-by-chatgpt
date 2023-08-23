
fetch('/get-share-output-json')
  .then(response => response.json())
  .then(jsondata => {
        fetch('/get-share1-json')
            .then(response => response.json())
            .then(share1 => {

                jsondata[1].name=share1["Meta Data"]["2. Symbol"];
                console.log(jsondata[1].name);

            }).catch(error => {
                console.error('Error fetching JSON:', error);
            });

            fetch('/get-share2-json')
            .then(response => response.json())
            .then(share2 => {
                jsondata[2].name=share2["Meta Data"]["2. Symbol"];
            }).catch(error => {
                console.error('Error fetching JSON:', error);
            });

            fetch('/get-share3-json')
            .then(response => response.json())
            .then(share3 => {

                jsondata[3].name=share3["Meta Data"]["2. Symbol"];
            }).catch(error => {
                console.error('Error fetching JSON:', error);
            });

            fetch('http://localhost:5000/updateoutputshare', {
                method: "POST",
                body: JSON.stringify(jsondata),
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded',
        }

    })

  }).catch(error => {
    console.error('Error fetching JSON:', error);
  });
