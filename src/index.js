import FormContainer from "./components/test";
import React, { Component } from "react";
import ReactDOM from "react-dom";

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
