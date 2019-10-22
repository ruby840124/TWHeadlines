import React from 'react';
import Newscontent  from './Newscontent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class Main extends React.Component{
  //建構子
  constructor(props) {
    super(props);
    this.state={allData:[],articles:[],oneData:[],categoryValue:"entertainment",error:null}
    //擷取所有的結果(所有類別的資料)
    this.fetchAPI();
  }

  fetchAPI(){
      let count = 0;
      let allData ="";
      const categoryArray = ["entertainment","science","sports","business"];
      //跑所有的數據
      categoryArray.map((val,index) =>{
        let count2 = 0;
        let oneData = "";
        const category = val;
        const API = 'https://newsapi.org/v2/top-headlines?country=tw&';
        const DEFAULT_QUERY ='category='+val;
        const APIkey = '&apiKey=b6a64708a32040ec9761ccf7a11c83a5';
        //加入json物件(fetch順序結果不會照著index跑，透由count檢查最後結果的json物件)
        fetch(API + DEFAULT_QUERY+APIkey)
          .then(response => response.json())
          .then(data => {
            count++;
            //加入類別JSON格式
            data.articles.map((val,index) =>{
                count2++;
                const newData = "{"+'"category"'+":"+'"'+""+category+'",'+JSON.stringify(val).substring(1,JSON.stringify(val).length)+",";
                oneData = oneData +newData;
                if(count2 == data.articles.length-1)
                { 
                  oneData = "["+oneData.substring(0,oneData.length-1);
                  this.setState({oneData:oneData});
                }
              });
            //加入各類的JSON檔案
            allData =allData+'"'+val+'"'+':'+this.state.oneData+'],';
            if(count==categoryArray.length){
              allData=allData.substring(0,allData.length-1)
              allData = "{"+allData+"}";
              allData =JSON.parse(allData);
              console.log(allData);
              this.setState({allData:allData,articles:allData.entertainment});
            }
            })
            .catch(error => this.setState({error})); //處理錯誤問題
      }); 
  }

  //選擇不同類輸出不同類擷取結果
  handleChoose = event => {
    const allData = this.state.allData;
    if(event.target.value=="entertainment"){
        this.setState({articles:allData.entertainment,categoryValue:"entertainment"});
    }else if(event.target.value=="science"){
        this.setState({articles:allData.science,categoryValue:"science"});
    }else if(event.target.value=="sports"){
        this.setState({articles:allData.sports,categoryValue:"sports"});
    }else if(event.target.value=="business"){
        this.setState({articles:allData.business,categoryValue:"business"});
    }else{
         //所有的類別，並按照時間進行排列
        const entertainment =  JSON.stringify(allData.entertainment);
        const science =  JSON.stringify(allData.science);
        const sports =  JSON.stringify(allData.sports);
        const business =  JSON.stringify(allData.business);
        let data = entertainment.substring(0,entertainment.length-1)+","+sports.substring(1,sports.length-1)+","+science.substring(1,science.length-1)+","+business.substring(1,business.length);
        data = JSON.parse(data);
        data.sort(function(a,b){ //時間順序排列(最新到最舊)
            return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
        });
        this.setState({articles:data});
    }
  }


  render() {
    if (this.state.error) {
      alert("擷取API 發生錯誤!!");
    }
    return (
      <div className="MainBlock">
        <div id="topBlock">
          <div className="topText">Taiwan Top Headlines!</div>
        </div>
        <div style={{display:"flex", alignItems:"center",flexDirection:"column"}}>
          <div style={{display:"flex",padding:"2.5vh"}}>
            <FontAwesomeIcon icon={faThumbsUp} style={{fontSize:"1.5vw"}}/>&nbsp;
            <div style={{color:"#FF9797",fontSize:"1.5vw"}}>請選擇新聞類別:&nbsp;</div>
            <div className="box">
              <select onChange={this.handleChoose}> 
                <option value="entertainment">entertainment</option>
　              <option value="science">science</option>
　              <option value="sports">sports</option>
                <option value="business">business</option>
                <option value="all">all</option>
              </select>
            </div>
          </div>
        </div>
        <Newscontent articles={this.state.articles}/>
      <div>
      </div>
  </div>
    )
  }
}
export default Main;
