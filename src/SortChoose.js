import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock,faThumbsUp} from '@fortawesome/free-solid-svg-icons';

class CategoryChoose extends React.Component{

handleChoose = event => {
    alert(event.target.value);
  }

  render() {
    return (
    <div style={{display:"flex",padding:"2vh"}}>
        <FontAwesomeIcon icon={faThumbsUp} style={{fontSize:"1.5vw"}}/>&nbsp;
        <div style={{color:"#FF9797",fontSize:"1.5vw"}}>請選擇新聞類別:&nbsp;</div>
        <div className="box">
          <select onChange={this.handleChoose}> 
                <option value="entertainment">entertainment</option>
　              <option value="science">science</option>
　              <option value="sports">sports</option>
            <option value="business">business</option>
          </select>
        </div>
      </div>
    )
  }
}
export default CategoryChoose;
