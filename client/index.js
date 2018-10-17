import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flashcards: null
    }
  }

  componentDidMount() {
    fetch('/cards', { headers: { 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(cards => {
        this.setState({
          flashcards: cards
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const cards = this.state.flashcards
    return cards && cards.map((card, index) => {
      return (
        <div key={index} className="card text-center col-4 offset-4 mb-2 flashcard mt-2">
          <p id="margin-override" className="mt-2">{card.question}</p>
          <hr/>
          <p>{card.answer}</p>
        </div>
      )
    })
  }
}
