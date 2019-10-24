import React from 'react';
import Newscontent  from './Newscontent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class Main extends React.Component{
  //建構子
  constructor(props) {
    super(props);
    this.state={categoryValue:"entertainment"};
  }


  //選擇不同類輸出不同類擷取結果
  handleChoose = event => {
    const allData = this.state.allData;
    if(event.target.value=="entertainment"){
        this.setState({categoryValue:"entertainment"});
    }else if(event.target.value=="science"){
        this.setState({categoryValue:"science"});
    }else if(event.target.value=="sports"){
        this.setState({categoryValue:"sports"});
<<<<<<< HEAD
    }else if(event.target.value=="health"){
        this.setState({categoryValue:"health"});
=======
    }else if(event.target.value=="business"){
        this.setState({categoryValue:"business"});
>>>>>>> f4e9c97c83906bc33216afe4d22fc888ebd56617
    }else{
        this.setState({categoryValue:"all"});
    }
  }


  render() {
    return (
      <div className="MainBlock">
        <div id="topBlock" ref="topBlock">
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
                <option value="health">health</option>
                <option value="all">all</option>
              </select>
            </div>
          </div>
        </div>
        <Newscontent categoryValue={this.state.categoryValue}/>
      <div>
      </div>
  </div>
    )
  }
}
export default Main;