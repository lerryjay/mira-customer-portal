import React, { Component } from "react";
import { HTTPURL, APIKEY } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import ApiLogTable from "./apilogtable";
import Paginated from "./pagination";
import DisplayCards from "./displaycards";
import FilterModal from "./filtermodal"

class api_logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ...this.props,
          userid: "",
          startdate: "",
          enddate: "",
          type: "",
          on: "",
          searchUser: "",
          clients: [],
          currentPage: 1,
          numberPerPage: 10,
          totalLists: [ ],
          pageNumbers: [],
          currentLists: [],
          deploymentid: '',
          totalapi : 0 ,
          errorapi : 0,
          sucessapi : 0,
          cancelledapi : 0,
          isloading: true,
        };
      }
    
      async componentDidMount() {
        this.state.showLoader();
        await this.getLogs();
        await this.getApiStatistics();
        this.state.hideLoader();
      }

      handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "searchUser") {
          let client = this.state.users.find(
            (item) => item.firstname + " " + item.lastname == value
          );
          if (client == null)
            client = this.state.clients.find((item) => item.businessname == value);
          if (client) this.state.userid = client.userid || client.user_id;
        }
        this.setState({ [name]: value });
      };

      async getLogs() {

        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
                
        const res = await fetch(
          HTTPURL + `log/list?userid=${this.state.user.userid}`,
          {
            method: "GET",
            headers: headers,
          }
        ).then((response) => response.json());
    
        if (res["status"]){
           this.setState({ totalLists: res["data"], 
           isloading: false });
           this.getPageNo();

          }
        }
      
        async getPageNo() {
          const { currentPage, numberPerPage } = this.state;
      
          const headers = new Headers();
          headers.append("API-KEY", APIKEY);
          await fetch(
            HTTPURL +
              `log/list?userid=${this.state.user.userid}&pageno=${currentPage}&limit=${numberPerPage}`,
            {
              method: "GET",
              headers: headers,
            }
          )
            .then((response) => response.json())
            .then((data) => {
              this.setState({currentLists: data.data})
            });
        }
      
      
        update = (newPage) => {   
            // Update page number
       
          const {numberPerPage} = this.state;
      
          const headers = new Headers();
          headers.append("API-KEY", APIKEY);
           fetch(
            HTTPURL +
              `log/list?userid=${this.state.user.userid}&pageno=${newPage}&limit=${numberPerPage}`,
            {
              method: "GET",
              headers: headers,
            }
          )
            .then((response) => response.json())
            .then((data) => {
              this.setState({currentLists: data.data})
            });
      
        };
      
        getpageLimit = (pagelimit) => {  
      
          this.setState({numberPerPage: pagelimit});
      
          const headers = new Headers();
          headers.append("API-KEY", APIKEY);
          fetch(
            HTTPURL +
              `log/list?userid=${this.state.user.userid}&limit=${pagelimit}`,
            {
              method: "GET",
              headers: headers,
            }
          )
            .then((response) => response.json())
            .then((data) => {
              this.setState({currentLists: data.data})
            });
        };

      async getApiStatistics()
{
  const headers = new Headers();
  headers.append('API-KEY', APIKEY);
  const res = await fetch(HTTPURL + `log/statistics?userid=${this.state.user.userid}`, {
      method: 'GET',
      headers: headers
  }).then(response => response.json());
  if (res['status']) this.setState({ totalapi: res['data']['total'],errorapi: res['data']['error'],cancelledapi :  res['data']['cancelled'],sucessapi : res['data']['success']});
}

      handleSearch = async (e) => {
        e.preventDefault();

        const { user, deploymentid, on, startdate, enddate} = this.state;
    
        const headers = new Headers();
        headers.append("API-KEY", APIKEY);
         await fetch(
          HTTPURL +
            `log/list/?userid=${user.userid}&deploymentid=${deploymentid}&on=${on}&startdate=${startdate}&enddate=${enddate}`,
          {
            method: "GET",
            headers: headers,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status) this.setState({ totalLists: data.data });
          });
      };
       

    
      render() {
        return (
          <div className="container">
            {!this.state.isloading && (
              <div>
                <DisplayCards 
                sucessapi={this.state.sucessapi}
                totalapi={this.state.totalapi}
                errorapi={this.state.errorapi}
                cancelledapi={this.state.cancelledapi} />
    
                <div className="row">
                  <div className="col-sm-12 box1 mb-3" id="profile">
                    {!this.state.loaderActive && this.state.totalLists === 0 ? (
                      <div className="alert alert-warning mt-5" role="alert">
                        <h6 className="text-center">No transaction records!</h6>
                      </div>
                    ) : (
                      <ApiLogTable
                        currentLists={this.state.currentLists}
                        role={this.state.user.role}
                      />
                    )}
    
                    {this.state.pageNumbers && (
                      <Paginated
                        numberPerPage={this.state.numberPerPage}
                        currentPage={this.state.currentPage}
                        totalLists={this.state.totalLists}
                        pageNumbers={this.state.pageNumbers}
                        currentLists={this.state.currentLists}
                        update={this.update}
                        getpageLimit={this.getpageLimit}
                      />
                    )}
                  </div>
    
                  <FilterModal
                  handleInputChange={this.handleInputChange}
                  users={this.state.users}
                  clients={this.state.clients}
                  />
                </div>
              </div>
            )}
          </div>
        );
  }
}

export default withContext(api_logs);
