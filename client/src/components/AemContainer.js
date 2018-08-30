import React, { Component } from 'react'
import { Container } from 'reactstrap'
import {withRouter} from 'react-router-dom'

import AemDataForm from './AemDataForm'

class AemContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      aem: {}
    }
    this.handleDataFormSubmit = this.handleDataFormSubmit.bind(this)
    this.handleDataFormCancel = this.handleDataFormCancel.bind(this)
    this.handleEditForm = this.handleEditForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.props.aem.id) {
      this.setState({aem: this.props.aem})
    }
    else {
      const {id} = this.props.match.params

      fetch('http://localhost:3000/aem/' + id)
        .then(res => res.json())
        .then(aem => this.setState({aem}))
        .catch(err => console.error(err))
    }
  }

  handleDataFormSubmit (event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    for (let [key, value] of formData.entries()) {
      if (key !== 'url' && key !== 'path' && !value) {
        console.error('Invalid form!')
        return
      }
    }

    fetch('http://localhost:3000/aem', {
      method: 'POST',
      body: new URLSearchParams([...formData.entries()])
    })
      .then(res => res.json())
      .then(() => {
        this.props.changeActionToView()
        this.props.resetAem()
        this.props.history.push('/liste/')
      })
      .catch(err => {console.error(err)})
  }

  handleDataFormCancel () {

    if (this.props.aem.id) {
      this.props.resetAem()
      this.props.history.push('/')
    }
    else {
      this.props.changeActionToView()
    }
  }

  handleEditForm() {
    this.props.changeActionToEdit()
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      aem: {
        ...this.state.aem,
        [name]: value
      }
    })
  }

  render () {
    const {action} = this.props
    const {aem} = this.state
      return (
        <Container className='my-3'>
        <AemDataForm
          aem={aem}
          action={action}
          handleSubmit={this.handleDataFormSubmit}
          handleCancel={this.handleDataFormCancel}
          handleEdit={this.handleEditForm}
          handleChange={this.handleChange}
        />
        </Container>
      )
  }
}

export default withRouter(AemContainer)