import { useState } from 'react'

const Section = ({ name }) => {
  return <h1>{ name }</h1>
}
const StatisticLine = ({ label, stat, unit='' }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{stat}{unit}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine label='good' stat={good} />
      <StatisticLine label='neutral' stat={neutral} />
      <StatisticLine label='bad' stat={bad} />
      <StatisticLine label='all' stat={all} />
      <StatisticLine label='average' stat={(good - bad) / all} />
      <StatisticLine label='positive' stat={(good / all) * 100} unit='%' />
      </tbody>
    </table>
  )
}

const Button = ({ button, handleClick }) => <button onClick={() => handleClick()} >{ button }</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Section name='give feedback' />
      <Button button='good' handleClick={() => setGood(good + 1)} />
      <Button button='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button button='bad' handleClick={() => setBad(bad + 1)} />
      <Section name='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App