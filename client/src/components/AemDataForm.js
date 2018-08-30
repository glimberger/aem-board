import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader, CardBody, Card,
  Col,
  InputGroup, InputGroupAddon
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faFilePdf, faEdit, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'

class AemDataForm extends Component {
  static onClick (url) {
    window.open(url, '_blank')
  }

  render () {
    const {aem, action} = this.props

    return (
      <Card>
        <CardHeader>
          <Button
            outline
            color='secondary'
            size='sm'
            className={'float-right' + (!aem.url ? ' d-none' : '')}
            onClick={() => AemDataForm.onClick(aem.url)}
            disabled={!aem.url}
          >
            <FontAwesomeIcon icon={faFilePdf} /> Voir le PDF
          </Button>
          <h5><FontAwesomeIcon icon={faCertificate} /> Fiche AEM</h5>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.props.handleSubmit}>
            <FormGroup row>
              <Label sm={3} for="aem-id">AEM n°</Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="id"
                  id="aem-id"
                  value={aem.id}
                  invalid={action === 'EDIT' && !aem.id}
                  readOnly={action === 'VIEW'}
                  placeholder='Identifiant'
                  onChange={this.props.handleChange}
                />
              </Col>
              <Col sm={4}>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} for="aem-firm">Raison sociale</Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="firm"
                  id="aem-firm"
                  value={aem.firm}
                  invalid={action === 'EDIT' && !aem.firm}
                  placeholder='Raison sociale'
                  readOnly={action === 'VIEW'}
                  onChange={this.props.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} for="aem-start-date">Date de début du contrat</Label>
              <Col sm={5}>
                <Input
                  type="date"
                  name="startDate"
                  id="aem-start-date"
                  value={aem.startDate}
                  invalid={action === 'EDIT' && !aem.startDate}
                  placeholder="Date de début"
                  readOnly={action === 'VIEW'}
                  onChange={this.props.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} for="aem-end-date">Date de fin du contrat</Label>
              <Col sm={5}>
                <Input
                  type="date"
                  name="endDate"
                  id="aem-end-date"
                  value={aem.endDate}
                  invalid={action === 'EDIT' && !aem.endDate}
                  placeholder="Date de fin"
                  readOnly={action === 'VIEW'}
                  onChange={this.props.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} for="aem-hours">Nombre d'heures effectuées</Label>
              <Col sm={5}>
                <Input
                  type="number"
                  min='1'
                  name="hours"
                  id="aem-hours"
                  value={aem.hours}
                  invalid={action === 'EDIT' && !aem.hours}
                  placeholder="Nombre d'heures"
                  readOnly={action === 'VIEW'}
                  onChange={this.props.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} for="aem-days">Nombre de jours travaillés</Label>
              <Col sm={5}>
                <Input
                  type="number"
                  min='1'
                  name="days"
                  id="aem-days"
                  value={aem.days}
                  invalid={action === 'EDIT' && !aem.days}
                  placeholder="Nombre de jours"
                  readOnly={action === 'VIEW'}
                  onChange={this.props.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} for="aem-salary">Salaire</Label>
              <Col sm={5}>
                <InputGroup>
                  <Input
                    type="number"
                    min='1'
                    step='0.01'
                    name="salary"
                    id="aem-salary"
                    value={aem.salary}
                    invalid={action === 'EDIT' && !aem.salary}
                    placeholder="Salaire"
                    readOnly={action === 'VIEW'}
                    onChange={this.props.handleChange}
                  />
                  <InputGroupAddon addonType="append">€</InputGroupAddon>
                </InputGroup>
              </Col>
            </FormGroup>
            <Input type='hidden' name='url' value={aem.url}/>
            <Input type='hidden' name='path' value={aem.path}/>
            <Button
              color='primary'
              className={'float-right ml-1' + (action === 'EDIT' ? ' d-none' : '')}
              onClick={this.props.handleEdit}
            >
              <FontAwesomeIcon icon={faEdit} /> Modifier
            </Button>
            <Button
              color='primary'
              type='submit'
              className={'float-right ml-1' + (action === 'VIEW' ? ' d-none' : '')}
            >
              <FontAwesomeIcon icon={faSave} /> Enregistrer les données
            </Button>
            <Button
              outline color="secondary"
              type='button'
              className={'float-right' + (action === 'VIEW' || !aem.url ? ' d-none' : '')}
              onClick={this.props.handleCancel}
            >
              <FontAwesomeIcon icon={faUndo} /> Annuler
            </Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default AemDataForm