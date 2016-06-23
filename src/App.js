import React, { Component } from 'react';
import d3 from 'd3';
import $ from "jquery";

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      mindmaps: []
    }
  }

  signIn() {
  //   response = RestClient.post( auth_url , email: 'admin@test.com', password: "trycatch", password_confirmation: "trycatch")
  // selected_headers = response.headers.slice( :access_token , :token_type, :client, :expiry, :uid)
    const host2 = "ideas-test-api.herokuapp.com";
    const host = "localhost:3002";
    const auth_url = "http://admin:trycatch@" + host + "/auth/sign_in";
    const username = "admin";
    const password = "trycatch";

    $.post({
      beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password)); },
      url: auth_url,
      type: "POST",
      dataType: 'json',
      data: {
        email: "admin@test.com",
        password:"trycatch",
        password_confirmation: "trycatch"
      },
      error: function (err) {
      console.log(err);
      },
      success: function (resp) {
         console.log("hello");
         console.log(resp);
         console.log(resp.getResponseHeader("Access-Token"));
      }
    });
  }


  componentDidMount() {
    this.signIn();
  }

  requestMindmaps(){
    const host2 = "ideas-test-api.herokuapp.com";
    const old_url = this.props.source;
    const host = "localhost:3002";
    const url = "http://admin:trycatch@" + host + "/api/v1/mindmaps";

    $.get({
      url: url,
      type: "GET",
      dataType: 'json',
      data: {},
      error: function (err) {
      },
      success: function (resp) {
         console.log("hello");
         console.log(resp);
      }
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div>
        <h1>Hello, world.</h1>
          <p className="lead"> { this.state.mindmaps } </p>
      </div>

    );
  }
}

export default App;


