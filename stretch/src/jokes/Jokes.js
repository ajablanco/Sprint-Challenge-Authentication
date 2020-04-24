import React from 'react';
import axios from 'axios';


class Jokes extends React.Component {
  state = {
    jokes: [],
  };

  render() {
    return (
      <>
        <h1>Jokes List</h1>
        <div>
          {this.state.jokes.map((j, index) => (
            <JokesDiv key={index}>
              <h3>{j.joke}</h3>
            </JokesDiv>
          ))}
        </div>
      </>
    );
  }

  componentDidMount() {
    const endpoint = '/jokes';
    axios
      .get(endpoint)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => console.error(err));
  }
}

export default requiresAuth(Jokes);