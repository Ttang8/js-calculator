import React, { useState, useEffect } from 'react'

const CalculatorContainer = () => {

  const [answer, setAnswer] = useState('')
  const [formula, setFormula] = useState([])
  const [tempNumber, setTempNumber] = useState('')
  const [operation, setOperation] = useState('')


  const handleNumber = (e) => {
    if(operation !== '') {
      setFormula([...formula,...operation])
      setOperation('')
    }

    let ch = e.target.value
    if(ch === '.' && tempNumber.includes('.')) {
      return
    }
    if(ch === '0' && tempNumber[0] === '0' && tempNumber.length === 1) {
      return
    }
    setTempNumber(tempNumber + ch)
    // console.log(tempNumber)
  }

  const handleOperation = (e) => {
    let oper = e.target.value
    // if(formula.length === 0 && tempNumber === '') {
    //   return
    // }
    if(tempNumber !== '' && tempNumber !== '-') {
      setFormula([...formula, tempNumber])
      setTempNumber('')
    }
    
    if(oper === '-' && operation !== '' && !tempNumber.includes('-')) {
      setTempNumber('-')
      return
    } else if (oper === '-' && tempNumber.includes('-')) {
      return
    }
    setOperation(oper)
    setTempNumber('')
  }

  const handleClear = (e) => {
    setAnswer('')
    setFormula([])
    setTempNumber('')
    setOperation('')
  }

  const handleEquals = () => {
    setOperation('')
    let calcForm = [...formula, tempNumber]
    
    let calc = parseFloat(formula[0])
    let i = 1
    
    while(i<calcForm.length) {
      switch(calcForm[i]) {
        case '/':
          calc = calc / parseFloat(calcForm[i+1])
          break
        case 'x':
          calc = calc * parseFloat(calcForm[i+1])
          break
        case '+':
          calc = calc + parseFloat(calcForm[i+1])
          break
        case '-':
          calc = calc - parseFloat(calcForm[i+1])
          break
        default:
          calc = calc
      }
      i++
    }
    if(isNaN(calc)) {
      return
    }
    if(tempNumber !== '' && tempNumber !== '-') {
      // setFormula([...formula, tempNumber])
      setTempNumber('')
    }
    setAnswer(calc)
    setFormula([calc])
  }

  return (
    <div>
      <div className="calculator">
        <div className="formulaScreen">{formula}{operation}{tempNumber}</div>
        <div id="display" className="outputScreen">{answer === "" && tempNumber === "" && operation === ""? 0: tempNumber === "" && operation === ""? answer: ""}{tempNumber}{operation}</div>
        <div>
          <button id="clear" className="bigButton red" value="AC" onClick={handleClear}>AC</button>
          <button id="divide" value="/" onClick={handleOperation}>/</button>
          <button id="multiply" value="x" onClick={handleOperation}>x</button>
          <button id="seven" value="7" onClick={handleNumber}>7</button>
          <button id="eight" value="8" onClick={handleNumber}>8</button>
          <button id="nine" value="9" onClick={handleNumber}>9</button>
          <button id="subtract" value="-" onClick={handleOperation}>-</button>
          <button id="four" value="4" onClick={handleNumber}>4</button>
          <button id="five" value="5" onClick={handleNumber}>5</button>
          <button id="six" value="6" onClick={handleNumber}>6</button>
          <button id="add" value="+" onClick={handleOperation}>+</button>
          <button id="one" value="1" onClick={handleNumber}>1</button>
          <button id="two" value="2" onClick={handleNumber}>2</button>
          <button id="three" value="3" onClick={handleNumber}>3</button>
          <button id="zero" className="bigButton" value="0" onClick={handleNumber}>0</button>
          <button id="decimal" value="." onClick={handleNumber}>.</button>
          <button id="equals" className="equalSign green" value="=" onClick={handleEquals}>=</button>
        </div>

      </div>
    </div>
  )
}

export default CalculatorContainer