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
数据结构(state)，代码优化，业务逻辑 都是 补丁方式添加，后续可以做很多优化。  
UI也是非常简单的调整了一下  

BUG:  



