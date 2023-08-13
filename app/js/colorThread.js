// webworker.js

self.onmessage = function (e) {
  
  if(e.data.data){


  const {currentIndex, endIndex} = e.data.data;
 // const batchSize = 100; // Adjust the batch size as needed

  function generateColor(startIndex, endIndex) {
      let htmlEle = ``;
      for (let r = startIndex; r < endIndex; r++) {
          for (let g = 0; g <= 255; g++) {
              if (htmlEle.length >= 500000) break; // Limit string length
              for (let b = 0; b <= 255; b++) {
                  const color = `rgb(${r}, ${g}, ${b})`;
                  htmlEle += `<div color="${color}" style="background-color: ${color}; width: 30px; height: 30px; margin: 2px;"></div>`;
              }
          }
      }
      return htmlEle;
  }


let next  = {currentIndex:currentIndex+endIndex, endIndex:endIndex+endIndex} 


let batchHtml =   generateColor(currentIndex, endIndex)
   self.postMessage({ message: "batch", data: batchHtml ,  next });
  }
};
