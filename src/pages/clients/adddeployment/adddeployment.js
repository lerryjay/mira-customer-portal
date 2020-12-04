import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import pdf_placeholder from "../../../assets/images/pdf.png";
import AddDeploymentForm from "./adddeploymentform";

class AddClientProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      clientid: "",
      productid: "",
      modules: [],
      trainingcost: "",
      deploymentcost: "",
      trainingdate: "",
      deploymentdate: "",
      paymentdate: "",
      paymentstatus: "",
      liscenseduration: "",
      expirationdate: "",
      remarks: "",
      errormessage: "",
      loading: false,
      files: [],
      users: [],
      previews: "",
      imagePreviewUrl: "",
      successmessage: "",
      selectedProduct: "",
      selectedModules: [],
    };
  }

  updatetype = (type) => {
    // Get productid
    this.setState({ productid: type });
  };

  getModule = (productId) => {
    const headers = new Headers();
    headers.append("API-KEY", APIKEY);
    fetch(
      HTTPURL +
        `product/modules?productid=${productId}&userid=${this.state.user.userid}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          this.setState({ modules: result.data });
        }
      });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errormessage: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const mod = this.state.selectedModules.toString();

    let myHeaders = new Headers();
    myHeaders.append("api-key", APIKEY);

    var formdata = new FormData(document.getElementById("addclientproduct"));

    formdata.append("clientid", this.props.location.pathname.split("/")[2]);
    formdata.append("modules", mod);
    formdata.append("userid", this.state.user.userid);
    formdata.append("productid", this.state.productid);

    fetch(HTTPURL + "deployment/add", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ loading: false });
        if (data.status === true) {
          document.getElementById("addclientproduct").reset();
          this.state.showAlert("success", data.message);
          this.setState({
            type: "",
            liscenseduration: "",
            paymentstatus: "",
            deploymentstatus: "",
            trainingstatus: "",
            selectedModules: [],
            trainingcost: "",
            deploymentcost: "",
            paymentdate: "",
            modules: [],
            files: [],
            deploymentdate: "",
            trainingdate: "",
            remarks: "",
            expirationstatus: "",
            expirationdate: "",
          });
          window.history.back();
        } else {
          this.state.showAlert("danger", data.message);
        }
      });
  };

  addModule = async (moduleId) => {
    await this.setState((prevState) => ({
      selectedModules:
        prevState.selectedModules.length === 0
          ? [moduleId]
          : [...prevState.selectedModules, moduleId],
    }));
  };
  
  removeModule = async (moduleId) => {
    await this.setState((prevState) => ({
      selectedModules: prevState.selectedModules.filter(
        (mod) => mod !== moduleId
      ),
    }));
  };

  deploymentDate(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Deployment Date";
  }
  trainingDate(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Training Date";
  }
  expirationDate(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Expiration Date";
  }
  paymentDate(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Payment Date";
  }
  removeImage(e) {
    this.setState({ imagePreviewUrl: "" });
  }

  removeOtherImage(e) {
    this.setState({ file: "", imageError: false });
  }

  handleImageChange(e) {
    e.preventDefault();
    const { files } = this.state;
    const index = files.findIndex((item) => item === e.target.files);

    // let files = [];

    for (let i = 0; i < e.target.files.length; i++) {
      if (index > -1) {
        files.splice(index, 1);
      } else {
        files.push(e.target.files[i]);
      }
    }

    this.setState({ files });
  }

  render() {
    let files = this.state.files.map((file, i) => {
      return file.name.match(/\.(jpg|jpeg|png)$/) ? (
        <img
          src={URL.createObjectURL(file)}
          key={i}
          style={{ height: "100px", objectFit: "cover" }}
          className="col-md-2 mt-2"
          alt="attachment"
        />
      ) : (
        <span>
          <img
            alt="pdf placeholder"
            src={pdf_placeholder}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
            className="m-2"
            key={i}
          />
          <br />
          {file.name}
        </span>
      );
    });
    return (
      <AddDeploymentForm
        files={files}
        getModule={this.getModule}
        handleSubmit={this.handleSubmit}
        type={this.state.type}
        products={this.state.products}
        deploymentcost={this.state.deploymentcost}
        handleInputChange={this.handleInputChange}
        deploymentstatus={this.state.deploymentstatus}
        deploymentdate={this.state.deploymentdate}
        trainingcost={this.state.trainingcost}
        trainingstatus={this.state.trainingstatus}
        trainingdate={this.state.trainingdate}
        paymentdate={this.state.paymentdate}
        paymentstatus={this.state.paymentstatus}
        expirationstatus={this.state.expirationstatus}
        expirationdate={this.state.expirationdate}
        licenseduration={this.state.licenseduration}
        remarks={this.state.remarks}
        modules={this.state.modules}
        loading={this.state.loading}
        deploymentDate={this.state.deploymentDate}
        trainingDate={this.state.trainingDate}
        paymentDate={this.state.paymentDate}
        expirationDate={this.state.expirationDate}
        handleImageChange={this.handleImageChange}
        addModule={this.addModule}
        removeModule={this.removeModule}
        updatetype={this.updatetype}
      />
    );
  }
}
export default withContext(AddClientProduct);
