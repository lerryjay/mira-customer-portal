import React, { Component } from 'react'
import {withContext} from '../../../common/context';
import { HTTPURL, APIKEY, FILEURL } from '../../../common/global_constant';
import placeholder from "../../../assets/images/product-placeholder.gif";

class UpdateCourse extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            email: '',
            telephone: '',
            firstname: '',
            lastname: '',
            othername: '',
            gender: '',
            experience:'',
            organization: '',
            companyrole: '',
            age: '',
            country: '',
            state: '',
            loading: false,
            students:[],
            countries:[],
            states:[],
        };

    }

    componentDidMount() {
        this.getStudents();
        this.getCountries();
    }

      
    getCountries() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );
         fetch(HTTPURL + `region/countries`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
        .then(data => {
            this.setState({countries: data.data})
        })

    }

    getStates(country_id) {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY );
        fetch(HTTPURL + `region/states?countryid=${country_id}`, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
        .then(data => {
            this.setState({states: data.data})
        })
    }

    async getStudents() {
        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
        const res = await fetch(HTTPURL + `training/liststudents`, {
            headers: headers,
        }).then((response) => response.json());
        if (res["status"]) {
            this.setState({ students: res["data"]});

            const studentid = this.props.location.pathname.split("/")[2];

            const selectedStudent = this.state.students.find(student => student.userid == studentid);
            await this.setState({
              lastname: selectedStudent.lastname,
              firstname: selectedStudent.firstname,
              othername: selectedStudent.othername,
              telephone: selectedStudent.telephone,
              email: selectedStudent.email,
              studentid: studentid,
              age: selectedStudent.age,
              gender: selectedStudent.gender,
              companyrole: selectedStudent.companyrole,
              organization: selectedStudent.organization,
              experience: selectedStudent.experience,
              state: selectedStudent.state,
              country: selectedStudent.country,
      
            });
        }
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const headers = new Headers();
        headers.append("API-KEY", APIKEY);

        const studentid = this.props.location.pathname.split("/")[2];

        let formdata = new FormData();
        formdata.append("lastname", this.state.lastname);
        formdata.append("firstname", this.state.firstname);
        formdata.append("othername", this.state.othername);
        formdata.append("telephone", this.state.telephone);
        formdata.append("email", this.state.email);
        formdata.append("studentid", studentid);
        formdata.append("age", this.state.age);
        formdata.append("gender", this.state.gender);
        formdata.append("companyrole", this.state.companyrole);
        formdata.append("organization", this.state.organization);
        formdata.append("experience", this.state.experience);
        formdata.append("state", this.state.state);
        formdata.append("country", this.state.country);
    
        const res = await fetch(HTTPURL + "training/updatestudent", {
          method: "POST",
          body: formdata,
          headers: headers,
        }).then((response) => response.json())
        this.setState({ loading: false });
        if (res.status) {
          this.getStudents();
          this.state.showAlert('success',res.message)
          this.props.history.goBack();
        }
        else{
          this.state.showAlert('danger', res.message);
        }
        this.setState({ updateData: true });
        return res;
      };


    render() {
        let {imagePreviewUrl} = this.state;
            let imagePreview = null;
            if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} className="imagePreview"/>);
            }  else{
                imagePreview = (<img src={FILEURL + this.state.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} className="imagePreview"/>);
            }
        return (

            <div className="container justify-content-center mt-4 row">
                
                <div className="col-md-8">

                        <form onSubmit={this.handleSubmit} id="createclient">

                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    UPDATE STUDENT
                                </div>

                                <div className="card-body">

                          
                                <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">First&nbsp;Name</label>
                                                <input type="text" className="form-control form-control-sm" name="firstname"
                                                    id="firstname" placeholder="Firstname"
                                                    value={this.state.firstname} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Last&nbsp;Name</label>
                                                <input type="text" className="form-control form-control-sm" name="lastname"
                                                    id="lastname" placeholder="Lastname"
                                                    value={this.state.lastname} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Other&nbsp;Name</label>
                                                <input type="text" className="form-control form-control-sm" name="othername"
                                                    id="othername" placeholder="Othername"
                                                    value={this.state.othername} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Email</label>
                                                <input type="text" className="form-control form-control-sm" name="email"
                                                    id="email" placeholder="Enter Email"
                                                    value={this.state.email} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Telephone</label>
                                                <input type="text" className="form-control form-control-sm" name="telephone"
                                                    id="telephone" placeholder="Phone no." 
                                                    value={this.state.telephone}
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Age</label>
                                                <input type="number" className="form-control form-control-sm" name="age"
                                                    id="age" placeholder="Age" 
                                                    value={this.state.age}
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Organization</label>
                                                <input type="text" className="form-control form-control-sm" name="organization"
                                                    id="organization" placeholder="Organization" 
                                                    value={this.state.organization}
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Company Role</label>
                                                <input type="text" className="form-control form-control-sm" name="companyrole"
                                                    id="companyrole" placeholder="Company Role"
                                                    value={this.state.companyrole} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Experience</label>
                                                <input type="text" className="form-control form-control-sm" name="experience"
                                                    id="experience" placeholder="Experience" 
                                                    value={this.state.experience}
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>





                                        <div className="col-md-4 mb-3">
                                            <select
                                            name="gender"
                                            id="gender"
                                            className=" custom-select custom-select-sm"
                                            defaultValue=""
                                            >
                                            <option value=""  disabled> Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>

                                            </select>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <select
                                            onChange={(e) => {
                                                this.getStates(e.target.value);
                                                this.setState({ companycountryid: e.target.value });
                                            }}
                                            value={this.state.companycountryid}
                                            name="companycountryid"
                                            id="companycountryid"
                                            className=" custom-select custom-select-sm"
                                            defaultValue=""
                                            >
                                            <option value=""  disabled>
                                                Company&nbsp;Country&nbsp;
                                            </option>

                                            {this.state.countries.map((country,i) => {
                                                return (
                                                <option key={i} value={country.country_id}>{country.name}</option>
                                                );
                                            })}
                                            </select>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <select
                                            onChange={(e) => {
                                                this.setState({ companystateid: e.target.value });
                                            }}
                                            value={this.state.companystateid}
                                            name="companystateid"
                                            id="companystateid"
                                            className="custom-select custom-select-sm"
                                            defaultValue=""
                                            >
                                            <option value=""  disabled>
                                                Company&nbsp;State&nbsp;
                                            </option>

                                            {this.state.states.map((state) => {
                                                return (
                                                <option value={state.states_id}>{state.name}</option>
                                                );
                                            })}
                                            </select>
                                        </div>
                                    </div>
                                     </div>

                                <div className="card-footer">
                                    <div className="text-center">
                                        {this.state.loading ?
                                            <button type="submit" className="btn btn-sm btn-primary px-4">
                                                <div className="spinner-border text-white" role="status" id="loader">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                            : <button type="submit" className="btn btn-sm btn-primary px-3">
                                                <i className="fas fa-folder-open mr-2"></i>
                                        Save
                                    </button>
                                        }


                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

            </div>

        )
    }
}
export default withContext(UpdateCourse);
