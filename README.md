react 练习：main concepts 和 tutorial小游戏  
react官网: <https://reactjs.org/docs/getting-started.html>       
## main concepts
[查看练习源码](https://github.com/Yalhu/oxreact/tree/master/src)    
<!-- [查看笔记](yalhu.github.io/) -->

## react小游戏
react小游戏: [在线查看](https://yalhu.github.io/oxreact/build/index.html)      
1\. 回合制:查看历史比赛结果/记录    
2\. 可以查看当前比赛 每步的记录，包括定点查看和全程回放  
3\. 开始一局新的比赛，先手没有做处理，基于上一次的结果    
4\. 清空之前比赛记录，重新开始      
5\. 回放过程中，在可以操作goto，不能进行其他操作了，比如 再次回放/再来一局/重新来过  

TODO：  
细节方面没有注意，开始只是个demo，后来又添加了一些功能：回合制比赛结果查看，平局判断，突出显示连线成功，清空历史等   
数据传递(state)，代码优化，业务逻辑 都是 补丁方式添加，后续可以做很多优化。  
UI也是非常简单的调整了一下  

1\. 三个棋盘Board,Square会同时渲染;比如xiaqi,goto,reviewResult，数据更新(setState)渲染的是整个Game(list没有渲染);三个棋盘独立后，可以减少渲染   
1) Board设置自己的state:squares,不一定来自Game      
2) 监听shouldComponentUpdate(nextProps, nextState)/ReactDom.PureComponent   
3) 利用不可变数据的力量     

2\. 查看当前比赛过程和历次比赛结果差不多，是否用高阶组件；或者两个查看结果合并成一个Board，可以显示历次的比赛过程，不只是结果     
3\. 数据结构重新设计，Board中是否有自己独立state；goto显示最后落子位置以及如果胜利，是否突出显示位置。    
4\. 能否悔棋，添加选项；设置先手    
5\. 兼容移动端UI    
6\. 真正的双人模式，扩展棋盘为五子棋   

ISSUES:  



