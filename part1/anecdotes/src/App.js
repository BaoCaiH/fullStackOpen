import { useState } from 'react'

const Button = ({ buttonLabel, handleClick }) => {
  return (
    <button onClick={handleClick}>{buttonLabel}</button>
  )
}

const Header = ({ label }) => <h1>{label}</h1>

// const MostVoted = ({ anecdotes, votes }) => {
//   <>anecdotes[votes.indexOf(Math.max(votes))]
// }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <Header label='Anecdote of the day' />
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <Button buttonLabel='vote' handleClick={() => {
          const copy = [...votes]
          copy[selected] += 1
          setVotes(copy)
        }} />
        <Button buttonLabel='next anecdote' handleClick={() => setSelected(Math.floor(Math.random() * 7))} />
      </div>
      <Header label='Anecdote with most votes' />
      <div>
        {anecdotes[votes.indexOf(Math.max(...votes))]}
      </div>
    </div>
  )
}

export default App