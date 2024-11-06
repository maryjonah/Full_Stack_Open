import { useState } from 'react'

const Button = props => {
  return (
  <>
    <button onClick={props.handleClick}>{props.text}</button>
  </>
  )
}

const Display = ({heading}) => {
  return <h2>{heading}</h2>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [countAnecdote, setCountAnecdote] = useState(Array(anecdotes.length).fill(0))

  const handleRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const copyCountAnecdote = [...countAnecdote]
    copyCountAnecdote[selected] += 1
    setCountAnecdote(copyCountAnecdote)
  }

  const maxVotes = () => {
    const maxVal = Math.max(...countAnecdote)
    const idxMaxVal = countAnecdote.indexOf(maxVal)
    return [maxVal, idxMaxVal]
  }

  return (
    <div>
      <Display heading="Anecdote of the day" />

      <p>{anecdotes[selected]}</p>
      <p>has {countAnecdote[selected]} votes.</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleRandomAnecdote} text="next anecdote" />

      <Display heading="Anecdote with most votes" />
      <p>{anecdotes[maxVotes()[1]]}</p>
      <p>has {maxVotes()[0]} votes</p>
    </div>
  )
}

export default App
