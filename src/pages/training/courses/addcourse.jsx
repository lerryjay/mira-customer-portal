import React, { Component } from 'react'

import { withContext } from '../../../common/context';
import { HTTPURL, APIKEY } from '../../../common/global_constant';

class CreateClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            title: '',
            description: '',
            cost: '',

            errormessage: '',
            loading: false,
            successmessage: ''
        };
    }
    
    async componentDidMount(){
        this.state.showLoader();
        this.setState({ loading : false  });
        this.state.hideLoader();
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage: '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({ loading: true });

            let myHeaders = new Headers();
            myHeaders.append("api-key", APIKEY);

            var formdata = new FormData();
            formdata.append("title", this.state.title);
            formdata.append("description", this.state.description);
            formdata.append("cost", this.state.cost);
            formdata.append("userid", this.state.user.userid);

            fetch(`${HTTPURL}training/addcourse`, {
                method: "POST",
                headers: myHeaders,
                body: formdata
            }).then(response => response.json()).
                then(result => {
                    this.setState({ loading: false });
                        if(result.status === true) {
                            this.state.showAlert("success", result.message);
                            this.props.history.push('/courses');
                                this.setState({
                                    title: '', description: '', cost: '',
                            });
                        } else{
                            this.state.showAlert("danger",  result.message)
                        }
                })


    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center  mt-4">
                <div className="col-md-8">

                        <form onSubmit={this.handleSubmit} id="createclient">

                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    REGISTER COURSE
                                </div>

                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Title</label>
                                                <input type="text" className="form-control form-control-sm" name="title"
                                                    id="title" placeholder="Course Title"
                                                    value={this.state.title} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Description</label>
                                                <input type="text" className="form-control form-control-sm" name="description"
                                                    id="description" placeholder="Course Description"
                                                    value={this.state.description} 
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="" className="sr-only">Cost</label>
                                                <input type="text" className="form-control form-control-sm" name="cost"
                                                    id="cost" placeholder="Cost"
                                                    value={this.state.cost} 
                                                    onChange={this.handleInputChange} />
                                            </div>
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
                </div>

        )
    }
}
export default withContext(CreateClient);
