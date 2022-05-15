import React from 'react'
import { useState } from 'react'

const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Part = ({part}) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  )
}

const Total = ({exercises}) => {
  return (
    <>
      <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
    </>
  )
}

const App = (props) => {
  const [ counter, setCounter ] = useState(0)
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const handleClick = () => {
    console.log('add 1');
    setCounter(counter + 1);
  }
  const handleReset = () => {
    console.log('reset');
    setCounter(0);
  }

  return (
    <div>
      <Header course={course.name} />
      <Display counter={counter} />
      <Button handleClick={handleClick} text='add 1' />
      <Button handleClick={handleReset} text='reset' />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(p => p.exercises)} />
    </div>
  )
}

export default App