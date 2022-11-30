import React from 'react';
import './App.css';
import { Button ,Backspace } from './components/Button/Button.js'
import { useState,useEffect } from 'react';

function App() {
  
  let [str1, setStr] = useState("0"); 
  let [ans,setAns] = useState(5);
  let [bool, setBool] = useState(false)
  let [ansAct,setAnsAct] = useState('inact')
  var operators = ["+","-","×","÷"]
  var hist = []
  var dark = false
  
  function change(str){
    if (str1==="0"){
      setStr(str1=str)
    }
    else{
      setStr(str1 + str)
    }
    if (str1 !== "0"){
      setBool(bool = true)
    }
    else{
      setBool(bool=false)
    }
  }

  useEffect(()=>{
    if (operators.includes(str1[str1.length - 1]) && operators.includes(str1[str1.length - 2])) {
          setStr(str1 = str1.substr(0,str1.length-2) + str1[str1.length-1])
    }
    if (str1.indexOf(".") > -1) {
      if (str1.length === 1) {
        setStr(str1 = "0.")
      }
    }
    if (operators.map(op => {
      if (str1.length ===1 && str1.includes(op)) {
        setStr(str1 = "0" + op)
      }
     }))
    if (str1 === "0") {
      setBool(bool=false)
      setAnsAct(ansAct="inact")
    }
    if (str1 === "")
      {
       setStr(str1 = "0")
      }
        
    if (ansAct === "act") {
      let op = str1.substring(str1.length-1)
      if (Number(isNaN(str1[str1.length - 1])) === 1) {
        setAnsAct(ansAct = 'inact')
        if (op === "%") {
          setStr(str1 = String(Number(eval(ans / 100))))
        }
        if (operators.includes(op) === true) {
          setStr(str1 = ans + str1.substring(str1.length - 1))
        }
      }
      else {
        setStr(str1 = op)
        setAnsAct(ansAct = 'inact')
      }
    }
     if (operators.includes(str1[str1.length - 1]) || str1[str1.length - 1] === "%") {
       if (str1[str1.length - 1] === "%") {
          var lop = -1
          for (let i=0;i<4;i++){
            if(str1.includes(operators[i])){
              lop = Math.max(lop,str1.lastIndexOf(operators[i]))
            }
          }
         if (lop !== -1) {
              setStr(str1 = str1.substring(0,lop+1)+(Number(str1.substring(lop+1,str1.length-1))/100))
            }
            else{
              var pers = Number(str1.substring(0,str1.length-1))/100
              setStr(str1 = String(pers))
         }
       }
    }
    
        answer()
      },[str1]);
  
  function answer(){
    var s=str1
    s = s.replaceAll("÷","/")
    s= s.replaceAll("×","*")
    let op = str1.substring(str1.length - 1)
    if (operators.includes(op) === false) {
      if (String(eval(s)).length >= 13) {
        let a = String(eval(s)).substr(0, 13)
        setAns(ans = a)
      }
      else {
        setAns(ans = String(eval(s)))
      }
    }
  }
  
  function answerAct(){
    answer()
    setAnsAct(ansAct="act")
    if(hist.length === 0){
      hist.push(str1 +"=" +ans)
    }
    else if((hist[hist.length-1] !== (str1 +"=" +ans)) === false){
      hist.push(str1 +"=" +ans)
    }
    
    var e = hist[hist.length-1]
    var ele = document.createElement("div")
    ele.textContent=e
    document.getElementsByClassName("App-text-hist")[0].appendChild(ele)
    document.getElementsByClassName("App-text-hist")[0].scrollBy(0,100)
  }

  return (
    <div className="App">
      <div className="App-calc">
        <div className="App-text">
          <div className="App-text-hist">
          </div>
          <div className="App-text-curr">
            <div className={["App-text-str",`App-text-str-${bool}`,`App-text-str-${ansAct}`].join(" ")}>{str1}</div>
            <div className={["App-text-ans", `App-text-ans-${bool}`, `App-text-ans-${ansAct}`].join(" ")}>{`= ${ans}`}</div>
          </div>
        </div>
        <div className="App-btns">
          <div className="App-btn-r">
            <Button text="C" back="white" num = {() => setStr(str1 = "0")}/>
            {/* <Button text back="white" num = {() => setStr(str1 = str1.substr(0,str1.length-1))}/> */}
            <Backspace num={() => {
              if (ansAct === 'inact') {
                setStr(str1 = str1.substr(0, str1.length - 1))
              }
            }
          } />
            <Button text="%" back="white" num={() => { change("%") }} />
            <Button text="÷" back="white" num = {() => {change("÷")}}/>
          </div>
          <div className="App-btn-r">
            <Button text="7" back="white" num = {() => {change("7")}}/>
            <Button text="8" back="white" num = {() => {change("8")}}/>
            <Button text="9" back="white" num = {() => {change("9")}}/>
            <Button text="×" back="white" num = {() => {change("×")}}/>
          </div>
          <div className="App-btn-r">
            <Button text="4" back="white" num = {() => {change("4")}} />
            <Button text="5" back="white" num = {() => {change("5")}}/>
            <Button text="6" back="white" num = {() => {change("6")}}/>
            <Button text="-" back="white" num = {() => {change("-")}}/>
          </div>
          <div className="App-btn-r">
            <Button text="1" back="white" num = {() => {change("1")}}/>
            <Button text="2" back="white" num = {() => {change("2")}}/>
            <Button text="3" back="white" num = {() => {change("3")}}/>
            <Button text="+" back="white" num = {() => {change("+")}}/>
          </div>
          <div className="App-btn-r">
            <Button text="s" back="white" num={() => {
              var a = document.getElementsByTagName("html")[0]
              if (dark === false) {
                dark = true
                a.setAttribute("data", "dark-theme")
              }
              else {
                dark = false
                a.setAttribute("data", "light-theme")
              }
            }} />
            <Button text="0" back="white" num = {() => {change("0")}}/>
            <Button text="." back="white" num ={() => {change(".")}}/>
            <Button text="=" back="white" num = {answerAct}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
