import { describe, it, afterEach, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Calculator, operations, numbers, rows } from '../src/Calculator'

describe('Calculator', () => {
  afterEach(cleanup)
  it('should render', () => {
    render(<Calculator />)
  })

  it('should render numbers', () => {
    render(<Calculator />)
    numbers.forEach(number => {
      screen.getByText(number)
    })
  })

  it('should render 4 rows', () => {
    render(<Calculator />)
    expect(rows.length).toBe(4)
  })

  it('should render operations', () => {
    render(<Calculator />)
    operations.forEach(operationrow => {
      operationrow.map(operation =>
        screen.getByText(operation)
      )
    })
  })

  it('should render equal sign', () => {
    render(<Calculator />)
    screen.getByText('=')
  })

  it('should render an input', () => {
    render(<Calculator />)
    screen.getByRole('cell')
  })

  it('should fill input after clicking a number', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const input = screen.getByRole('cell')
    expect(input.innerText).toBe('1')
  })

  it('should fill input after clicking a number', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const two = screen.getByText('2')
    fireEvent.click(two)

    const three = screen.getByText('3')
    fireEvent.click(three)

    const input = screen.getByRole('cell')
    expect(input.innerText).toBe('123')
  })

  it('should show user input after clicking numbers and operations', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const plus = screen.getByText('+')
    fireEvent.click(plus)
    fireEvent.click(one)

    const input = screen.getByRole('cell')
    expect(input.innerText).toBe('1')
  })

  it('should calculate based on user input and show the calculation', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const plus = screen.getByText('+')
    fireEvent.click(plus)
    fireEvent.click(one)
    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const input = screen.getByRole('cell')
    expect(input.innerText).toBe('2')
  })

  it('should calculate another operation after pressing = sign', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const plus = screen.getByText('+')
    fireEvent.click(plus)
    fireEvent.click(one)
    const equal = screen.getByText('=')
    fireEvent.click(equal)
    fireEvent.click(plus)
    fireEvent.click(one)
    fireEvent.click(equal)

    const input = screen.getByRole('cell')
    expect(input.innerText).toBe('3')
  })
})
