import React, { Component } from 'react'
import { Container } from 'reactstrap'
import {withRouter} from 'react-router-dom'

import PdfFileForm from './PdfFileForm'

class PdfContainer extends Component {
  constructor (props) {
    super(props)

    this.handleFileSubmit = this.handleFileSubmit.bind(this)
  }

  componentDidMount() {
    this.props.setAem({})
  }

  handleFileSubmit (event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    fetch('http://localhost:3000/pdf', {
      method: 'POST',
      body: formData
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        const {id} = data
        this.props.changeActionToEdit()
        this.props.setAem(data)
        this.props.history.push('/aem/'+id)
      })
      .catch(err => {console.error(err)})
  }

  render () {
    return (
      <Container className='my-3'>
        <PdfFileForm handleSubmit={this.handleFileSubmit}/>
      </Container>
    )
  }
}

export default withRouter(PdfContainer)