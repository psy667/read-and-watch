import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  const { test } = state;
  return {test};
}

const actionCreators = {
  increment: actions.increment,
  getUsers: actions.getUsers
}

class Page1 extends React.Component {

  handleIncrement = () => {
    const { increment } = this.props;
    increment({task: 0});
  }

  componentDidMount(){
    const { getUsers } = this.props;
    getUsers({id: 1, value: 2});
  }

  render() {
    const { test } = this.props;
    console.log(test);
    const items = test.items;
    const value = test.value;
    console.log();
      return (
        <div>
          <div>{value}</div>
          <button onClick={this.handleIncrement}>+1</button>
          <ul>
            { items.map(item => <li key={item.id}>{item.name}</li>) }
          </ul>
        </div>
      );
  }
}

export default connect(mapStateToProps, actionCreators)(Page1);
