import { useState } from 'react'

const Header = ({ headerText }) => { 
  return <h1>{headerText}</h1> 
}

const Button = ({ handleFxn, btnText}) => {
  return <button onClick={handleFxn}>{btnText}</button>
}

const StatisticLine = (props) => {
  return <p>{props.statText} {props.statValue}</p>
}

const Statistics = ({title, good, neutral, bad}) => {
  if(good >= 1 || neutral >= 1 || bad >= 1) {
    return (
      <>
        <h3>{title}</h3>
        <StatisticLine statText="good" statValue={good} />
        <StatisticLine statText="neutral" statValue={neutral} />
        <StatisticLine statText="bad" statValue={bad} />
        <StatisticLine statText="all" statValue={good + bad + neutral} />
        <StatisticLine statText="average" statValue={(good + bad + neutral) / 3}/>
        <StatisticLine statText="positive" statValue={good/3} />
      </>
    )
  } else {
    return <p>No feedback given</p>
  }
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    console.log(good)
    return setGood(good+1)
  }
  
  const handleNeutal = () => {
    return setNeutral(neutral+1)
  }
  
  const handleBad = () => {
    return setBad(bad+1)
  }
    
  return (
    <div>
      <Header headerText="give feedback" />

      <Button handleFxn={handleGood} btnText="good" />
      <Button handleFxn={handleNeutal} btnText="neutral" />
      <Button handleFxn={handleBad} btnText="bad" />

      <Statistics title="Statistics" good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App
