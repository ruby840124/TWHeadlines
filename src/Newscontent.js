import React from 'react';

class Newscontent extends React.Component{
  constructor(props) {
        super(props);
        this.state={articles:[],page:0};
  }

  //擷取API數據
  fetchAPI(val,change){
    let category = [];
    let page = this.state.page+1;
    let articles = this.state.articles;
    if(change){
      page = 1;
      articles=[];
    }
    (val=="all"? category = ["entertainment","science","sports","health"]:category=[val]);
    const promise = new Promise((resolve, reject) => {
      const API = 'https://newsapi.org/v2/top-headlines?country=tw&';
      const APIkey = '&apiKey=27539d215b7745149d29a69402f930a6';
      category.map((val) =>{
      const category = val;
      const DEFAULT_QUERY ='category='+val;
      fetch(API + DEFAULT_QUERY+APIkey+"&page="+page+"&pagesize=5")
      .then(response => response.json())
      .then(data => {
        data.articles.map((val) =>{
          val.category = category;
          articles.push(val);
          resolve(articles);
        });
      });
      });
    })

    //擷取完API作處理
    promise.then( value => {
      articles.sort(function(a,b){  //時間順序排列(最新到最舊)
        return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
      });
      this.setState({articles:articles,page:page});
    }, function(reason) {
      console.log(reason);
    });
  }

  //執行於元件第一次render到畫面的時間點
  componentWillMount() {
    this.fetchAPI(this.props.categoryValue);
    window.addEventListener('scroll', this.onScrollHandle, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollHandle);
    clearInterval(this.timerID);
  }

  onScrollHandle = event => {
    const list = this.refs.list; //利用ref取得list物件
    const change = false; //跟滾輪的fetch API區別
    console.log(window.scrollY);
    console.log(window.innerHeight);
    console.log(list.clientHeight);
    console.log(list.offsetTop);
    if (Math.floor(window.scrollY + window.innerHeight)+1 > Math.floor(list.clientHeight + list.offsetTop +10)) {
      if(this.state.page<5){ //API頁面只有到4頁，超過沒有回傳值
        this.fetchAPI(this.props.categoryValue,change);
    }
  }}

  //執行於re-render更新完後的時間點
  componentDidUpdate(prevProps){
    //比較狀態，不然會進入無限迴圈(setState設到))
    if(this.props.categoryValue!=prevProps.categoryValue){
      const change = true; //跟滾輪的fetch API區別
      this.fetchAPI(this.props.categoryValue,change);
    }
  }

  render() {
    const  articles  = this.state.articles;
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
    <div className="list_css" key={index}>
      <div style={{width:"40%",textAlign:"center"}}>
        {(val.urlToImage==null?<p>~無圖片QAQ~</p>:<img  src={val.urlToImage} style={{padding:"0.5vh"}} width="70%" height="70%"/>)}
      </div>
      <div className="content">
        <div style={{textAlign:"center"}}>
          <a href={val.url} style={{color:"black",fontSize:"1.3vw"}} >{val.title}</a>
        </div><br/>
        <div>{val.description}</div><br/>
        <div style={{color:"#CA8EFF",textAlign:"right"}}>({val.category})</div>
        <div style={{color:"#FF7575",textAlign:"right"}}>{val.author!=null?val.author+" 報導" :''}</div>
        <div style={{color:"#0066CC",textAlign:"right"}}>{timeArray[index]}</div>
      </div>
    </div>
    );
    return (
      <div ref="list">
        {listItems}
      </div>
    )
  }
}
export default Newscontent;
