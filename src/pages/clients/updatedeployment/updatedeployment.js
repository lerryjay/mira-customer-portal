import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import UpdateDeploymentForm from "./updatedeploymentform";

import 'react-trumbowyg/dist/trumbowyg.min.css'
import Trumbowyg from 'react-trumbowyg'

const headers = new Headers();
class UpdateClientProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      clientid: "",
      productId: "",
      modules: [],
      remarks: "",
      errormessage: "",
      loading: false,
      files: [],
      users: [],
      costs: [],
      previews: "",
      imagePreviewUrl: "",
      successmessage: "",
      selectedModules: [],
      newCostTitle : ""
    };
  }

  updateProduct = (productId) => {
    // Get productId
    this.setState({ productId });
  };

  async componentWillMount() {
    const deploymentId = this.props.location.pathname.split("/")[2];
    await this.setState({ deploymentId });
    this.getDeployment();
    
  }

  getModule = async(productId) => {
    fetch(HTTPURL +`product/modules?productId=${productId}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    ) .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          this.setState({ modules: result.data });
        }
    });

  }

  getDeployment = async ()=> {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    const res = await fetch(
      `${HTTPURL}deployment/info?userid=${this.state.user.userid}&deploymentid=${this.state.deploymentId}`,
      {
        method: "GET",
        headers: headers,
      }
    ).then((res) => res.json());
    if (res["status"]) {
      let { imageurl,remarks,modules,product_id, costs } = res.data;
      this.getModule(product_id);
      const selectedModules = modules.map(item=>item.id);
      costs = costs || [];
      this.setState({ productId: product_id,imageurl,remarks,selectedModules,product_id,costs });
    }

  }

  

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errormessage: "" });
    name == 'productId' && this.getModule(e.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    let myHeaders = new Headers();
    myHeaders.append("api-key", APIKEY);

    var formdata = new FormData();
    formdata.append("deploymentid", this.props.location.pathname.split("/")[2]);
    formdata.append("modules", this.state.selectedModules.toString());
    formdata.append("userid", this.state.user.userid);
    formdata.append("remarks", this.state.remarks);
    formdata.append("costs", JSON.stringify(this.state.costs));

    const res = await fetch(HTTPURL + "deployment/update", {  method: "POST",  headers: myHeaders,body: formdata, }).then((response) => response.json())
      this.setState({ loading: false });
      if(res.status === true) {
          this.state.showAlert("success", res.message)
          window.history.back();
      } else{
          this.state.showAlert("danger",  res.message)
      }
  };

  handleCheck = ({ target }) => {
    const index = this.state.selectedModules.findIndex(item=> item === target.value);
    const { selectedModules } = this.state;
    if (index > -1) {
      selectedModules.splice(index,1);
    } else {
      selectedModules.push(target.value);
    }
    this.setState({ selectedModules });
  };

  onFocus(e) {
    e.currentTarget.type = "date";
  }

  updateDeploymentCosts = (costs)=>
  {
    
  } 
  removeImage(e) {
    this.setState({ imagePreviewUrl: "" });
  }

  removeOtherImage(e) {
    this.setState({ file: "", imageError: false });
  }

  handleImageChange = (e)=> {
    e.preventDefault();
    let files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }
    this.setState({ files });
  }

  
  addCostFields = () => {
    
    if(this.state.newCostTitle.length < 1){ 
      this.state.showAlert('danger','Please enter cost title');
      return
    };
    const newField = {
      title: this.state.newCostTitle,
      amount: '',
      duration: '',
      paymentstatus: '',
      paymentdate: ''
    };
    let costs = this.state.costs;
    costs.push(newField);
    this.setState({ costs });
  }

  handleCostChange = ({ target })=>{
    const index = target.getAttribute('data-index');
    const name  = target.name;
    
    let cost   = this.state.costs[index];
    cost[name] = target.value;
    let costs  = [...this.state.costs];
    costs[index] = cost;
    this.setState({ costs });
  };

  removeCostField = (index) => {
    let costs = this.state.costs;
    costs.splice(index, 1);
    this.setState({costs});
  }

  render() {
    return (
      <UpdateDeploymentForm
      handleSubmit={this.handleSubmit}
      
      handleCheck={this.handleCheck}
      handleImageChange={this.handleImageChange}
      handleInputChange={this.handleInputChange}
      updateDeploymentCosts={this.updateDeploymentCosts}
      addCostFields = { this.addCostFields }
      removeCostField = { this.removeCostField }
      
      remarks={this.state.remarks}
      modules={this.state.modules}
      loading={this.state.loading}
      
      products={this.state.products}

      updateProduct={this.updateProduct}
      showAlert = {this.state.showAlert }

      productId =  { this.state.productId}
      remarks = { this.state.remarks }
      costs = { this.state.costs }
      handleCostChange = {this.handleCostChange}
    />

    );
  }
}
export default withContext(UpdateClientProduct);
