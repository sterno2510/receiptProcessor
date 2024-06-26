import { React, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ListStyled = styled.li`
  padding: 10px;
`;

const JsonStyled = styled.pre`
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 5px;
    overflow-x: auto;
    white-space: pre-wrap;
    text-align: start !important;
`;

const JsonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const receiptOne = {
  "retailer": "Walgreens",
  "purchaseDate": "2022-01-02",
  "purchaseTime": "08:13",
  "total": "2.65",
  "items": [
      {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
      {"shortDescription": "Dasani", "price": "1.40"}
  ]
};

const receiptTwo = {
  "retailer": "Target",
  "purchaseDate": "2022-01-02",
  "purchaseTime": "13:13",
  "total": "1.25",
  "items": [
      {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
  ]
};

const receiptThree = {
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
};

const ReceiptProcessor = () => {
  const [rewardPoints, setRewardPoints] = useState(0);

  const calculateRewardPoints = (receipt) => {
    axios.post('/receipts/process', receipt)
    .then((response) => {
      setRewardPoints(response.data.points);
    })
    .catch((error) => {
      console.log(`There was an error submitting the receipt ${error}`);
    })
  }
  return (
    <>
      <h1>Receipt Rewards Processor</h1>
          <JsonContainer>
            <JsonStyled>
              <h2>Sample Receipt 1</h2>
              {JSON.stringify(receiptOne, null, 2)}
            </JsonStyled>
            <JsonStyled>
              <h2>Sample Receipt 2</h2>
              {JSON.stringify(receiptTwo, null, 2)}
            </JsonStyled>
            <JsonStyled>
              <h2>Sample Receipt 3</h2>
              {JSON.stringify(receiptThree, null, 2)}
            </JsonStyled>
          </JsonContainer>
        <ListStyled>
          <button type='button' onClick={() => {calculateRewardPoints(receiptOne)}}>Click to calculate rewards for Sample Receipt 1</button>
      </ListStyled>
        <ListStyled>
          <button type='button' onClick={() => {calculateRewardPoints(receiptTwo)}}>Click to calculate rewards for Sample Receipt 2</button>
      </ListStyled>
        <ListStyled>
          <button type='button' onClick={() => {calculateRewardPoints(receiptThree)}}>Click to calculate rewards for Sample Receipt 3</button>
      </ListStyled>
      <div>Rewards Points Earned: {rewardPoints}</div>
    </>
  )
};

export default ReceiptProcessor;