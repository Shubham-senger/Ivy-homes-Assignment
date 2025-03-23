const express = require('express');
const app = express();
const generate = require('./character.js');
const allName = generate();

// Middleware to parse JSON request bodies
app.use(express.json());

// Add CORS middleware for frontend connections
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const url = 'http://35.200.185.69:8000';

// Extract names from the autocomplete service
const extractName = async (num,query) => {
  try {
    const startTime = Date.now();
    const response = await fetch(`${url}/v${num}/autocomplete?query=${query}`);
    const data = await response.json();
    const endTime = Date.now();

    console.log(`Fetch time for "${query}": ${endTime - startTime}ms`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching data for query "${query}":`, error);
    return [];
  }
};

// Extract all names from the autocomplete service
const extractAllName = async (num) => {
  const uniqueNames = new Set();
  
  for (let i = 0; i < allName.length; i++) {
    try {
      const results = await extractName(num,allName[i]);
      if (Array.isArray(results)) {
        results.forEach(name => uniqueNames.add(name));
      }
      console.log(`Processed ${i + 1}/${allName.length} names, found ${uniqueNames.size} unique names so far`);
    } catch (error) {
      console.error(`Error processing ${allName[i]}:`, error);
    }
  }
  
  return Array.from(uniqueNames);
};

// Route to get all names or search with query
app.get('/api/names', async (req, res) => {
  try {
    const query = req.query.q;
    const num = req.query.num || '1';

    if (query) {
      console.log(`Searching for names matching: ${query}`);
      const searchResults = await extractName(num,query);
      res.json(searchResults);
    } else {
      console.log('Extracting all names...');
      const allNames = await extractAllName(num);
      console.log(`Extracted ${allNames.length} unique names`);
      res.json(allNames);
    }
  } catch (e) {
    console.error('Server Error:', e);
    res.status(500).send('Server Error');
  }
});



// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




// Same code but after applying rate limiting concept.


// const express = require('express');
// const app = express();
// const generate = require('./character.js');
// const allName = generate();

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Add CORS middleware for frontend connections
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// const url = 'http://35.200.185.69:8000';

// // Extract names from the autocomplete service
// const extractName = async (num,query,retries=3,delay=500) => {
//     for(let i=0;i<retries;i++){

//         try {
//           const response = await fetch(`${url}/v${num}/autocomplete?query=${query}`);
//           if(!response.ok){
//             console.error(`Failed request(Attemp${attempt+1}):${response.status}`);
//             if(response.status===429){
//                 console.log(`Rate limited! Retrying after ${delay}ms...`);
//                 await new Promise(resolve => setTimeout(resolve, delay));
//                 continue;
                
//             }
//             throw new Error(`HTTP Error: ${response.status}`);
//           }
//           const data = await response.json();
          
      
//           return data.results || [];
//         } catch (error) {
//             console.error(`Error fetching names:`, error);
//             await new Promise(resolve => setTimeout(resolve, delay));
//             return [];
//         }
//     }
// };

// // Extract all names from the autocomplete service
// const extractAllName = async (num) => {
//   const uniqueNames = new Set();
//   let requestDelay = 300;
  
//   for (let i = 0; i < allName.length; i++) {
//     try {
//       const results = await extractName(num,allName[i],3,requestDelay);
//       if (Array.isArray(results)) {
//         results.forEach(name => uniqueNames.add(name));
//       }
//       console.log(`Processed ${i + 1}/${allName.length} names, found ${uniqueNames.size} unique names so far`);
//       if(results.length===0){
//         requestDelay+=200;
//       }else{
//         requestDelay=Math.max(300,requestDelay-100);
//       }
//     } catch (error) {
//       console.error(`Error processing ${allName[i]}:`, error);
//     }
//   }
  
//   return Array.from(uniqueNames);
// };

// // Route to get all names or search with query
// app.get('/api/names', async (req, res) => {
//   try {
//     const query = req.query.q;
//     const num = req.query.num || '1';

//     if (query) {
//       console.log(`Searching for names matching: ${query}`);
//       const searchResults = await extractName(num,query);
//       res.json(searchResults);
//     } else {
//       console.log('Extracting all names...');
//       const allNames = await extractAllName(num);
//       console.log(`Extracted ${allNames.length} unique names`);
//       res.json(allNames);
//     }
//   } catch (e) {
//     console.error('Server Error:', e);
//     res.status(500).send('Server Error');
//   }
// });



// // Start the server
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

