import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// for test, origin is no comment 
// ReactDOM.render(<App />, document.getElementById('root')); 

/* ========================================================= */  
// z-test 
// ## 元素渲染
function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
}
  
// setInterval(tick, 1000);
// ## 5 
// const element = <div />;    
function Welcome0(props) {
    return <h1>Hello, {props.name}</h1>;
}
class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
}
const element = <Welcome name="Sara sha?" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);
// ### 组合组件
function App() {
    return (
      <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>
    );
  }
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
// ### 提取组件


/* ========================================================= */  
// test end 
registerServiceWorker();
