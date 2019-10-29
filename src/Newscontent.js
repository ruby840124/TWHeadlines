import React from 'react';
import cat from './cat.jpg';
class Newscontent extends React.Component{
  constructor(props) {
        super(props);
        this.state={articles:[],page:1};
  }

  //擷取API數據
  fetchAPI(val,change){
    let category = [];
    let categoryLength = 0;
    let page = this.state.page;
    let articles = this.state.articles;
    let nowcategory = []; //用來判斷目前map讀到哪，如果讀取完則進行後續API處理
    if(change){ 
      page = 1;
      articles=[];
    }

    (val=="all"? category = ["entertainment","science","sports","health"]:category=[val]);
    (val=="all"? categoryLength=4 :categoryLength=1);
    const promise = new Promise((resolve, reject) => {
      const API = 'https://newsapi.org/v2/top-headlines?country=tw&';
      const APIkey = '&apiKey=b6a64708a32040ec9761ccf7a11c83a5';
      category.map((val) =>{
      const category = val;
      const DEFAULT_QUERY ='category='+val;
      fetch(API + DEFAULT_QUERY+APIkey+"&page="+page+"&pagesize=5")
      .then(response => response.json())
      .then(data => {
        nowcategory.push(val);
        data.articles.map((val) =>{
          val.category = category;
          articles.push(val);
          });
          if(nowcategory.length==categoryLength){
            resolve(articles);
          }
        });
      });
    })

    //擷取完API作處理
    promise.then(value => {
      articles.sort(function(a,b){  //時間順序排列(最新到最舊)
        return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
      });
      console.log(value);
      this.setState({articles:articles,page:page+1});
    }, function(reason) {
      console.log(reason); //錯誤提醒
    });
  }

  onScrollHandle = event => {
    const list = this.refs.list; //利用ref取得list物件
    const change = false; //跟滾輪的fetch API區別
    if (Math.ceil(window.scrollY + window.innerHeight)+1 > list.clientHeight + list.offsetTop +10) {
      if(this.state.page <= 5){ //API頁面只有到4頁，超過沒有回傳值
        this.fetchAPI(this.props.categoryValue,change);
    }
  }}


  //執行於元件第一次render到畫面的時間點
  componentWillMount() {
    this.fetchAPI(this.props.categoryValue);
    window.addEventListener('scroll', this.onScrollHandle, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollHandle);
  }
  
  //執行於re-render更新完後的時間點
  componentDidUpdate(prevProps){
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
        {(val.urlToImage==null?<img  src="https://upload.cc/i1/2019/10/29/z5NH9C.jpg" style={{padding:"0.5vh"}} width="70%" height="70%"/>:<img  src={val.urlToImage} style={{padding:"0.5vh"}} width="70%" height="70%" onError={(e)=>{e.target.onerror = null; e.target.src="https://upload.cc/i1/2019/10/29/z5NH9C.jpg"}}/>)}
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
