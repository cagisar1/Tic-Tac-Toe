let squares=document.getElementsByTagName("td");
let hr=document.querySelector("hr")
let modeBtn=document.querySelectorAll(".mode");
let newGame=document.querySelector("#new");
let firstPlayerScore=document.getElementById("one");
let secondPlayerScore=document.getElementById("two");
let msg=document.querySelector(".message");
let h1=document.querySelector("h1");
let restart=document.querySelector("#restart");
let score=document.querySelector("#rounds");
let play=document.querySelector("#play");
let nameQuestion=document.querySelectorAll("#ask");

let nameOneAnswer=document.querySelector(".firstname");
let nameTwoAnswer=document.querySelector(".secondname");
let nameOneArea=document.querySelector(".one");
let nameTwoArea=document.querySelector(".two");
let firstName;
let secondName;

let winningScore=Number(score.value);
let player=1;
let first=0;
let second=0;
let ok=false;
let color=1;
let rows={
	firstRow: document.querySelectorAll("tr:nth-of-type(1) td"),
	secondRow: document.querySelectorAll("tr:nth-of-type(2) td"),
	thirdRow: document.querySelectorAll("tr:nth-of-type(3) td")
}

nameTwoArea.style.display="none";
msg.style.display="none";
nameOneAnswer.addEventListener("change", function(){
	firstName= this.value;
	nameOneArea.style.display="none";
	nameTwoArea.style.display="inline";
})

nameTwoAnswer.addEventListener("change", function(){
	secondName=this.value;
	nameTwoArea.style.display="none";
	msg.style.display="block";
	ok=true;
})

newGame.addEventListener("click", function(){
	init();
})

day();

score.addEventListener("change", function(){
	if(Number(score.value)<3||Number(score.value>20)){
		ok=false;
		alert("Choose a number between 3-20!!");
	}
	else{
		fromzero();
		winningScore=Number(score.value);
	}
})

restart.addEventListener("click", function(){
	fromzero();
})

document.body.style.backgroundImage="url(\"media/daylight.jpg\")";

for(i=0;i<squares.length;i++){
	squares[i].addEventListener("click",function(){
		if(ok===true){
			if(this.textContent){
			return this.textContent;
			}
			if(player===1){
				this.textContent="X";
				player=2;
				winFirst();
				if(winFirst()){
					first++;
					firstPlayerScore.textContent=first;
					if(first===winningScore){
						msg.textContent=firstName + " wins!!!";
						firstPlayerScore.style.color="blue";
						newGame.style.display="none";
						ok=false;
					}
					else{
						msg.textContent="Point for " + firstName + " !";
						ok=false;
						newGame.textContent="Play again?";
					}
				}
			}
			else{
				this.textContent="0";
				player=1;
				winSecond();
				if(winSecond()){
					second++;
					secondPlayerScore.textContent=second;
					if(second===winningScore){
						msg.textContent= secondName + " wins!!!";
						secondPlayerScore.style.color="blue";
						newGame.style.display="none";
						ok=false;
					}
					else{ 
						msg.textContent="Point for " + secondName + " !";
						ok=false;
						newGame.textContent="Play again?";
					}
				}
			}
		}
		if(full() && !winFirst() && !winSecond()){
			ok=false;
			newGame.textContent="Play again?";		
			msg.textContent="Draw!";	
		}	
	})
}

for(i=0;i<modeBtn.length;i++){
	if(i===0){
		modeBtn[i].addEventListener("click", function(){
			day();
		})
	}
	else{
		modeBtn[i].addEventListener("click", function(){
			night();
		})
	}
}

// functions area
function day(){
	color=1;
	play.style.color="black";
	score.style.color="black";
	msg.classList.add("msgday");
	msg.classList.remove("msgnight");
	hr.classList.remove("hrnight");
	hr.classList.add("hrday");
	h1.classList.remove("h1night");
	h1.classList.add("h1day");
	restart.classList.add("bday");
	restart.classList.remove("bnight");
	document.body.style.backgroundImage="url(\"media/daylight.jpg\")";
	for(i=0;i<nameQuestion.length;i++){
		nameQuestion[i].classList.remove("asknight");
		nameQuestion[i].classList.add("askday");
	}
	nameOneArea.classList.toggle("namesnight");
	nameTwoArea.classList.toggle("namesnight");
	nameOneAnswer.style.color="black";
	nameTwoAnswer.style.color="black";
	for(i=0;i<modeBtn.length;i++){	
		modeBtn[i].classList.remove("bnight");
		modeBtn[i].classList.add("bday");
	}
	newGame.classList.remove("bnight");
	newGame.classList.add("bday");
	for(i=0;i<3;i++){
		rows.secondRow[i].style.borderColor="black";
	}
	rows.firstRow[1].style.borderColor="black";
	rows.secondRow[1].style.borderColor="black";
	rows.thirdRow[1].style.borderColor="black";
	for(i=0;i<squares.length;i++){
		squares[i].style.color="black";
	}
	winFirst();
	winSecond();
}

function night(){
	color=2;
	play.style.color="rgba(212, 4, 50, 0.6)";
	score.style.color="rgba(212, 4, 50, 0.6)";
	msg.classList.remove("msgday");
	msg.classList.add("msgnight");
	hr.classList.remove("hrday");
	hr.classList.add("hrnight");
	h1.classList.remove("h1day");
	h1.classList.add("h1night");
	restart.classList.remove("bday");
	restart.classList.add("bnight");
	document.body.style.backgroundImage="url(\"media/night.jpg\")";
	for(i=0;i<nameQuestion.length;i++){
		nameQuestion[i].classList.remove("askday");
		nameQuestion[i].classList.add("asknight");
	}
	nameOneAnswer.style.color="rgba(212, 4, 50, 0.6)";
	nameTwoAnswer.style.color="rgba(212, 4, 50, 0.6)";
	for(i=0;i<modeBtn.length;i++){
		modeBtn[i].classList.remove("bday");
		modeBtn[i].classList.add("bnight");	
	}
	newGame.classList.add("bnight");
	newGame.classList.remove("bday");
	for(i=0;i<3;i++){
		rows.secondRow[i].style.borderColor="rgba(212, 4, 50, 0.5)";
	}
	rows.firstRow[1].style.borderColor="rgba(212, 4, 50, 0.5)";
	rows.secondRow[1].style.borderColor="rgba(212, 4, 50, 0.5)";
	rows.thirdRow[1].style.borderColor="rgba(212, 4, 50, 0.5)";
	msg.style.color="rgb(212, 4, 50)"
	for(i=0;i<squares.length;i++){
		squares[i].style.color="white";
	}
	winFirst();
	winSecond();
}

function init(){
	if(winSecond()){
		player=2;
	}
	else{
		player=1;
	}
	for(i=0;i<squares.length;i++){
		squares[i].textContent="";
		if(color===1){
			squares[i].style.color="black";
		}
		else{
			squares[i].style.color="white";
		}	
	}
	msg.textContent="";
	ok=true;
}

function fromzero(){
	init();
	first=0;
	second=0;
	firstPlayerScore.textContent="0";
	firstPlayerScore.style.color="black"
	secondPlayerScore.textContent="0";
	secondPlayerScore.style.color="black";
	newGame.style.display="inline-block";
	newGame.textContent="New Game";
	ok=false;
	nameOneArea.style.display="inline";
	nameOneAnswer.value="";
	nameTwoAnswer.value="";
	firstName="";
	secondName="";
}

function full(){
	let x=true;
	for(i=0;i<squares.length;i++){
		if(!squares[i].textContent){
			x=false;
		}
	}
	return x;
}

function winFirst(){
	if(columnsFirstPlayer()){
		return true;
	}
	if(rowsFirstPlayer()){
		return true;
	}
	if(diagonalsFirstPlayer()){
		return true;
	}
	return false;
}

function columnsFirstPlayer(){
	for(i=0;i<=2;i++){
		if(rows.firstRow[i].textContent==="X"&&rows.secondRow[i].textContent==="X"&&rows.thirdRow[i].textContent==="X"){
			rows.firstRow[i].style.color="red";
			rows.secondRow[i].style.color="red";
			rows.thirdRow[i].style.color="red";
			return true;
		}
	}
	return false;
}

function rowsFirstPlayer(){
	if(rows.firstRow[0].textContent==="X"&&rows.firstRow[1].textContent==="X"&&rows.firstRow[2].textContent==="X"){
		rows.firstRow[0].style.color="red";
		rows.firstRow[1].style.color="red";
		rows.firstRow[2].style.color="red";
		return true;
	}
	if(rows.secondRow[0].textContent==="X"&&rows.secondRow[1].textContent==="X"&&rows.secondRow[2].textContent==="X"){
		rows.secondRow[0].style.color="red";
		rows.secondRow[1].style.color="red";
		rows.secondRow[2].style.color="red";
		return true;
	}
	if(rows.thirdRow[0].textContent==="X"&&rows.thirdRow[1].textContent==="X"&&rows.thirdRow[2].textContent==="X"){
		rows.thirdRow[0].style.color="red";
		rows.thirdRow[1].style.color="red";
		rows.thirdRow[2].style.color="red";
		return true;
	}
	return false;
}

function diagonalsFirstPlayer(){
	if(rows.firstRow[0].textContent==="X"&&rows.secondRow[1].textContent==="X"&&rows.thirdRow[2].textContent==="X"){
		rows.firstRow[0].style.color="red";
		rows.secondRow[1].style.color="red";
		rows.thirdRow[2].style.color="red";
		return true;
	}
	if(rows.firstRow[2].textContent==="X"&&rows.secondRow[1].textContent==="X"&&rows.thirdRow[0].textContent==="X"){
		rows.thirdRow[0].style.color="red";
		rows.secondRow[1].style.color="red";
		rows.firstRow[2].style.color="red";
		return true;
	}
	return false;
}

function winSecond(){
	if(rowsSecondPlayer()){
		return true;
	}
	if(columnsSecondPlayer()){
		return true;
	}
	if(diagonalsSecondPlayer()){
		return true;
	}
	return false;
}

function columnsSecondPlayer(){
	for(i=0;i<=2;i++){
		if(rows.firstRow[i].textContent==="0"&&rows.secondRow[i].textContent==="0"&&rows.thirdRow[i].textContent==="0"){
			rows.firstRow[i].style.color="red";
			rows.secondRow[i].style.color="red";
			rows.thirdRow[i].style.color="red";
			return true;
		}
	}
	return false;
}

function rowsSecondPlayer(){
	if(rows.firstRow[0].textContent==="0"&&rows.firstRow[1].textContent==="0"&&rows.firstRow[2].textContent==="0"){
		rows.firstRow[0].style.color="red";
		rows.firstRow[1].style.color="red";
		rows.firstRow[2].style.color="red";
		return true;
	}
	if(rows.secondRow[0].textContent==="0"&&rows.secondRow[1].textContent==="0"&&rows.secondRow[2].textContent==="0"){
		rows.secondRow[0].style.color="red";
		rows.secondRow[1].style.color="red";
		rows.secondRow[2].style.color="red";
		return true;
	}
	if(rows.thirdRow[0].textContent==="0"&&rows.thirdRow[1].textContent==="0"&&rows.thirdRow[2].textContent==="0"){
		rows.thirdRow[0].style.color="red";
		rows.thirdRow[1].style.color="red";
		rows.thirdRow[2].style.color="red";
		return true;
	}
	return false;
}

function diagonalsSecondPlayer(){
	if(rows.firstRow[0].textContent==="0"&&rows.secondRow[1].textContent==="0"&&rows.thirdRow[2].textContent==="0"){
		rows.firstRow[0].style.color="red";
		rows.secondRow[1].style.color="red";
		rows.thirdRow[2].style.color="red";
		return true;
	}
	if(rows.firstRow[2].textContent==="0"&&rows.secondRow[1].textContent==="0"&&rows.thirdRow[0].textContent==="0"){
		rows.thirdRow[0].style.color="red";
		rows.secondRow[1].style.color="red";
		rows.firstRow[2].style.color="red";
		return true;
	}
	return false;
}