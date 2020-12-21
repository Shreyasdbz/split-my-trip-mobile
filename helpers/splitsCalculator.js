/** @format */
import uuid from "react-uuid";
//-------------------------------------------------------------------
// Parameters: Participants List and Activities List
// Output: Makes a splits object that will be read by the splits modal
//         Splits Object:
//          [{
//              name
//              id
//              EndingBalance
//              Transactions: [{type: PAY/GET, name, amount}]
//          }]
//
export const makeSplits = (participantsList, activitiesList) => {
  var splits = [];
  var pList = [];
  var aList = activitiesList;
  var positive = [];
  var negative = [];

  for (let i = 0; i < participantsList.length; i++) {
    // Initialize pList values with zero.
    var person_pList = {
      id: participantsList[i].id,
      name: participantsList[i].name,
      pay: 0,
      receive: 0,
      balance: 0,
    };
    pList.push(person_pList);
    // Initialize splits array with empty objects for each person
    var person_splits = {
      id: participantsList[i].id,
      name: participantsList[i].name,
      endingBalance: 0,
      transactions: [],
    };
    splits.push(person_splits);
  }

  //---  Step 1: Calculate the pay, receive and total balance for each participant.

  for (let i = 0; i < pList.length; i++) {
    for (let j = 0; j < aList.length; j++) {
      // check if person was payer
      if (aList[j].payerID == pList[i].id) {
        pList[i].receive += parseFloat(aList[j].cost);
      }
      // check if participated
      var participated = false;
      for (let k = 0; k < aList[j].pickerList.length; k++) {
        if (aList[j].pickerList[k].id === pList[i].id) {
          participated = true;
        }
      }
      if (participated === true) {
        pList[i].pay += aList[j].cost / aList[j].pickerList.length;
      }
    }

    //--- Step 2: Build a Postive & Negative balance list -------

    pList[i].balance = pList[i].receive - pList[i].pay;
    pList[i].balance = Math.round(pList[i].balance * 100) / 100;
    var personObj = {
      id: pList[i].id,
      name: pList[i].name,
      balance: pList[i].balance,
    };
    if (pList[i].balance >= 0) {
      positive.push(personObj);
    } else {
      negative.push(personObj);
    }
  }

  //--- Step3: From the pos/neg list, keep equating to zero out balances

  for (let p = 0; p < positive.length; p++) {
    for (let n = 0; n < negative.length; n++) {
      if (
        Math.abs(positive[p].balance) > Math.abs(negative[n].balance) &&
        positive[p].balance !== 0 &&
        negative[n].balance !== 0
      ) {
        // CASE - Positive > Negative
        var tempBalance = Math.abs(
          positive[p].balance - Math.abs(negative[n].balance)
        );
        positive[p].balance = tempBalance;
        var oweAmount_neg = negative[n].balance;
        negative[n].balance = 0;

        //   cycle through splits List to add
        for (let s = 0; s < splits.length; s++) {
          if (splits[s].id === negative[n].id) {
            //   Paying someone
            splits[s].transactions.push({
              type: "PAY",
              name: positive[p].name,
              spitPersonID: positive[p].id,
              amount: oweAmount_neg,
            });
          }
          if (splits[s].id === positive[p].id) {
            //   Getting from someone
            splits[s].transactions.push({
              type: "GET",
              name: negative[n].name,
              spitPersonID: negative[n].id,
              amount: oweAmount_neg,
            });
          }
        }
      } else if (
        Math.abs(positive[p].balance) < Math.abs(negative[n].balance) &&
        positive[p].balance !== 0 &&
        negative[n].balance !== 0
      ) {
        var tempBal =
          -1 * Math.abs(positive[p].balance - Math.abs(negative[n].balance));
        negative[n].balance = tempBal;
        var oweAmount = positive[p].balance;
        positive[p].balance = 0;

        //   cycle through splits List to add
        for (let s = 0; s < splits.length; s++) {
          // Paying someone
          if (splits[s].id === negative[n].id) {
            splits[s].transactions.push({
              type: "PAY",
              name: positive[p].name,
              spitPersonID: positive[p].id,
              amount: oweAmount,
            });
          }
          if (splits[s].id === positive[p].id) {
            //   Getting from someone
            splits[s].transactions.push({
              type: "GET",
              name: negative[n].name,
              spitPersonID: negative[n].id,
              amount: oweAmount,
            });
          }
        }
      } else {
        if (positive[p].balance !== 0 && negative[n].balance !== 0) {
          //   cycle through splits List to add
          for (let s = 0; s < splits.length; s++) {
            // Paying someone
            if (splits[s].id === negative[n].id) {
              splits[s].transactions.push({
                type: "PAY",
                name: positive[p].name,
                spitPersonID: positive[p].id,
                amount: oweAmount,
              });
            }
            if (splits[s].id === positive[p].id) {
              //   Getting from someone
              splits[s].transactions.push({
                type: "GET",
                name: negative[n].name,
                spitPersonID: negative[n].id,
                amount: oweAmount,
              });
            }
          }

          positive[p].balance = 0;
          negative[n].balance = 0;
        }
      }
    }
  }

  //--- Step 4: Calculate ending balances for everyone

  return splits;
};
