import React from 'react';
import Newscontent  from './Newscontent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock,faThumbsUp} from '@fortawesome/free-solid-svg-icons';

class Main extends React.Component{
  //建構子
  constructor(props) {
    super(props);
    this.state={articles:[],categoryValue:'entertainment'}
    this.fetchAPI(this.state.categoryValue);
  }

  fetchAPI(categoryValue){
      const category = ["entertainment","science","sports","business"];
      const API = 'https://newsapi.org/v2/top-headlines?country=tw&';
      const DEFAULT_QUERY = 'category='+categoryValue;
      const APIkey = '&apiKey=b6a64708a32040ec9761ccf7a11c83a5';
      fetch(API + DEFAULT_QUERY+APIkey)
        .then(response => response.json())
        .then(data => this.setState({articles:data.articles}));
  }

  handleChoose = event => {
    this.fetchAPI(event.target.value);
    this.setState({categoryValue:event.target.value});
  }

  render() {
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
      <div>
        <Newscontent articles={this.state.articles} value={this.state.categoryValue}/>
      </div>
  </div>
    )
  }
}
export default Main;
