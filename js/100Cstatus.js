function getStatBurn(){
    fetch("https://horizon.stellar.org/accounts/GCKO3G5IU5XVFGPX7ZI7XAXRR6YAPPRDYVPC3VTOG7SKIFBFPPLVUGLB/payments?order=desc&limit=50")
    .then(res => res.json())
    .then(json => {
      console.log(json);
      for (let i = 0; i < 30; i++) {
        if (json._embedded.records[i].to == "GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA") {
          // get id :
          var txID0 = json._embedded.records[i].id;
          var txID = txID0.slice(0,3) +".."+ txID0.slice(-3) ;
          var burnAmt0 = parseFloat(json._embedded.records[i].amount);
          var burnAmt = burnAmt0.toFixed(2);
          // get time:
          var cTm0 = json._embedded.records[i].created_at;
          var cTm1 = cTm0.slice(0,10);
          var cTm2 = (cTm0.slice(-9)).slice(0,8);
          var burnAst = json._embedded.records[i].asset_code;
          //printData
          $("#burnStats").append("<tr><td>"+ cTm1 +" "+ cTm2 +"</td><td class='rgt'>"+ burnAmt +" 🔥</td><td>" +burnAst+"</td><td><a href='https://lumenscan.io/ops/"+txID0+"' target='_blank' rel='noopener noreferrer'>"+txID+"&nearr;</a></td></tr>");
        } else {
          console.log("non-AQUA burn is not included in the result");
        }
      }
    });
    getBuyStats()
}
function getBuyStats(){
  fetch("https://horizon.stellar.org/accounts/GC74BGDPPOYEQ6HO6X3N3L6MLTZGOPZYWES5J63EIKQF6QXFF322DM2N/offers?order=desc&limit=50")
  .then(res => res.json())
  .then(json => {
    console.log(json);
    for (let j = 0; j < json._embedded.records.length; j++) {
      var bTm0 = json._embedded.records[j].last_modified_time;
      var bTm1 = bTm0.slice(0,10);
      var bTm2 = (bTm0.slice(-9)).slice(0,8);
      var bPrc0 = json._embedded.records[j].price_r.d / json._embedded.records[j].price_r.n;
      var bPrc = bPrc0.toFixed(4);
      var sAm0 = parseFloat(json._embedded.records[j].amount);
      var sAmt = sAm0.toFixed(2);
      var bAm0 = sAmt / bPrc;
      var bAmt = bAm0.toFixed(0);
      var bID0 = json._embedded.records[j].id;
      var bID = bID0.slice(0,3) +".."+ bID0.slice(-3);
      $("#buyStats").append("<tr><td>"+ bTm1 +" "+ bTm2 +"</td><td class='rgt'>"+ bAmt +"</td><td>" + bPrc +"</td><td><a href='https://stellar.expert/explorer/public/offer/"+bID0+"' target='_blank' rel='noopener noreferrer'>"+bID+"&nearr;</a></td></tr>");
    }
        
  });
}
