import "./chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { grey } from "@mui/material/colors";

const data = [
    { name: "September", Total: 800 , pages:"Sep"},
    { name: "October", Total: 1600 ,pages:""},
    { name: "November", Total: 900 ,pages:""},
    { name: "December", Total: 1700 ,pages:""},
  { name: "January", Total: 700 ,pages:""},
  { name: "February", Total: 800 ,pages :""},
  { name: "March  ", Total: 800 ,pages:""},
  { name: "April", Total: 1600 ,pages:""},
  { name: "May", Total: 900 ,pages  :""},
  { name: "June", Total: 1700 ,pages:""},
  { name: "July", Total: 1200 ,pages:""},
  { name: "Augest", Total: 2100 ,pages:"Aug"},
];

const ChartTeacher = ({ aspect, title }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white ml-10 mt-10" style={{borderRadius :15 ,boxShadow:"0px 0px 5px lightgray" , margin:10,paddingTop:5,paddingRight:5, paddingLeft:5,color:'gray' }}>
        <div style={{flexDirection:'row' ,display:"flex" ,justifyContent:'space-between',marginBottom:-20 , marginTop:5}}>
        <div style={{display:"flex" ,marginTop:5,}}>
          <div>
     
        </div>
        <p className="label" style={{ marginLeft:5, }}>{`${payload[0].value}`}</p>
        </div>
        <div style={{flexDirection:'row' ,display:"flex" ,
        backgroundColor:"ButtonShadow" , borderRadius:15 ,marginLeft:0 ,
         padding:2 , marginBottom:15 , paddingRight:10 , height:25   }}>
        <FontAwesomeIcon className="pr-2  mb-2 ml-2 mt-1 text-xs " size={5} style={{color:'red'}} icon={faArrowUp} />
         <h4 className="text-xs !text-[#de0711] !text-[]" style={{marginLeft:-5,color:'red',marginTop:1}}>6</h4>
         </div>
        {/* <p className="label" style={{ marginLeft:10 }}>{`${label} : ${payload[0].value}`}</p> */}
        </div>
        <p className="intro ml-4"  style={{ marginLeft:10, color:"#E0E0E0" }}>{"_______________________"}</p>
        <div style={{flexDirection:'row' ,display:"flex" ,justifyContent:'space-between', marginTop:-5}}>
        <p className="desc ml-4" style={{ marginLeft:10  }}>{`Date  `}</p>
        <p className="desc ml-4" style={{ marginLeft:40 }}>{`june, 27`}</p>
        </div>
      </div>
      );
    }
  
    return null;
  };
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={750}
          height={250}
          data={data}
          margin={{left: 15, bottom: 0 }}
        >
{/* 
request.auth != null; */}
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="2%" stopColor="#15C9CE" stopOpacity={0.2} />
              <stop offset="98%" stopColor="white" stopOpacity={0.2} />
        </linearGradient>
          </defs>
          <XAxis dataKey="pages" stroke="gray" 
           tickLine={false}
           axisLine={false}
           //ticks={false}
           tic
           tickMargin={2}
          />
          <CartesianGrid horizontal={false} vertical={false} strokeDasharray="3 3" className="chartGrid" />
          <Tooltip
          cursor={false}
          wrapperStyle={{
            width:180,
            height:100,
          }}
          content={<CustomTooltip/>}
          
          contentStyle={{left:10, top:10 , borderRadius:15}}
          />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#15C9CE"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartTeacher;