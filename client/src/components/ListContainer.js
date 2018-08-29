import React, { Component } from 'react'
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row
} from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faClock,
  faMoneyBillWave,
  faCertificate,
  faBookmark,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

import FilterForm from './FilterForm'

const formatDate = (date) => {
  const d = (date.getDate() > 9 ? '' : '0') + date.getDate()
  const m = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1)
  const y = '' + date.getFullYear()

  return d + '/' + m + '/' + y
}

class ListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      aems: [],
      filter: {
        startDate: '',
        endDate: '',
        orderBy: 'ASC'
      }
    }
    this.handleClick = this.handleClick.bind(this)
    this.filter = this.filter.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentWillMount () {
    fetch('http://localhost:3000/aem')
      .then(res => res.json())
      .then(aems => {
        this.setState({aems})
      })
      .catch(err => {console.error(err)})
  }

  handleClick (id) {
    this.props.history.push('/aem/' + id)
  }

  filter (startDate, endDate, orderBy) {
    this.setState({
      filter: {startDate, endDate, orderBy}
    })

    fetch('http://localhost:3000/aem?order=' + orderBy)
      .then(res => res.json())
      .then(aems => {
        this.setState({aems})
      })
      .catch(err => {console.error(err)})
  }

  handleRemove (id) {
    fetch('http://localhost:3000/aem/' + id, {method: 'DELETE'})
      .then(() => {
        fetch('http://localhost:3000/aem')
          .then(res => res.json())
          .then(aems => {
            this.setState({aems})
          })
          .catch(err => {console.error(err)})
      })
      .catch(err => {console.error(err)})
  }

  render () {
    let {aems} = this.state
    const {startDate, endDate} = this.state.filter

    return (
      <div>
        <Container className='my-3'>
          <FilterForm filter={this.filter}/>
          <ListGroup>
            {aems
              .filter(aem => {

                // filter form is empty
                if (startDate === '') return true

                const filterStart = new Date(startDate)
                const filterEnd = new Date(endDate)
                const aemStart = new Date(aem.startDate)
                const aemEnd = new Date(aem.endDate)

                console.log(
                  '%s >= %s : %s | %s <= %s : %s',
                  formatDate(aemStart),
                  formatDate(filterStart),
                  aemStart >= filterStart,
                  formatDate(aemEnd),
                  formatDate(filterEnd),
                  aemEnd <= filterEnd
                )

                return (aemStart >= filterStart) && (aemEnd <= filterEnd)
              })
              .map(aem => {
                const startDate = formatDate(new Date(aem.startDate))
                const endDate = formatDate(new Date(aem.endDate))

                return (
                  <ListGroupItem key={aem.id} action>
                    <ListGroupItemHeading>
                      <Row>
                        <Col>
                          <FontAwesomeIcon icon={faBookmark}/>
                          {' '}
                          {aem.firm}
                        </Col>
                        <Col>
                          <FontAwesomeIcon icon={faCalendarAlt}/>
                          {' '}
                          <span className='small text-monospace'>
                            {startDate} → {endDate} [<strong>{aem.days}j</strong>]
                          </span>
                        </Col>
                        <Col xs='auto'>
                          <Button outline color="secondary" size="sm" onClick={() => this.handleClick(aem.id)}>
                            <FontAwesomeIcon icon={faCertificate}/>
                            {' '}
                            {aem.id}
                          </Button>
                          {' '}
                          <Button outline color="danger" size="sm" onClick={() => this.handleRemove(aem.id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItemHeading>
                    <Row>
                      <Col>
                        <ListGroupItemText className='mb-0'>
                          <FontAwesomeIcon icon={faClock}/>
                          {' '}
                          {aem.hours} h
                        </ListGroupItemText>
                      </Col>

                      <Col>
                        <ListGroupItemText className='mb-0'>
                          <FontAwesomeIcon icon={faMoneyBillWave}/>
                          {' '}
                          {aem.salary} €
                        </ListGroupItemText>
                      </Col>
                      <Col xs='auto'>
                        <Button outline color="secondary invisible" size="sm">
                          <FontAwesomeIcon icon={faCertificate}/>
                          {' '}
                          {aem.id}
                        </Button>
                        {' '}
                        <Button outline color="danger invisible" size="sm">
                          <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )
              })}
          </ListGroup>
        </Container>
      </div>
    )
  }
}

export default withRouter(ListContainer)