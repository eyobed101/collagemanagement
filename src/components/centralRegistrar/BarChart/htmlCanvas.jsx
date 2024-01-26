import React, { useEffect, useState } from "react";
import { Tooltip, Timeline, Statistic } from "antd";
import { SmileOutlined, ArrowUpOutlined } from "@ant-design/icons";
import "./index.css";

export default function HtmlCanvas({
  data,
  averageColor = "#FAA916",
  SubColors ="#15C9CE",
  heightColor="#15C9CE",
  averageExists = true,
}) {
  const [height, setheight] = useState([]);
  var [max, setmax] = useState(0);
  var data = [
    { h: 300,  avg: 90,h1: 60, lable: "Math" , title: "Maths"},
    { h: 200, avg: 30, h1: 60, lable: "Phy" , title: "Physics"},
    { h: 200,  avg: 30, h1: 40, lable: "Bio", title: "Biology" },
    { h: 200, avg: 80, h1: 80, lable: "Chem" , title: "Chemistry" },
    { h: 200, avg: 40, h1: 40, lable: "Phy" , title: "Physics"},
    { h: 100, avg: 30, h1: 40, lable: "IT" , title: "IT"},
    { h: 200 , avg: 30, h1: 40, lable: "Apt" , title: "Aptitude"},
    { h: 200, avg: 40, h1: 90, lable: "Geo" , title: "Geography"},
    { h: 100, avg: 50, h1: 40, lable: "His" , title: "History"},
    { h: 100, avg: 30, h1: 90, lable: "Bot", title: "Bot" },
  ];
  const lengthWrapper = () => {
    var max = 0;
    data.map((item, _) => {
      if (parseInt(item.h) + parseInt(item.h1) > max) {
        max = parseInt(item.h) + parseInt(item.h1);
      }
    });
    var step = max / 10;
    var temp = [];
    for (var i = 0; i <= max; i += step) {
      temp.push(i);
    }
    var newTemp = temp.reverse();
    setmax(max);
    setheight(newTemp);
  };

  const mainHaight = (value) => {
    var avg = (value.avg * 100) / max;
    console.log("avg", avg);
    var substract = max * 0.07;
    var data = ((value.h - substract) * 100) / max;
    return data;
  };

  useEffect(() => {
    lengthWrapper();
  }, []);
  return (
    <div>
      <table className="graph">
        <ul style={{ position: "absolute",  }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: 500,
              justifyContent: "space-between",
            }}
          >
            {height.map(items => (
             <ul >{items}</ul>
            //  <ul>man</ul>
            ))}
          </div>
        </ul>
        <tbody>
          {data.map((item, index) => (
              <Tooltip
                color="#15C9CE00"
                style={{marginBottom:90}}
                arrowPointAtCenter={true}
                overlayStyle={{
                  backgroundColor: "white",
                  boxShadow: "0 0 0 0 white",        
                }}
                title={
                  <div
                    style={{
                      width: 211,
                      height: 114,
                      padding: 5,
                      marginTop: 15,
                      backgroundColor: "white",
                    }}
                  >
                    <Timeline
                    >
                      <Timeline.Item color="#15C9CE">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: 20,
                          }}
                        >
                          {/* {console.log("data   "+item.h1)} */}
                          {item.lable}{" "}
                          <Statistic
                            //   title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{
                              color: "#0DA051",
                              fontSize: 14,
                              backgroundColor: "#ECFDF3",
                              marginLeft: 10,
                            }}
                            prefix={<ArrowUpOutlined size={8} />}
                            // suffix="%"
                          />
                        </div>
                      </Timeline.Item>
                      <Timeline.Item color="#C1BCF1">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: 20,
                          }}
                        >
                          Highest Result{" "}
                          <p style={{ marginTop: 0, marginLeft: 10 }}>{item.h1}</p>
                        </div>
                      </Timeline.Item>
                      <Timeline.Item color="#FAA917">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: 20,
                          }}
                        >
                          Average{" "}
                          {item.avg? averageExists=true :averageExists=false}
                          <p style={{ marginTop: 0, marginLeft: 10 }}>{item.avg}</p>
                        </div>
                      </Timeline.Item>
                    </Timeline>
                  </div>
                }
              >
                  <tr
              style={{
                height: "100%",
                borderLeft: " dashed 2px #D0D5DD",
                paddingLeft: "45%",
              }}
            >
                <td
                  style={{
                    height: `${((item.h1 - 10) * 100) / max}%`,
                    position: "absolute",
                    bottom: `${((item.h - 4) * 100) / max}%`,
                    background: "#C2BCF2",
                  }}
                ></td>
                  <td
                  style={{
                    height: `${((item.h1 - 10) * 100) / max}%`,
                    position: "absolute",
                    bottom: `${((item.h - 4) * 100) / max}%`,
                    background: "#C2BCF2",
                  }}
                ></td>
                <td
                  style={{
                    height: "4%",
                    position: "absolute",
                    bottom: `${(item.avg * 100) / max}%`,
                    borderRadius: 0,
                    // backgroundColor: "white",
                    zIndex: 110,
                  }}
                >
                  {averageExists ? (
                    <svg
                      style={{ marginLeft: -1 }}
                      width="12"
                      //   height="20"
                      viewBox="0 0 8 13"
                      fill="red"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0H0V13H8V0Z" fill="white" />
                      <path
                        d="M0 0C0 0 1.7909 0 4 0C6.2091 0 8 0 8 0V0.455814C8 1.56081 7.1046 2.45581 6 2.45581H2C0.8954 2.45581 0 1.56081 0 0.455814V0Z"
                        fill={SubColors}
                      />
                      <path
                        d="M6 4.45508H2C0.89543 4.45508 0 5.35051 0 6.45508C0 7.55965 0.89543 8.45508 2 8.45508H6C7.10457 8.45508 8 7.55965 8 6.45508C8 5.35051 7.10457 4.45508 6 4.45508Z"
                        fill={averageColor}
                      />
                      <path
                        d="M0 12.4551C0 11.3511 0.8954 10.4551 2 10.4551H6C7.1046 10.4551 8 11.3511 8 12.4551V13C8 13 6.2091 13 4 13C1.7909 13 0 13 0 13V12.4551Z"
                        fill="#15C9CE"
                      />
                    </svg>
                  ) : null}
                </td>
                {/* <td
                style={{
                  height: `35%`,
                  position: "absolute",
                  bottom: `45%`,
                }}
              ></td> */}

                <td
                  style={{
                    height: `${mainHaight(item)}%`,
                    position: "absolute",
                    bottom: "3%",
                  }}
                >
                  <h1
                    style={{
                      fontSize: 12,
                      position: "absolute",
                      bottom: -50,
                      marginLeft: -20,
                    }}
                  >
                    {item.title}
                  </h1>
                </td>
                </tr>
              </Tooltip>  
          ))}
          <tr
            style={{
              height: "100%",
              borderLeft: "dashed 2px #D0D5DD",
              paddingLeft: "45%",
            }}
          ></tr>
        </tbody>
      </table>
    </div>
  );
}
