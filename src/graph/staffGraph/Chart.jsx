import "./chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SmileOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { faArrowUp ,faArrowUpShortWide} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from 'react-eva-icons';

const data = [
    { name: "September", Total: 800 , pages:"Sep"},
    { name: "October", Total: 1000 ,pages:""},
    { name: "November", Total: 900 ,pages:""},
    { name: "December", Total: 1100 ,pages:""},
  { name: "January", Total: 1200 ,pages:""},
  { name: "February", Total: 1100 ,pages :""},
  { name: "March  ", Total: 1300 ,pages:""},
  { name: "April", Total: 900 ,pages:""},
  { name: "May", Total: 900 ,pages  :""},
  { name: "June", Total: 800 ,pages:""},
  { name: "July", Total: 900 ,pages:""},
  { name: "Augest", Total: 700 ,pages:"Aug"},
];

const ChartStaff = ({ aspect, title }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white ml-10 mt-10" style={{borderRadius :15 ,boxShadow:"0px 0px 5px lightgray" , margin:10,paddingTop:5,paddingRight:10, paddingLeft:10,color:'gray' }}>
        <div style={{flexDirection:'row' ,display:"flex" ,justifyContent:'space-between',marginBottom:-10}}>
        <div style={{display:"flex" ,marginTop:5,}}>
          <div>
        <Icon 
         name="radio-button-off-outline"
         fill={"#15C9CE"}
         size="small"
        />
        </div>
        <p className="label" style={{ marginLeft:5, }}>{`${payload[0].value}`}</p>
        </div>
        <div style={{flexDirection:'row' ,display:"flex" ,
        backgroundColor:"ButtonShadow" , borderRadius:15 ,marginLeft:-5 ,
         padding:2 , marginBottom:6 , paddingRight:10 , height:25   }}>
        <FontAwesomeIcon className="pr-2  mb-2 ml-2 mt-1 text-xs " size={5} style={{color:'red'}} icon={faArrowUp} />
         <h4 className="text-xs !text-[#de0711] !text-[]" style={{marginLeft:-5,color:'red',marginTop:1}}>6</h4>
         </div>
        {/* <p className="label" style={{ marginLeft:10 }}>{`${label} : ${payload[0].value}`}</p> */}
        </div>
        <p className="intro ml-4"  style={{ marginLeft:10,color:"#E0E0E0", }}>{"____________________________"}</p>
        <div style={{flexDirection:'row' ,display:"flex" ,justifyContent:'space-between', marginTop:-5}}>
        <p className="desc ml-4" style={{ marginLeft:10  }}>{`Date  `}</p>
        <p className="desc ml-4" style={{ marginLeft:80 }}>{`june,27`}</p>
        </div>
      </div>
      );
    }
  
    return null;
  };
  return (
    <div id="staff" className="chart">
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
          <defs >
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="2%" stopColor="#E0E0E0" stopOpacity={0.2} />
              <stop offset="98%" stopColor="#FFF" stopOpacity={0.2} />
        </linearGradient>
          </defs>
          <XAxis dataKey="pages" stroke="gray" 
          tickLine={false}
          axisLine={false}
          tickMargin={2}
         />
          <CartesianGrid horizontal={false} vertical={false} strokeDasharray="3 3" className="chartGrid" />
          <Tooltip 
          cursor={false}
          content={<CustomTooltip/>}
          contentStyle={{left:10, top:10 , borderRadius:15}}
          />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#E0E0E0"
            strokeWidth={2}
           fillOpacity={2}
           fill={"#FFFFFF"}
            // fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartStaff;