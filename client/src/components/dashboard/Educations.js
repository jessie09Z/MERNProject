import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from "react-moment"

const Educations = ({education}) => {
const educations=education.map(
    ed=>(
        <tr key={ed._id}>
            <td>{ed.school}</td>
            <td className='hide-sm'>{ed.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{ed.from}</Moment> -{
                    ed.to===null?("NOW"):(  <Moment format="YYYY/MM/DD">{ed.to}</Moment>)
                }
            </td>
            <td>
                <button className='btn btn-danger'>DELETE</button>
            </td>
        </tr>
    )
)

  return (
   <Fragment>
    <h2 className='my-2'>Education Credentials</h2>
   <table className='table'>
<thead>
    <tr>
        <th>School</th>
        <th className='hide-sm'>Degree</th>
        <th className='hide-sm'>Years</th>
        <th/>
    </tr>
</thead>
<tbody>
{educations}
</tbody>
   </table>

   </Fragment>
  )
}

Educations.propTypes = {
    education:PropTypes.array.isRequired,

}

export default connect(null, )(Educations)
