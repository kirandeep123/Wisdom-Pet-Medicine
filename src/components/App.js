import React from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';


class App extends React.Component {

  constructor(){
    super();
    this.state ={
      myappointments:[]
    }
  }

  componentDidMount(){
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
        const apts =result.map(item =>{
          return item;
        })

        this.setState({
          myappointments:apts
        })
    })
  }
  
  render(){
  return (
    <main className="page bg-white" id="petratings">
    <div className="container">
      <div cclassNamelass="row">
        <div className="col-md-12 bg-white">
          <div className="container">
          {this.state.myName}
          <AddAppointments/>
          <SearchAppointments/>
          <ListAppointments/>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}
}
export default App;
