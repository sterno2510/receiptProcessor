const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './build')));

const customerData = new Map();

// route to get Customer ID
app.post('/receipts/process', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing or empty.' });
  }

  const customerId = uuidv4();
  console.log(`Generating new customer ID: ${customerId}`);
  req.body.customerId = customerId;

  customerData.set(customerId, req.body);

  axios.post(`http://localhost:3001/receipts/${customerId}/points`)
    .then(rewardsPoints => {
      res.json(rewardsPoints.data);
    })
    .catch(error => {
      console.error('Error processing receipt:', error.message);
      res.status(500).json({ error: 'Failed to process receipt.' });
    });
});


// function to actually calculate reward points
const calculateRewardPoints = (receipt) => {
  let rewardPoints = 0;

  let numberOfCharacters = receipt.retailer.split(" ").join("").length;
  rewardPoints += numberOfCharacters;

  if (Number(receipt.total) % 1 === 0) {
    rewardPoints += 50;
  }

  if (Number(receipt.total) % 0.25 === 0) {
    rewardPoints += 25;
  };

  let numberOfItems = receipt.items.length;
    rewardPoints += Math.floor(numberOfItems / 2) * 5;

  receipt.items.map((item) => {
    if (item.shortDescription.trim().length % 3 === 0) {
        rewardPoints += Math.ceil(item.price * .2);
    }
  })

  let parsedDate = receipt.purchaseDate.split("-")
  if (parsedDate[2] % 2 !== 0) {
    rewardPoints += 6;
  }

  let timeNumber = Number(receipt.purchaseTime.replace(':', ''));
  if (timeNumber > 1400 && timeNumber < 1600) {
    rewardPoints += 10;
  }
  return rewardPoints;
}

// route to calculate number of reward points:
app.post('/receipts/:id/points', (req, res) => {
  console.log('calculating the customers reward points')
  let rewardPoints = 0;
  const customerID = req.params.id;
  if (!customerData.has(customerID)) {
    res.status(404).send("Customer not found");
  }

  const receipt = customerData.get(customerID);
  rewardPoints = calculateRewardPoints(receipt);


  res.send({points: rewardPoints});
})

app.get('*', (req, res) => {
  console.log('getting main page');
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
