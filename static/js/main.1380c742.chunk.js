(this.webpackJsonpapitask=this.webpackJsonpapitask||[]).push([[0],{14:function(e,t,a){e.exports=a(27)},19:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(10),i=a.n(r),l=(a(19),a(3)),c=a(4),o=a(6),u=a(5),g=a(7),h=function(e){function t(e){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).call(this,e))}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.articles,t=[];return e.map((function(e){var a=e.publishedAt;a=JSON.stringify(a);var n=("0"+((a=new Date(JSON.parse(a))).getMonth()+1)).substr(-2),s=("0"+a.getDate()).substr(-2),r=("0"+a.getHours()).substr(-2),i=("0"+a.getMinutes()).substr(-2),l=("0"+a.getSeconds()).substr(-2),c=a.getFullYear()+"\u5e74"+n+"\u6708"+s+"\u65e5";c=c+r+":"+i+":"+l,t.push(c)})),e.map((function(e,a){return s.a.createElement("div",{className:"list_css",id:a},s.a.createElement("div",{style:{width:"40%",textAlign:"center"}},s.a.createElement("img",{src:e.urlToImage,style:{padding:"0.5vh"},width:"70%",height:"70%"})),s.a.createElement("div",{className:"content"},s.a.createElement("div",{style:{textAlign:"center"}},s.a.createElement("a",{href:e.url,style:{color:"black",fontSize:"1.3vw"}},e.title)),s.a.createElement("br",null),s.a.createElement("div",null,e.description),s.a.createElement("br",null),s.a.createElement("div",{style:{color:"#CA8EFF",textAlign:"right"}},"(",e.category,")"),s.a.createElement("div",{style:{color:"#FF7575",textAlign:"right"}},null!=e.author?e.author+" \u5831\u5c0e":""),s.a.createElement("div",{style:{color:"#0066CC",textAlign:"right"}},t[a])))}))}}]),t}(s.a.Component),m=a(11),p=a(13),v=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleChoose=function(e){var t=a.state.allData;if("entertainment"==e.target.value)a.setState({articles:t.entertainment,categoryValue:"entertainment"});else if("science"==e.target.value)a.setState({articles:t.science,categoryValue:"science"});else if("sports"==e.target.value)a.setState({articles:t.sports,categoryValue:"sports"});else if("business"==e.target.value)a.setState({articles:t.business,categoryValue:"business"});else{var n=JSON.stringify(t.entertainment),s=JSON.stringify(t.science),r=JSON.stringify(t.sports),i=JSON.stringify(t.business),l=n.substring(0,n.length-1)+","+r.substring(1,r.length-1)+","+s.substring(1,s.length-1)+","+i.substring(1,i.length);(l=JSON.parse(l)).sort((function(e,t){return Date.parse(t.publishedAt)-Date.parse(e.publishedAt)})),a.setState({articles:l})}},a.state={allData:[],articles:[],oneData:[],categoryValue:"entertainment",error:null},a.fetchAPI(),a}return Object(g.a)(t,e),Object(c.a)(t,[{key:"fetchAPI",value:function(){var e=this,t=0,a="",n=["entertainment","science","sports","business"];n.map((function(s,r){var i=0,l="",c=s;fetch("https://newsapi.org/v2/top-headlines?country=tw&"+("category="+s)+"&apiKey=b6a64708a32040ec9761ccf7a11c83a5").then((function(e){return e.json()})).then((function(r){t++,r.articles.map((function(t,a){i++;var n='{"category":"'+c+'",'+JSON.stringify(t).substring(1,JSON.stringify(t).length)+",";l+=n,i==r.articles.length-1&&(l="["+l.substring(0,l.length-1),e.setState({oneData:l}))})),a=a+'"'+s+'":'+e.state.oneData+"],",t==n.length&&(a="{"+(a=a.substring(0,a.length-1))+"}",a=JSON.parse(a),console.log(a),e.setState({allData:a,articles:a.entertainment}))})).catch((function(t){return e.setState({error:t})}))}))}},{key:"render",value:function(){return this.state.error&&alert("\u64f7\u53d6API \u767c\u751f\u932f\u8aa4!!"),s.a.createElement("div",{className:"MainBlock"},s.a.createElement("div",{id:"topBlock"},s.a.createElement("div",{className:"topText"},"Taiwan Top Headlines!")),s.a.createElement("div",{style:{display:"flex",alignItems:"center",flexDirection:"column"}},s.a.createElement("div",{style:{display:"flex",padding:"2.5vh"}},s.a.createElement(m.a,{icon:p.a,style:{fontSize:"1.5vw"}}),"\xa0",s.a.createElement("div",{style:{color:"#FF9797",fontSize:"1.5vw"}},"\u8acb\u9078\u64c7\u65b0\u805e\u985e\u5225:\xa0"),s.a.createElement("div",{className:"box"},s.a.createElement("select",{onChange:this.handleChoose},s.a.createElement("option",{value:"entertainment"},"entertainment"),"\u3000              ",s.a.createElement("option",{value:"science"},"science"),"\u3000              ",s.a.createElement("option",{value:"sports"},"sports"),s.a.createElement("option",{value:"business"},"business"),s.a.createElement("option",{value:"all"},"all"))))),s.a.createElement(h,{articles:this.state.articles}),s.a.createElement("div",null))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[14,1,2]]]);
//# sourceMappingURL=main.1380c742.chunk.js.map