import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  Row
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faCertificate } from '@fortawesome/free-solid-svg-icons'

const defaultLabel = 'Choisissez un fichier'

class PdfFileForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fileLabel: defaultLabel,
      invalid: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const files = event.target.files
    this.setState({
      fileLabel: files.length > 0 ? files[0].name : defaultLabel,
      invalid: files.length === 0
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.state.invalid) {
      this.props.handleSubmit(event)
    }
  }

  render () {
    return (
      <Card>
        <CardHeader>
          Chargement PDF
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs='8' sm='8' md='auto'>
                <FormGroup>
                  <CustomInput
                    type="file"
                    label={this.state.fileLabel}
                    id="aem"
                    name="aem"
                    onChange={this.handleChange}
                    invalid={this.state.invalid}
                  />
                  <FormFeedback tooltip>Le fichier PDF est obligatoire</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs='4' sm='4' md='3'>
                <Button color='primary' block>
                  <FontAwesomeIcon icon={faFilePdf} /> Analyser
                </Button>
              </Col>
              <Col xs='5' sm='5' md='4' lg='3'>
                <Button
                  color='secondary'
                  block
                  onClick={this.props.handleClick}
                >
                  <FontAwesomeIcon icon={faCertificate} /> AEM temporaire
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default PdfFileForm