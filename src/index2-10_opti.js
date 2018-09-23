import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';


/* ## 1 
class CounterButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (this.props.color !== nextProps.color) {
        return true;
      }
      if (this.state.count !== nextState.count) {
        return true;
      }
      return false;
    }
  
    render() {
      return (
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({count: state.count + 1}))}>
          Count: {this.state.count}
        </button>
      );
    }
} 
*/

// ## 2 　PureComponent
class CounterButton extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
  
    render() {
      return (
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({count: state.count + 1}))}>
          Count: {this.state.count}
        </button>
      );
    }
}

// ## 3 如果 props 和 state 属性存在更复杂的数据结构，这可能是一个问题
class ListOfWords extends React.PureComponent {
// class ListOfWords extends React.Component {
    render() {
      return <div>{this.props.words.join(',')}</div>;
    }
  }
  
class WordAdder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        words: ['marklar']
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      // 这个部分是不好的风格，造成一个错误
      /* const words = this.state.words;
      words.push('marklar');
      this.setState({words: words}); */

      this.setState(state => ({
        words: state.words.concat(['marklar'])
        // words: [...state.words, 'marklar'],
      }));
    }
  
    render() {
      return (
        <div>
          <button onClick={this.handleClick} >add word</button>
          <ListOfWords words={this.state.words} />
        </div>
      );
    }
}


ReactDOM.render(
    <WordAdder />,
    document.getElementById('root')
)

registerServiceWorker();
