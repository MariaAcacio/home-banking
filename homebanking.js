//Declaration of variables.

var userName = "María Gabriela";
var accountBalance = 10000;
var extractionLimit = 5000;
var waterService = 350;
var phoneService = 425;
var lightService = 210;
var internetService = 570;
var friendAccount1 = 1234567;
var friendAccount2 = 7654321;
var securityCode = 1234;
//Execution of the functions that update the values ​​of the variables in the HTML.
var addMoneyToTheAccount = function (balance,money) {
	return balance + money;
}
var subtractMoneyFromAccount = function (balance, money) {
	return balance -= money;
}

window.onload = function() {
    loadScreenName();
    updateBalanceOnScreen();
    updateLimitOnScreen();
}

function changeExtractionLimit() {
	var limitRequested = prompt("Enter the new withdrawal limit");
	var limitRequested2 = parseInt(limitRequested);
	if(!isNaN(limitRequested2)){
		extractionLimit = limitRequested2;
		console.log("new extraction limit" + extractionLimit);
		updateLimitOnScreen();
		alert("New withdrawal limit: " + limitRequested2);
	}
	else if (isNaN(limitRequested)) {
		alert("The amount you just entered is invalid.");
	}
	else{
		alert("You have canceled the operation");
	}
}
function thereIsABalanceAvailable(amount, balance) {
	if(amount <= balance) return true;
	return false;
}

function extractMoney() {
	var previousBalance = accountBalance;
	var amountToWithdraw = prompt("Enter the amount of money you want to withdraw");
	var amountToWithdrawIsNum = parseInt(amountToWithdraw);
	if(!isNaN(amountToWithdrawIsNum)){

		if (thereIsABalanceAvailable(amountToWithdrawIsNum, accountBalance)) 
		{
			if ((amountToWithdrawIsNum%100) === 0) {
				
				if (amountToWithdrawIsNum <= extractionLimit) {
					
					accountBalance = subtractMoneyFromAccount(accountBalance, amountToWithdrawIsNum);	
					var currentBalance = previousBalance - amountToWithdrawIsNum;
					alert("You have withdrawn: " + amountToWithdrawIsNum + "\n"
						+ "Previous balance: " + previousBalance + "\n"
						+ "Current balance: " + currentBalance
					);
					updateBalanceOnScreen();
				}
				else{
				alert("The amount of money you want to withdraw is greater than your withdrawal limit.");	
				}
			}
			else{
				alert("You can only extract bills of 100");
			}
		}
		else{
				alert("There is no available balance in your account to withdraw that amount of money");
		}
	}
	else if(isNaN(amountToWithdraw)){
		alert("The amount you just entered is invalid.");
	}
	else{
		alert("You have canceled the operation.");
	}
}

function depositMoney() {
	var userDepositMoney = prompt("Enter the amount of money you want to deposit");
	var userDepositMoneyIsNum = parseInt(userDepositMoney);
	if (!isNaN(userDepositMoneyIsNum)) {
		accountBalance = addMoneyToTheAccount(accountBalance,userDepositMoneyIsNum);
		alert("You have deposited: " + userDepositMoneyIsNum + "\n"
		 	+ "Previous balance: " + (accountBalance - userDepositMoneyIsNum)  + "\n"
		 	+ "Current balance: " + accountBalance 
		);
		updateBalanceOnScreen();
	}
	else if(isNaN(userDepositMoney)){
		alert("The amount you just entered is invalid.");
	}
	else{
		alert("You have canceled the operation.");
	}
}

function serviceCharge(balance, service) {
	if (balance >= service) {
		balance = subtractMoneyFromAccount(balance, service);
		alert("You have paid for the water service. \n previous balance: $" 
			+ (balance + service) + "\n discounted money: $" + service 
			+ "\n current balance: $" + balance );
	}
	else{
		alert("Insufficient balance");
	}
	return balance;
}

function payForServices() {
	var serviceChosenByTheUser =
		prompt("Enter the number that corresponds to the service you want to pay:\n 1 - Water \n 2 - Light \n 3 - Internet \n 4 - Phone");
	var serviceChosenByTheUser2 =
		parseInt(serviceChosenByTheUser);
	if (!isNaN(serviceChosenByTheUser2)) {
		
		switch (serviceChosenByTheUser2) {
			case 1:
				accountBalance = serviceCharge(accountBalance,waterService);
			break;
			case 2:
				accountBalance = serviceCharge(accountBalance,lightService);
			break;
			case 3:
				accountBalance = serviceCharge(accountBalance,internetService);
			break;
			case 4:
				accountBalance = serviceCharge(accountBalance,phoneService);
			break;
			default:
				alert("The chosed service doesn't exist");
			break;
		}
	}
	else if (isNaN(serviceChosenByTheUser)) {
		alert("The amount you just entered is invalid.");
	}
	else{
		alert("You have canceled the operation");
	}
	updateBalanceOnScreen();
}

function transferMoney() {
	var amountToTransfer = prompt("Enter the amount you want to transfer");
	var amountToTransfer2 = parseInt(amountToTransfer);
	if(!isNaN(amountToTransfer2)){
		if (thereIsABalanceAvailable(amountToTransfer2,accountBalance)) {
			var accountTransfer =parseInt(prompt("Enter the account number you want to transfer to."));
			if (accountTransfer === friendAccount1) {
				accountBalance = subtractMoneyFromAccount(accountBalance, amountToTransfer2);
				alert("Have been transferred $" + amountToTransfer + "\nDestination account: " + friendAccount1 );
				updateBalanceOnScreen();
			}
			else if (accountTransfer === friendAccount2) {
				accountBalance = subtractMoneyFromAccount(accountBalance, amountToTransfer2);
				alert("Have been transferred $" + amountToTransfer2 + "\nDestination account: " + friendAccount2 );
				updateBalanceOnScreen();
			}
			else {
				alert("Money can only be transferred to a friendly account.");
			}
		}
		else{
			alert("Insufficient balance");
		}
	}
	else if (amountToTransfer === null) {
		alert("You have canceled the operation.")
		
	}
	else{
		alert("The amount you just entered is invalid");
	}
}

function logIn() {
	var enterTheCode = parseInt(prompt("Enter your account password"));
	if (enterTheCode === securityCode) {
		alert("Welcome " + userName + " you can now start to perform operations");
	}
	else{
		accountBalance = subtractMoneyFromAccount(accountBalance,accountBalance);
		alert("Wrong password, your money has been withheld for security reasons");
		updateBalanceOnScreen();
	}

}

//Functions that update the value of variables in HTML
function loadScreenName() {
    document.getElementById("name").innerHTML = "Welcome " + userName;
}

function updateBalanceOnScreen() {
    document.getElementById("balance-account").innerHTML = "$" + accountBalance;
}

function updateLimitOnScreen() {
    document.getElementById("extraction-limit").innerHTML = "Your withdrawal limit is: $" + extractionLimit;
}
logIn();