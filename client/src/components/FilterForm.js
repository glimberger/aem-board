import React, {Component} from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const formatDate = (date) => {
  const d = (date.getDate() > 9 ? '' : '0') + date.getDate()
  const m = (date.getMonth() > 9 ? '' : '0') + (date.getMonth()+1)
  const y = '' + date.getFullYear()

  return y+'-'+m+'-'+d
}

class FilterForm extends Component {

  constructor (props) {
    super(props)

    this.state = {
      startDate: '',
      endDate: formatDate(new Date(Date.now()))
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({[name]: value})
    this.props.filter(this.state.startDate, this.state.endDate)
  }

  render() {
    return(
      <div className='mb-3'>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="startDate" className="mr-sm-2">
              <FontAwesomeIcon icon={faFilter} />&nbsp;&nbsp;Du
            </Label>
            <Input
              type="date"
              name="startDate"
              id="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
              onBlur={this.handleChange}
              onClick={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="endDate" className="mr-sm-2">au</Label>
            <Input
              type="date"
              name="endDate"
              id="endDate"
              value={this.state.endDate}
              onChange={this.handleChange}
              onBlur={this.handleChange}
              onClick={this.handleChange}
            />
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default FilterForm