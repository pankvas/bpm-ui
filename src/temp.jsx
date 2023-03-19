import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import {Bar} from 'react-chartjs-2';

const Chart = ({chartData, displayTitle, displayLegend, legendPosition}) => {
return (
<div className="chart">
<Bar
data={chartData}
options={{
title:{
display:displayTitle,
text:'State-Wise Bar Chart',
fontSize:25
},
legend:{
display:displayLegend,
position:legendPosition
}
}}
/>
</div>
);
};

Chart.defaultProps = {
displayTitle:true,
displayLegend: true,
legendPosition:'right',
location:'City'
};

const CaseList = () => {
const [posts, setPosts] = useState([]);
const [chartData, setChartData] = useState({});

const getchartData = (states,num) => {
console.log("states",states,"num",num);
setChartData({
labels: states,
datasets: [
{
label:'No. of Positive Cases',
data:num,
backgroundColor:[
'rgba(255,3,0,1)',
'rgba(219,3,0,1)',
'rgba(152,3,0,1)',
'rgba(255,3,0,0.7)',
'rgba(101,191,217,1)',
'rgba(101,191,217,0.59)',
'rgba(101,79,161,0.98)',
'rgba(208,79,197,0.98)',
'rgba(208,79,197,0.65)',
'rgba(43,144,197,1)',
]
}
]
});
};

useEffect(() => {
Axios.get('https://api.covid19india.org/data.json')
.then(response => {
setPosts(response.data.statewise);
const posts = response.data.statewise;
const states = [];
const num = [];
for (let i=1; i<posts.length; i++) {
states[i-1] = posts[i].state;
num[i-1] = posts[i].confirmed;
}
getchartData(states,num);
})
.catch(error => {
console.log(error);
});
}, []);

return(
<div>
{Object.keys(chartData).length>0 && <Chart chartData={chartData} />}
</div>
);
};

const rootElement = document.getElementById("root");
ReactDOM.render(
<CaseList />,
rootElement
);