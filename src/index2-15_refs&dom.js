import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';


class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render() {
      return <div ref={this.myRef} />;
    }
}
// 1-1 Dom元素上添加
class CustomTextInput extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the textInput DOM element
      this.textInput = React.createRef();
      this.focusTextInput = this.focusTextInput.bind(this);
    }
  
    focusTextInput() {
      // Explicitly focus the text input using the raw DOM API
      // Note: we're accessing "current" to get the DOM node
      this.textInput.current.focus();
    }
  
    render() {
      // tell React that we want to associate the <input> ref
      // with the `textInput` that we created in the constructor
      return (
        <div>
          <input 
            type="text"
            ref={this.textInput} />
  
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
        </div>
      );
    }
}
// 1-2 类组件 添加
class AutoFocusTextInput extends React.Component {
    constructor(props) {
      super(props);
      this.textInput = React.createRef();
    }
  
    componentDidMount() {
      this.textInput.current.focusTextInput();
    }
  
    render() {
      return (
        <CustomTextInput ref={this.textInput} />
      );
    }
}
// 1-3 函数式组件：然而你可以 在函数式组件内部使用 ref 来引用一个 DOM 元素或者 类(class)组件：  
// 3 回调 Refs ：第二种方式
class CustomTextInput1 extends React.Component {
    constructor(props) {
      super(props);
  
      this.textInput = null;
  
      this.setTextInputRef = element => {
        this.textInput = element;
      };
  
      this.focusTextInput = () => {
        // 直接使用原生 API 使 text 输入框获得焦点
        if (this.textInput) this.textInput.focus();
      };
    }
  
    componentDidMount() {
      // 渲染后文本框自动获得焦点
      this.focusTextInput();
    }
  
    render() {
      // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React
      // 实例上（比如 this.textInput）
      return (
        <div>
          <input
            type="text"
            ref={this.setTextInputRef}
          />
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
        </div>
      );
    }
}
// 3-2 你可以在组件间传递回调形式的 refs，就像你可以传递通过 React.createRef() 创建的对象 refs 一样。
function CustomTextInput2(props) {
    return (
      <div>
        <input ref={props.inputRef} />
      </div>
    );
  }

class Parent extends React.Component {
    constructor(props){
        super(props)
        this.focusTextInput = () => {
            // 直接使用原生 API 使 text 输入框获得焦点
            if (this.inputElement) this.inputElement.focus();
        };
    }
    render() {
      return (
        <div>
            <CustomTextInput2
            inputRef={el => this.inputElement = el}
            />
            <input  type="button" value="Focus the text input" onClick={this.focusTextInput}
            />
        </div>
      );
    }
}


ReactDOM.render(
    <FancyButton />,
    document.getElementById('root')
)

registerServiceWorker();
