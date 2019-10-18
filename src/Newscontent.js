import React from 'react';

class Newscontent extends React.Component{
    constructor(props) {
        super(props);
        //處理新的時間字串
      }

  render() {
    const  articles  = this.props.articles;
    let timeArray =[];
    articles.map(function(val) { 
        var currentDate = val.publishedAt; 
        currentDate = JSON.stringify(currentDate);
        currentDate = new Date(JSON.parse(currentDate));
        //時間轉成台灣時間
        var MM = ('0'+ (currentDate.getMonth()+1)).substr(-2);
        var dd = ('0'+ currentDate.getDate()).substr(-2);
        var h = ('0'+ currentDate.getHours()).substr(-2);
        var m = ('0'+ currentDate.getMinutes()).substr(-2);
        var s = ('0'+ currentDate.getSeconds()).substr(-2);
        let Time = currentDate.getFullYear()+"年"+MM+"月"+dd+"日";
        Time = Time + h+":"+m+":"+s;
        timeArray.push(Time);
    }); 
    const listItems = articles.map((val,index) =>
      <div className="list_css">
        <div style={{width:"40%",textAlign:"center"}}>
          <img  src={val.urlToImage} style={{padding:"0.5vh"}} width="70%" height="70%"/>
        </div>
        <div className="content">
          <div style={{textAlign:"center"}}>
            <a href={val.url} style={{color:"black",fontSize:"1.3vw"}} >{val.title}</a>
          </div><br/>
          <div>{val.description}</div><br/>
          <div style={{color:"#CA8EFF",textAlign:"right"}}>({this.props.value})</div>
          <div style={{color:"#FF7575",textAlign:"right"}}>{val.author!=null?val.author+" 報導" :''}</div>
          <div style={{color:"#0066CC",textAlign:"right"}}>{timeArray[index]}</div>
        </div>
      </div>
    );
    return (
        listItems
    )
  }
}
export default Newscontent;
