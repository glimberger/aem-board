import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Menu from './components/Menu'
import PdfContainer from './components/PdfContainer'
import AemContainer from './components/AemContainer'
import ListContainer from './components/ListContainer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state= {
      action: 'VIEW',
      aem: {}
    }
    this.changeActionToEdit = this.changeActionToEdit.bind(this)
    this.changeActionToView = this.changeActionToView.bind(this)
    this.setAem = this.setAem.bind(this)
    this.resetAem = this.resetAem.bind(this)
  }


  changeActionToView() {
    this.setState({action: 'VIEW'})
  }

  changeActionToEdit() {
    this.setState({action: 'EDIT'})
  }

  setAem(data) {
    const {path, url, id, firm, startDate, endDate, hours, days, salary} = data
    this.setState({
      aem: {
        path,
        url,
        id,
        firm,
        startDate,
        endDate,
        hours,
        days,
        salary
      }
    })
  }

  resetAem() {
    this.setState({aem: {}})
  }

  render () {
    const {action, aem} = this.state

    const PdfContainerWithProps = () => <PdfContainer
      action={action}
      changeActionToEdit={this.changeActionToEdit}
      setAem={this.setAem}
    />
    const AemContainerWithProps = () => <AemContainer
      action={action}
      aem={aem}
      changeActionToView={this.changeActionToView}
      changeActionToEdit={this.changeActionToEdit}
      resetAem={this.resetAem}
    />

    return (
      <div className="App">
        <Menu />
        <Route exact path="/" render={PdfContainerWithProps} />
        <Route path="/aem/:id" render={AemContainerWithProps} />
        <Route path="/liste" component={ListContainer}/>
      </div>
    )
  }
}

export default App
