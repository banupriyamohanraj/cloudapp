import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Cluster.css";

export default function Cluster(props) {
  const params = useParams();
  const navigate = useNavigate();
  toast.configure();
  console.log(params.clusterName);

  let [cluster, setcluster] = useState([]);
  let [modifyTag, setModifyTag] = useState("");
  let [machineName,setmachineName]= useState("");
  let [ipaddress,setipaddress] = useState("");
  let[instancetype,setinstancetype] = useState("");
  let[tag,setTag] = useState("")

  useEffect( () => {
    async function fetchData(){
    let product = await fetch(
      `https://nodejs-restapi-backend.herokuapp.com/${params.clusterName}`
    );
    let productdata = await product.json();
    console.log(productdata);
    setcluster([productdata]);
    }
    fetchData();
  }, [params.clusterName]);

  console.log(cluster);

  let deleteclusterSubmit = async (obj) => {
    await fetch(`https://nodejs-restapi-backend.herokuapp.com/delete/${obj}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    

    navigate("/");
  };

  let deletingmachineSubmit = async (cluster, machine) => {
  

    await fetch(
      `https://nodejs-restapi-backend.herokuapp.com/machines/delete/${cluster}/${machine}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    toast("Machine Deleted");
  };

  let modifytagSubmit = async (cluster, machine) => {
    await fetch(
      `https://nodejs-restapi-backend.herokuapp.com/machines/tags/${cluster}/${machine}`,
      {
        method: "PUT",
        body: JSON.stringify({
          tags: modifyTag,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
  };

  let CreateMachineSubmit =async(cluster)=>{
  

    await fetch(`https://nodejs-restapi-backend.herokuapp.com/machines/${cluster}`,{
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

  }

  return (
    <>
    <div className="container-fluid">
      {cluster ? (
        cluster.map((obj) => {
          return (
            <div className="container-fluid">
              <div className="row p-4">
                <div className="col-1">
                  <button
                    type="button"
                    class="btn btn-dark float-left"
                    style={{ borderRadius: "100%" }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>{" "}
                  </button>
                   
                </div>
                <div className="col-9">
                  <h1 className="text-center">cluster  {obj.clusterName} </h1>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-success float-right"
                    data-toggle="modal"
                    data-target="#exampleModal1"
                    data-whatever="@mdo"
                  >
                    Add Machine
                  </button>
                  
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
                          Chosen Cluster :
                        </label>

                        <input
                                      type="text"
                                      class="form-control"
                                      id="cluster-name"
                                      
                                      value={obj.clusterName}
                                    />
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
                    <button type="button" class="btn btn-primary" onClick={()=>{CreateMachineSubmit(obj.clusterName)}}>
                      create machine
                    </button>
                  </div>
                </div>
              </div>
              </div>

              </div>
              </div>
                <div className="card" style={{backgroundColor:"gainsboro"}}>
                  <div className="card-body">
                      <dl class="row p-4">
                <dt class="col-sm-3">Cluster Name</dt>
                <dd class="col-sm-9">
                  <strong>{obj.clusterName}</strong>
                </dd>

                <dt class="col-sm-3">Cluster Region</dt>
                <dd class="col-sm-9">
                  <p>
                    <strong>{obj.clusterRegion}</strong>
                  </p>
                </dd>

                <dt class="col-sm-3">Machines</dt>

                <dd class="col-sm-9">
                  {obj.machines.map((machine) => {
                    return (
                      <>
                        <p>
                          {" "}
                          Machine Name : <strong>{machine.name}</strong>
                        </p>
                        <p> IP Address : {machine.ipaddress}</p>
                        <p> Instance Type : {machine["instance-type"]}</p>
                        <p>Tags : {machine.tags}</p>
                        <button
                          className="btn btn-danger"
                          type="button"
                          style={{ fontSize: "10px" }}
                          onClick={() => {
                            deletingmachineSubmit(
                              obj.clusterName,
                              machine.name
                            );
                          }}
                        >
                          Delete
                        </button>{" "}
                        &ensp;
                        <button
                          className="btn btn-warning"
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          data-whatever="@mdo"
                          style={{ fontSize: "10px" }}
                        >
                          Modify Tag
                        </button>
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
                                  Modify tag
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
                                    <label
                                      for="cluster-name"
                                      class="col-form-label"
                                    >
                                      Cluster Name:
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="cluster-name"
                                      placeholder="eg..C1"
                                      value={obj.clusterName}
                                    />
                                  </div>
                                  <div class="form-group">
                                    <label
                                      for="cluster-region"
                                      class="col-form-label"
                                    >
                                      Machine Name
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="cluster-region"
                                      placeholder="eg..us-east1"
                                      value={machine.name}
                                    ></input>
                                  </div>
                                  <div class="form-group">
                                    <label
                                      for="cluster-region"
                                      class="col-form-label"
                                    >
                                      Current Tag
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="cluster-region"
                                      placeholder="eg..us-east1"
                                      value={machine.tags}
                                    ></input>
                                  </div>
                                  <div class="form-group">
                                    <label for="tag" class="col-form-label">
                                      Choose Tag to be updated
                                    </label>
                                    <select
                                      id="tag"
                                      class="form-control"
                                      onChange={(e) =>
                                        setModifyTag(e.target.value)
                                      }
                                    >
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
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  onClick={() => {
                                    modifytagSubmit(
                                      obj.clusterName,
                                      machine.name
                                    );
                                  }}
                                >
                                  Modify Tag
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </dd>
              </dl>
              <button
                className="btn btn-danger"
                type="button float-right"
                onClick={() => {
                  deleteclusterSubmit(obj.clusterName);
                }}
              >
                Delete cluster
              </button>
             </div>
              </div>
              </div>
           
          );
        })
      ) : (
        <div class="spinner-grow text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      </div>
    </>
  );
}
