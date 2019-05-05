function getChange(totalPayable, cashPaid){
    'use strict';
    var coins = [200, 100, 50, 20, 10, 5, 2, 1];
    var payable = cashPaid - totalPayable;
    var change = [];
    while(payable>0){
        for(var i=0;i<coins.length;i++){
            while(payable >= coins[i]){
                change.push(coins[i]);
                payable-=coins[i];
            }
        }
    }
    return change;
}

console.log(getChange(486,600)); // Should return [50,20,10,5];
// [200, 100, 50, 20, 10, 5, 2, 1];
