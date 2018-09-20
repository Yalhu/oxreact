import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props)
        this.state={filterText:'',inStockOnly:false}

        this.handleFilterTextInput=this.handleFilterTextInput.bind(this)
        this.handleInStockInput=this.handleInStockInput.bind(this)
    }
    handleFilterTextInput(filterText) {
        this.setState({
          filterText: filterText
        });
      }
      
    handleInStockInput(inStockOnly) {
        this.setState({
          inStockOnly: inStockOnly
        })
    }
    render(){
        const {filterText,inStockOnly}=this.state;
        return(
            <div>
                <SearchBar filterText={filterText} inStockOnly={inStockOnly} 
                    onFilterTextInput={this.handleFilterTextInput} 
                    onInStockInput={this.handleInStockInput}
                />
                <ProductTable products={this.props.products} filterText={filterText} inStockOnly={inStockOnly} />
            </div>
        )
    }
}
class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.handleInStockInputChange=this.handleInStockInputChange.bind(this)
        this.handleFilterTextInputChange=this.handleFilterTextInputChange.bind(this)
    }
    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value);
    }
    handleInStockInputChange(e){
        this.props.onInStockInput(e.target.checked);
    }
    render(){
        return(
            <form>
                <input value={this.props.filterText} onChange={this.handleFilterTextInputChange} placeholder="Search..." />
                <p>
                    <input id="isShowStock"  type="checkbox" checked={this.props.inStockOnly}  onChange={this.handleInStockInputChange} />
                    <label htmlFor="isShowStock">Only show products in stock</label>  
                </p>
            </form>
        )
    }
}
class ProductTable extends React.Component{
    /* constructor(props){
        super(props)
    } */
    render(){
        var rows=[];
        var lastCategory=null;
        this.props.products.forEach(product=>{
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if(product.category!==lastCategory){
                lastCategory=product.category;
                rows.push( <ProductCategoryRow category={lastCategory} key={lastCategory} />)
            }

            rows.push(<ProductRow product={product} key={product.name} />)
        })
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}
class ProductCategoryRow extends React.Component{
    /* constructor(props){
        super(props)
    } */
    render(){
        return(
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        )
    }
}
var trr= .5>Math.random()? <div className={'namess'} style="color:red;"></div> :<div> 222</div>;
// var t3=<div className={ .5>Math.random()?'red':'black' }>123</div> ;
// var t3=<div style={'color:'+ 1>2?'red':'black' }>123</div> ; // error
var t3=<div style={{color:'red'}}>123</div> ; // right
var t3=<div style={.5>Math.random()?{color:'red'}:{color:'blue'}}>123</div> ; // right
class ProductRow extends React.Component{
    /* constructor(props){
        super(props)
    } */
    render(){
        // TODO: JSX语法，怎么动态添加class  
        // var trr=(this.props.product.stocked ? <tr style={{color:"red"}}>: <tr>); // error
        var name = this.props.product.stocked ? 
            this.props.product.name 
            : <span style={{color: 'red'}}>{this.props.product.name}</span>;
        return (
            // {trr}
            <tr>
                <td>{name}</td>
                {/* <td>{this.props.product.name}</td> */}
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}


var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];


ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
); 


registerServiceWorker();
