import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './Oxreact.css'

/* function Square(props){
    return(
        <button className="square" onClick={()=>{props.onXiaqi()}}>{props.value?props.value:''}</button>
    )
} */
class Square extends React.Component{
    render(){
        return(
            <button className={'square '+ this.props.className} onClick={()=>{this.props.onXiaqi()}}>{this.props.value?this.props.value:''}</button>
        )
    }
}
class Board extends React.Component{
    /* constructor(props){
        super(props)
    } */
    render(){
        const squares=this.props.squares;
        const succPos=this.props.succPos;
        // console.log(succPos)
        /* var row1=squares.slice(0,3).map((v,k)=>{
            return <Square onXiaqi={()=>this.props.onXiaqi(k)} value={v} key={k}/>
        })
         var row2=squares.slice(3,6).map((v,k)=>{
            return <Square onXiaqi={()=>this.props.onXiaqi(k+3)} value={v} key={k}/>
        }) */
        var rows=[]
        for(let i=0;i<3;i++){
            rows[i]=squares.slice(i*3,i*3+3).map((v,k)=>{
                return <Square className={succPos.includes(i*3+k)?'succ':''} onXiaqi={()=>this.props.onXiaqi(i*3+k)} value={v} key={k}/>
            })
        }
        return (
            <div className="board">
                <div className="board-row">
                    {/* {row1}  */ rows[0]}
                </div>
                <div className="board-row">
                    {/* row2 */ rows[1]}
                </div>
                <div className="board-row">
                    {/* map回调箭头函数中不能用{},也不能用return了*/
                    /* squares.slice(6,9).map((v,k)=>
                        <Square  onXiaqi={()=>this.props.onXiaqi(k+6)} value={v} key={k}/>
                    ) */ }  
                    {rows[2]}
                </div>
            </div>
        )
    }
}
/**
 * 采用多轮赛制，3/5，4/7等
 * current：当前对局，squares:当前棋盘；rounds: 存对局记录 
 */
class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
            rounds:[], // 采用回合制
            current:[
                [0,0,0,0,0,0,0,0,0],
                /* [0,'x',0,0,0,0,0,0,0],
                [0,'x',0,0,0,'o',0,0,0],
                [0,'x',0,'x',0,0,0,0,0],
                [0,'x',0,'x',0,0,0,'o',0], */
            ],
            nextPlayer:'o', // 可以通过squares最后一次 x/o 的数量对比推断出来，但是用了数据，直接粗暴 
            reviewIndex:0,  
            isReview:false,
            winner:null, 
            succPos:[], 
        }
    }
    xiaqi(index){
        var {current,nextPlayer}=this.state;
        // console.log(index,nextPlayer)
        var squares=current[current.length-1].slice()// 或者 concat；之前直接赋值/浅拷贝，找了半天错误
        if(squares[index]!==0) return;
        if(this.state.winner){
            alert('比赛已经结束了，胜利者是：'+this.state.winner)
            return;
        }
        squares[index]=this.state.nextPlayer;
        current.push(squares)
        // console.log(current)
        // this.state.current=current
        this.setState({current})// 用 赋值的方式不行，下面的nextPlayer就可以，但是会有警告
        this.state.nextPlayer= (nextPlayer==='x'?'o':'x') //warn: Do not mutate state directly. Use setState() 

        if(current.length>5){ // 官网是在render中进行的；第5次后才需要判断；而且本例还有其他的render
            // 本例中，把winner添加到state中了 
            var {winner,succPos}=calculateWinner(squares)
            console.log('胜利者是：'+winner)
            if(winner){
                this.setState({winner,succPos})
                // alert('比赛已经结束了，胜利者是：'+winner) // 会先弹框，阻止ui刷新
                setTimeout(()=>alert('比赛已经结束了，胜利者是：'+winner),0)
                return;
            }
            if(current.length===10){
                this.setState({winner:'平局'})
                setTimeout(()=>alert('比赛已经结束了，是平局！'),500)
            }
        }
    }
    goto(index,e){
        // if(this.state.isReview) return;
        this.setState({reviewIndex:index})
    }
    review(){
        this.setState({isReview:true})
        for(let i=0;i<this.state.current.length;i++){
            setTimeout(()=>{
                this.goto(i)
                // 可能应为setState不是及时更新/异步更新，所以要加定时器
                setTimeout(()=>{
                    if(i===(this.state.current.length-1)){
                        alert('回放结束')
                        this.setState({isReview:false})
                    }
                },0)
            },i*1500)
        }
    }
    addMore(){
        if(this.state.isReview) return;
        var {current,winner,rounds}=this.state
        rounds.push({current,winner})
        current=[];
        current.push(new Array(9).fill(0))// 需要填充数值，不然渲染为空;可能是map造成的 
        this.setState({rounds,current,winner:null,succPos:[],reviewIndex:0}); 
    }
    resume(){
        if(this.state.isReview) return;
        this.setState({rounds:[],current:[new Array(9).fill(0)],winner:null,succPos:[]})
    }
    render(){
        const {current,nextPlayer,reviewIndex,winner,succPos}=this.state;
        let Status;
        if(winner){
            Status=<p>比赛结束，胜利者是： {winner}</p>
        }else{
            Status=<p>Next Player is {nextPlayer}</p>;
        }
        return (
            <div className="game">
                <Board succPos={succPos} onXiaqi={(index)=>this.xiaqi(index)} player={nextPlayer} squares={current[current.length-1]} />
                <div style={{width:'120px'}} className="game-info">
                    {/* <p>Next Player is {nextPlayer}</p>
                    <p>比赛结束，胜利者是：</p> */}
                    { Status }
                    <p>回看比赛过程</p>
                    <div>
                        <ul>
                            {
                                current.map((v,k)=>{
                                    return <li className={reviewIndex===k?'active':''} onClick={(e)=>{this.goto(k,e)}} key={k}> 第{k}步 </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="game-result">
                    
                    {<Board succPos={[]} onXiaqi={(index)=>{}} squares={current[reviewIndex]} />}
                </div>
                <div>
                    <button disabled={this.state.isReview?true:false} onClick={()=>{this.review()}}>回放</button>
                    <button disabled={this.state.isReview?true:false} onClick={()=>{this.addMore()}}>再来一局</button>
                    <button disabled={this.state.isReview?true:false} onClick={()=>{this.resume()}}>重新来过</button>
                    <p>查看历次比赛结果</p>
                    <ul>
                        {
                            this.state.rounds.map((v,k)=>{
                                return <li onClick={()=>{this.reviewResult(k)}} key={k}>比赛完成{k+1}局，胜利者是{v.winner?v.winner:'平局'}</li>
                            })
                        }
                    </ul>
                </div>
                <div>
                    TODO: 添加回看每局比赛的结果
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // return squares[a];
        return {winner:squares[a],succPos:[a,b,c]}
      }
    }
    // return null; 
    return {winner:null,succPos:[]};
  }

registerServiceWorker();
