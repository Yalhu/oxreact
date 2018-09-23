import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import App from 'App';
/*
class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
      return (
        <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

          <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
        </div>
      );
    }
}
 class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse />
      </div>
    );
  }
} */
// ## 3 
class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse
      return (
        <img src="./images/cat.png" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      );
    }
}
  
// class MouseWithCat extends React.Component {
class Mouse extends React.Component {
// class Mouse extends React.PureComponent {//
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
      return (
        <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
            <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
  
          {/*
            We could just swap out the <p> for a <Cat> here ... but then
            we would need to create a separate <MouseWithSomethingElse>
            component every time we need to use it, so <MouseWithCat>
            isn't really reusable yet.
          */}
          {/* <Cat mouse={this.state} /> */}

          {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
            */}
            {this.props.render(this.state)}
        </div>
      );
    }
  }
  
class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          {/* <MouseWithCat /> */}
          <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
        </div>
      );
    }
}
/* 这一方法对我们的具体用例来说能够生效，但我们却没法实现真正的将行为封装成可重用的方式的目标。
现在，每次我们在不同的用例中想要使用鼠标的位置，我们就不得不创建一个新的针对那一用例渲染不同内容的组件 (如另一个关键的 <MouseWithCat>)。

这也是 render prop 的来历：我们可以提供一个带有函数 prop 的 <Mouse> 组件，它能够动态决定什么需要渲染的，而不是将 <Cat> 硬编码到 <Mouse> 组件里，并有效地改变它的渲染结果。 */

// ## 如果mouse 继承 React.PureComponent
/* <Mouse> 应继承React.Component，万一你没法提前在构造函数中绑定实例方法（如因为你可能要掩盖组件的 props 和/或 state)。 */
/* class MouseTracker extends React.Component {
    constructor(props) {
      super(props);
  
      // This binding ensures that `this.renderTheCat` always refers
      // to the *same* function when we use it in render.
      this.renderTheCat = this.renderTheCat.bind(this);
    }
  
    renderTheCat(mouse) {
      return <Cat mouse={mouse} />;
    }
  
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <Mouse render={this.renderTheCat} />
        </div>
      );
    }
}
 */

ReactDOM.render(
    <MouseTracker />,
    document.getElementById('root')
)

registerServiceWorker();
