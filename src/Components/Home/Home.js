import React, {  useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import "./Home.css";








export default function Home() {
   
  toast.configure()
  const navigate = useNavigate();
 
 
  let [cluster, setcluster] = useState([]);
  let [start, setstart] = useState([]);
  let [stop, setstop] = useState([]);
  let [reboot, setreboot] = useState([]);
  // let[charstarttdata,setcharstartdata]=useState([]);
  // let[chartrebootdata,setcharreboottdata]=useState([]);
  // let[charstoptdata,setcharstoptdata]=useState([]);

//form field values
let [clusterName,setclusterName] = useState([]);
let[clusterRegion,setclusterRegion] = useState([]);
let[chooseclusterName,setchooseclusterName] = useState([]);
let[machineName,setmachineName]= useState([]);
let[ipaddress,setipaddress] = useState([]);
let[instancetype,setinstancetype] = useState([]);
let[tag,setTag] = useState([]);


 
  //getting full cluster details
  useEffect(() => {
    async function fetchData() {
      await fetch('https://nodejs-restapi-backend.herokuapp.com/cluster/')
      .then(res => {
        return res.json();
    }).then((data) => {
      
      setcluster(data)
     
  
       
    })
    }
    fetchData();
  }, []);

  console.log(cluster);

  //getting machines with start tag
  useEffect(() => {
    async function fetchstartData() {
      let data = await fetch(
        "https://nodejs-restapi-backend.herokuapp.com/machines/start"
      );
      let startdata = await data.json();

      setstart(startdata.data);
      // setcharstartdata(startdata.data);
    }
    fetchstartData();
  },[]);
  console.log(start);

  // getting machines with reboot tag
  useEffect(() => {
    async function fetchrebootData() {
      let data = await fetch(
        "https://nodejs-restapi-backend.herokuapp.com/machines/reboot"
      );
      let rebootdata = await data.json();

      setreboot(rebootdata.data);
   
    }
    fetchrebootData();
  },[]);
  console.log(reboot);

  //getting machines with stop tag
  useEffect(() => {
    async function fetchstopData() {
      let data = await fetch(
        "https://nodejs-restapi-backend.herokuapp.com/machines/stop"
      );
      let stopdata = await data.json();

      setstop(stopdata.data);
    }
    fetchstopData();
  },[]);

  console.log(stop);


//Cluster Submit
  let CreatingClusterSubmit= async(e)=>{
    e.preventDefault()

    await fetch('https://nodejs-restapi-backend.herokuapp.com/add',{
      method :"POST",
      body :JSON.stringify({
        clusterName,clusterRegion,machines:[]
      }),
      headers : {
          "content-type" : "application/json"
      }
  })
  alert("cluster created")
  navigate('/')
  }

  //Machine Submit

  let CreateMachineSubmit =async(e)=>{
    e.preventDefault()

    await fetch(`https://nodejs-restapi-backend.herokuapp.com/machines/${chooseclusterName}`,{
      method :"PUT",
      body :JSON.stringify({
        machines:{
          "name":machineName,
          "ipaddress":ipaddress,
          "instance-type":instancetype,
          "tags":tag

        }
      }),
      headers : {
          "content-type" : "application/json"
      }
  })
  alert("machine created")
  navigate('/')
  }

//chart Details
const chartdata = {
  labels: ["Active","Reboot","Inactive"],
  datasets: [
    {
      label: 'Machine',
      data: [start.length,reboot.length,stop.length],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      
    },
  },
};

const Chart = () => (
  <>
    <div className='header'>
      <h5 className='title'>Cluster Activity</h5>
     
    </div>
    <Bar data={chartdata} options={options}/>
  </>
);







  return ( !cluster ? <p>Loading..</p>: 
    <div className="Home__Container  ">
     <div className="row p-4">
       <div className="col-md-6">
          <div class="card ">
            <h5 class="card-header">welcome Admin!!</h5>
            <div class="card-body">
              <div className="row">
                <div className="col-3">
                <div className="card text-center m-2">
                  <div className="card-title text-center"><h1>{cluster ? cluster.length : 0}</h1></div>
                  <div className="card-body text-center"><i class="fa fa-cloud" aria-hidden="true"></i>&ensp;Clusters</div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card text-center m-2">
                  <div className="card-title text-center"><h1>{start ? start.length: 0}</h1></div>
                  <div className="card-body text-center"><span class="greendot"></span>&emsp;Active </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card text-center m-2">
                  <div className="card-title text-center"><h1>{reboot ? reboot.length :0}</h1></div>
                  <div className="card-body text-center"><span class="orangedot"></span>&emsp;Reboot </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card text-center m-2">
                  <div className="card-title text-center"><h1> {stop ? stop.length : 0}</h1></div>
                  <div className="card-body text-center"> <span class="reddot"></span>&emsp;Inactive </div>
                  </div>
                </div>
                <br/>
                {/* <div className="col-3 m-2">
                <button className="btn btn-primary" type="button">Start all the inactive machines</button>
                </div>
                <div className="col-3 m-2">
                <button className="btn btn-primary" type="button">Reboot all the inactive machines</button>
                </div>
                <div className="col-3 m-2">
                <button className="btn btn-primary" type="button">stop all the active machines</button>
                </div>
                */}
              </div>
            </div>
          </div>
          <br/>
          <div class="card">
            <h5 class="card-header">
              Clusters{" "}
              <button
                type="button"
                class="btn btn-success float-right "
                data-toggle="modal"
                data-target="#exampleModal"
                data-whatever="@mdo"
              >
                New Cluster
              </button>
            </h5>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title " id="exampleModalLabel">
                      New Cluster
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form >
                      <div class="form-group">
                        <label for="cluster-name" class="col-form-label">
                          Cluster Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="cluster-name"
                          placeholder="eg..C1"
                          onChange={(e)=>setclusterName(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="cluster-region" class="col-form-label">
                          Cluster Region:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="cluster-region"
                          placeholder="eg..us-east1"
                          onChange={(e)=>setclusterRegion(e.target.value)}
                        ></input>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary" onClick={CreatingClusterSubmit}>
                      create cluster
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">  </h5>
              <p class="card-text">
                <div class="list-group">
                  {cluster.map((obj) => {
                    return (
                      <Link
                        to={`/cluster/${obj.clusterName}`}
                        class="list-group-item list-group-item-action list-group-item-light">
                        Cluster Name - <strong>{obj.clusterName} </strong><br/>
                        Cluster Region - {obj.clusterRegion}
                      </Link>
                    );
                  }) 
                
                
                }
                </div>
              </p>
            </div>
          </div>
          </div>
          <div className="col-md-6">
          <Chart/>
        <br/>
     
     
       <div class="card">
            <h5 class="card-header">
              Machines{" "}
              <button
                type="button"
                class="btn btn-success float-right"
                data-toggle="modal"
                data-target="#exampleModal1"
                data-whatever="@mdo"
              
              >
                New Machine
              </button>
            </h5>
            <div
              class="modal fade"
              id="exampleModal1"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      New Machine
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="cluster-name" class="col-form-label">
                          Choose Cluster :
                        </label>

                        <select id="cluster-name" class="form-control" onChange={(e)=>setchooseclusterName(e.target.value)}>
                          <option selected>Choose...</option>
                          {cluster.map((obj) => {
                            return <option>{obj.clusterName}</option>;
                          })}
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="machine-name" class="col-form-label">
                          Machine Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="machine-name"
                          placeholder="eg..M1"
                          onChange={(e)=>setmachineName(e.target.value)}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="ipaddress" class="col-form-label">
                          ip address
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="ipaddress"
                          placeholder="eg..192.00.01.7"
                          onChange={(e)=>setipaddress(e.target.value)}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="instancetype" class="col-form-label">
                          instance type
                        </label>
                        <select id="instancetype" class="form-control" onChange={(e)=>setinstancetype(e.target.value)}>
                          <option selected>Choose...</option>
                          <option>EC2</option>
                          <option>EC3</option>
                          <option>S3</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="tag" class="col-form-label">
                          tag
                        </label>
                        <select id="tag" class="form-control" onChange={(e)=>setTag(e.target.value)}>
                          <option selected>Choose...</option>
                          <option>start</option>
                          <option>reboot</option>
                          <option>stop</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary" onClick={CreateMachineSubmit}>
                      create machine
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
              <h5 class="card-title">  </h5>
              <p class="card-text">
                <div class="list-group">
                  {  cluster.map((obj) => {
                    return (<>
                    {
                      obj.machines.map((c,i)=> <li
                      href="#"
                      class="list-group-item list-group-item-action list-group-item-light">


                       Machine Name - {c.name} <br/>
                       IP Address - {c.ipaddress}<br/>
                    
                      
                    </li>
                      )} 
                     
                    </>);
                  }) 
                }
                </div>
              </p>
            </div>
          </div>
       </div>
       </div>
     

      </div>
  );
}

 
