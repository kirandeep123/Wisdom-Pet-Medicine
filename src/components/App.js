import React from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import {findIndex,without} from 'lodash';
import { template } from '@babel/core';

class App extends React.Component {

  constructor(){
    super();
    this.state ={
      myappointments:[],
      formDisplay:false,
      orderBy:'ownerName',
      queryText:'',
      orderDir:'desc',
      lastIndex:0 
    }
    this.deleteAppointment =this.deleteAppointment.bind(this);
    this.toggleForm =this.toggleForm.bind(this);
    this.addAppointment =this.addAppointment.bind(this);
    this.changeOrder =this.changeOrder.bind(this);
    this.searchItem=this.searchItem.bind(this);
    this.updateInfo =this.updateInfo.bind(this);

  }

  componentDidMount(){
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
        const apts =result.map(item =>{
          item.aptId =this.state.lastIndex;
          this.setState( {lastIndex :this.state.lastIndex +1})
          return item;
        })

        this.setState({
          myappointments:apts
        })
    })
  }

  deleteAppointment(apt){
    let tempApts =this.state.myappointments;
    tempApts =without(tempApts,apt)

    this.setState({myappointments :tempApts})
  }

  updateInfo(name,value,id){
 let tempAlpts = this.state.myappointments;
 let aptIndex = findIndex(this.state.myappointments,{
          aptId:id
 });
      tempAlpts[aptIndex][name] =value; 
      this.setState({myappointments:tempAlpts})


  }
  changeOrder(order,dir){
  this.setState({
    orderBy:order,
    orderDir:dir
  })  }

  addAppointment(apt){
    let apts =this.state.myappointments;
    apt.aptId =this.state.lastIndex;
    apts.unshift(apt);
    this.setState({myappointments :apts,
      lastIndex: this.state.lastIndex+1
    })
  }

  searchItem(manual){
    this.setState({
      queryText:manual
    });
  }
  toggleForm(){
    this.setState({formDisplay:!this.state.formDisplay})
  }
  
  render(){

      let order;
      let filteredApts = this.state.myappointments;
      // if(this.state.orderDir==='asc')
      // order =1;
      // else 
      // order=-1; 
      {this.state.orderDir==='asc' ?order=1 :order=-1}

   filteredApts=   filteredApts.sort( (a,b) =>{
          if(a[this.state.orderBy].toLowerCase() <  b[this.state.orderBy].toLowerCase()){
            return -1 * order;
          }
          else{
            return 1*order; 
          }
      })
      .filter( item => {
        return (
        item['petName'].toLowerCase()
        .includes(this.state.queryText.toLowerCase()) ||  
        item['ownerName'].toLowerCase()
        .includes(this.state.queryText.toLowerCase()) ||
        item['aptNotes'].toLowerCase()
        .includes(this.state.queryText.toLowerCase())
      );
      });

  return (
    <main className="page bg-white" id="petratings">
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="container">
          <AddAppointments formDisplay ={this.state.formDisplay} toggleForm ={this.toggleForm} addAppointment ={this.addAppointment} />
          <SearchAppointments orderBy ={this.state.orderBy} orderDir ={this.state.orderDir} changeOrder ={this.changeOrder} searchItem={this.searchItem}/>
          <ListAppointments appointments ={filteredApts} deleteAppointment ={this.deleteAppointment} updateInfo={this.updateInfo}/>
          </div>
        </div> 
      </div>
    </div> 
  </main>
  );
}
}
export default App;
