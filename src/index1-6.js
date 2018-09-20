import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';


function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
  
    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }

ReactDOM.render(
    // <div>hello react</div>,
    <ActionLink />,
    document.getElementById('root')
);



// test2 
class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // This binding is necessary to make `this` work in the callback
    //   this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }
    // Warning: this is *experimental* syntax.
    handleClick = () => {
        console.log('this is:', this);
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
}
ReactDOM.render(
    // <div>hello react</div>,
    <Toggle />,
    document.getElementById('root')
);


registerServiceWorker();
