import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class Showquiz extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      quizname: '',
      filterqns: []
    };
  }

  handleQuestions = () => {
    this.setState({ quizname: this.props.match.params.quizname });
    fetch('http://localhost:3001/api/v1/questions')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          data.questions.map(question =>
            question.quizset == this.state.quizname
              ? this.setState({
                  filterqns: this.state.filterqns.concat(question)
                })
              : ''
          );
        }
      });
    console.log('called after delete');
  };
  componentDidMount() {
    this.handleQuestions();
  }

  handleDelete = id => {
    fetch(`http://localhost:3001/api/v1/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('called');
          this.setState({ show: true, filterqns: [] });
          this.handleQuestions();
        }
      });
  };

  render() {
    let { quizname, filterqns } = this.state;
    return (
      <div className="quizlist-section">
        <p className="quizlist-heading">{filterqns.length ? quizname : ''}</p>
        {filterqns.length ? (
          filterqns.map((question, index) => (
            <div className="quiz-card-wrapper">
              <div>
                <p className="question-no">{index + 1}.</p>
                <p
                  onClick={() => this.handleDelete(question._id)}
                  className="question-no"
                >
                  ❌
                </p>
                <NavLink
                  to={`/admins/${localStorage.quizAdminName}/quizsets/${quizname}/${question.title}/${question._id}/edit/`}
                  className="question-no"
                >
                  ✏️
                </NavLink>
              </div>

              <div className="question-card">
                <p className="question-title">{question.title}</p>
                <div className="question-answers">
                  {question.answers.map(option => (
                    <button className="question-answers-item">{option}</button>
                  ))}

                  <button className="question-answers-item correct-answer">
                    {question.correctanswer}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="quizlist-heading">no question found</p>
        )}
      </div>
    );
  }
}

export default withRouter(Showquiz);
