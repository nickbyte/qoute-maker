import React, { Component } from "react";
import { saveAs } from "file-saver";
import logo from "./logo.png";
import logo_inverted from "./logo_inverted.png";
import "./App.css";
import htmlToImage from "html-to-image";
import { Textfit } from "react-textfit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'Welcome to the qoute-maker',
      qoute: "a quicktool to make social media posts",
      author: "Made by Nicholas Francis",
      color:"#2a2a2a",
      background:"#fff",
      image:'',
      titleSize:22,
      width:640,
      height:640,
      percentage:40,
      authorSize:16,
      qouteSize:12,
      invertedLogo:false,
      fontFamily:'Special Elite'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  
  handleSubmit() {
    htmlToImage.toBlob(document.getElementById("qoute")).then(function (blob) {
      saveAs(blob, "dw_" + Date.now() + ".png");
    });
  }
  handleChange(input) {
    let { name, value } = input.target;
    console.log(name,value);
    if(name == 'image') {
      this.setState({ [name]: URL.createObjectURL(input.target.files[0]) });
    } else {
      this.setState({ [name]: value });
    }
  }
  handleCheck(input) {
    let { name, checked } = input.target;
    this.setState({ [name]: checked });
  }
  setFontfamily(){

  }
  render() {
    return (
      <div className="App">
        <div className="form">
          <h2>Qoute maker</h2>
          <div className="form-group">
            <label>Font Family</label>
            <select name="fontfamily" defaultValue={this.state.fontFamily} onChange={this.handleChange}>
              <option value="Special Elite" selected={this.state.fontFamily == 'Special Elite'}>Special Elite</option>
              <option value="Fjalla One" selected={this.state.fontFamily == 'Fjalla One'}>Fjalla One</option>
            </select>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" onChange={this.handleChange} />
            <input type="text" name="titleSize" value={this.state.titleSize} onChange={this.handleChange}  style={{width:28}}/>
          </div>
          <div className="form-group">
            <label>Qoute</label>
            <textarea name="qoute" cols="3" onChange={this.handleChange} />
            <input type="text" name="qouteSize" value={this.state.qouteSize} onChange={this.handleChange}  style={{width:28}}/>

          </div>
          <div className="form-group">
            <label>Author</label>
            <input type="text" name="author" onChange={this.handleChange} />
            <input type="text" name="authorSize" value={this.state.authorSize} onChange={this.handleChange}  style={{width:28}}/>
          </div>
          <div className="form-group">
            <label>Text Color</label>
            <input type="color" name="color" onChange={this.handleChange} value={this.state.color}/>
          </div>
          <div className="form-group">
            <label>upload</label>
            <input type="file" name="image" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>image width</label>
            <input type="text" name="percentage" onChange={this.handleChange} value={this.state.percentage} />
          </div>
          <div className="form-group">
            <label>Background</label>
            <input type="color" name="background" onChange={this.handleChange} value={this.state.background} />
          </div>
          <div className="form-group">
            <label>Inverted Logo</label>
            <input type="checkbox" name="invertedLogo" onChange={this.handleCheck} />
          </div>
          <div className="form-group">
            <button onClick={this.handleSubmit}>Download Image</button>
          </div>
        </div>
          <div id="qoute" style={{background:this.state.background, width:this.state.width, height:this.state.height, fontFamily:this.state.fontFamily+" !important"}}>
           <div className="qoute-container">
           {this.state.title ? <Textfit mode="multi" min={parseInt(this.state.titleSize)}>
              <p className="qoute" style={{color:this.state.color, fontFamily:this.state.fontFamily}}>
                {this.state.title}
              </p>
            </Textfit> : null }
           {this.state.image ? <img src={this.state.image} width={this.state.percentage+"%"}/> : null }
            <Textfit mode="multi" min={parseInt(this.state.qouteSize)}>
              <p className="qoute" style={{color:this.state.color, fontFamily:this.state.fontFamily}}>
                {this.state.qoute}
                <span className="author" style={{fontSize:this.state.authorSize}}>
                  <strong>{this.state.author}</strong>
                </span>{" "}
              </p>
            </Textfit>
            <div className="logo-container">
              <img
                src={this.state.invertedLogo ? logo_inverted : logo}
                className="logo"
              />
            </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
