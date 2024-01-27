import "./chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  Label,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";

const data = [
  { name: "Sept", Total: 800 },
  { name: "Oct", Total: 1600 },
  { name: "Nov", Total: 900 },
  { name: "Dec", Total: 1700 },
  { name: "Jan", Total: 700 },
  { name: "Feb", Total: 800 },
  { name: "Mar  ", Total: 800 },
  { name: "Apr", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
  { name: "July", Total: 1200 },
  { name: "Aug", Total: 2100 },
];

const ChartStudent = ({ aspect, title }) => {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white ml-10 mt-10" style={{borderRadius :15 ,boxShadow:"0px 0px 5px lightgray" , margin:10,paddingTop:5,paddingRight:5, paddingLeft:5,color:'gray' }}>
        <div style={{flexDirection:'row' ,display:"flex" ,justifyContent:'space-between',marginBottom:-25}}>
        <div style={{display:"flex" ,marginTop:5}}>
        {/* <Icon 
         name="radio-button-off-outline"
         fill={"#15C9CE"}
         size="small"
        /> */}
        <p className="label" style={{ marginLeft:5, marginTop:-5 }}>{`${payload[0].value}`}</p>
        </div>
        <div style={{flexDirection:'row' ,display:"flex", marginTop:5}}>
        <FontAwesomeIcon className="pr-2  mb-2 ml-5 text-[#0ceb20]" icon={faArrowUp} />
         <h4 className="text-sm text-[#0ceb20]" style={{marginLeft:-4, marginTop:-2}}>12</h4>
         </div>
        {/* <p className="label" style={{ marginLeft:10 }}>{`${label} : ${payload[0].value}`}</p> */}
        </div>
        <p className="intro ml-4"  style={{ marginLeft:10, color:"#E0E0E0" }}>{"___________________________"}</p>
        <div style={{flexDirection:'row' ,display:"flex" ,justifyContent:'space-between', marginTop:-5}}>
        
        <p className="desc ml-4" style={{ marginLeft:16  }}>{`   Date  `}</p>
        <p className="desc ml-4" style={{ marginLeft:80 }}>{`${label},28`}</p>
        </div>
      </div>
      );
    }
  
    return null;
  };
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="98%" aspect={aspect}>
        <AreaChart
          width={750}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
{/* 
request.auth != null; */}
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="2%" stopColor="#15C9CE" stopOpacity={0.2} />
              <stop offset="98%" stopColor="white" stopOpacity={0.2} />
                          </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray"
           tickLine={false}
           axisLine={false}
           mirror={false}
          >
            <Label value="name" position="bottom" />
            </XAxis> 
           
          <CartesianGrid horizontal={false} strokeDasharray="3 3" className="chartGrid" />
           <Tooltip   
            cursor={false}
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

export default ChartStudent;