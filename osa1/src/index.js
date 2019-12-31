import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const Statistic = ({ text, value, percentage }) => <tr><td>{text}</td><td>{value}{percentage && ' %'}</td></tr>

const feedbackTypes = {
    GOOD: 'GOOD',
    NEUTRAL: 'NEUTRAL',
    BAD: 'BAD',
}
const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const feedbackGiven = (total > 0);

    // only called if feedback given, so no need to check for div by 0
    const calculateAvg = () => (good - bad) / (total);

    return (
        <div>
            <Header headerText='statistics' />
            {feedbackGiven &&
                <table>
                    <tbody>
                        <Statistic text='good' value={good} />
                        <Statistic text='neutral' value={neutral} />
                        <Statistic text='bad' value={bad} />
                        <Statistic text='average' value={calculateAvg()} />
                        <Statistic text='positive' value={100 * good / total} percentage />
                    </tbody>
                </table>
            }
            {!feedbackGiven && <p>No feedback given</p>}
        </div>
    )
}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    const handleClick = (button) => () => {
        switch (button) {
            case feedbackTypes.GOOD:
                setGood(good + 1);
                break;
            case feedbackTypes.NEUTRAL:
                setNeutral(neutral + 1);
                break;
            case feedbackTypes.BAD:
                setBad(bad + 1);
                break;
            default:
        }
    }
    return (
        <div>
            <Header headerText='give feedback' />
            <Button text={feedbackTypes.GOOD.toLowerCase()} onClick={handleClick(feedbackTypes.GOOD)} />
            <Button text={feedbackTypes.NEUTRAL.toLowerCase()} onClick={handleClick(feedbackTypes.NEUTRAL)} />
            <Button text={feedbackTypes.BAD.toLowerCase()} onClick={handleClick(feedbackTypes.BAD)} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
