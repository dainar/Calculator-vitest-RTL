import { useState } from 'react'
import '../calculator.css'
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const rows = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [0]
]

export const operations = [['C', '←', '+'], ['-', '*', '/'], ['=']]

export const Calculator = () => {
  const [value, setValue] = useState('0')
  const [previousOperator, setPreviousOperator] = useState()
  let [runningTotal, setRunningTotal] = useState(0)

  const createHandleNumber = number => () => {
    if (value === '0') {
      setValue(number)
    } else {
      setValue(String(value).concat(number))
    }
  }

  function handleMath (op) {
    if (value === '0') {
      // do nothing
      return
    }

    const intBuffer = parseInt(value)
    if (runningTotal === 0) {
      setRunningTotal(intBuffer)
    } else {
      flushOperation(intBuffer)
    }

    setPreviousOperator(op)

    setValue('0')
  }

  function flushOperation (intBuffer) {
    if (previousOperator === '+') {
      setRunningTotal(runningTotal += intBuffer)
    } else if (previousOperator === '-') {
      setRunningTotal(runningTotal -= intBuffer)
    } else if (previousOperator === '×') {
      setRunningTotal(runningTotal *= intBuffer)
    } else {
      setRunningTotal(runningTotal /= intBuffer)
    }
  }

  const createHandleClick = op => () => {
    switch (op) {
      case 'C':
        setValue('0')
        setRunningTotal(0)
        break
      case '=':
        if (previousOperator === null) {
          // need two numbers to do math
          return
        }
        flushOperation(parseInt(value))
        setPreviousOperator(null)
        setValue(parseInt(runningTotal))
        setRunningTotal(0)
        break
      case '←':
        if (value.length === 0) {
          setValue('0')
        } else {
          setValue(value.substring(0, value.length - 1))
        }
        break
      case '+':
      case '-':
      case '×':
      case '÷':
        handleMath(op)
        break
    }
  }

  return (
    <section className='calc'>
      <div className='screen' role='cell'>{value}</div>
      <div role='grid'>
        {rows.map((row, idx) => {
          return (
            <div key={idx} className='calc-button-row' role='row'>
              {row.map(number => <button className='calc-button' onClick={createHandleNumber(number)} key={number}>{number}</button>)}
            </div>
          )
        })}
        {operations.map((operationrow, idx) => (
          <div key={idx} className='calc-button-row'>
            {operationrow.map(operation => <button className='calc-button-orange' onClick={createHandleClick(operation)} key={operation}>{operation}</button>)}
          </div>
        ))}
      </div>
    </section>
  )
}
