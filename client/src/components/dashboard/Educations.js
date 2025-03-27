import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from "react-moment"
import { deleteEducation } from '../../actions/profile'

const Educations = ({education,deleteEducation}) => {
    const educationList=education || [];
    
const educations=educationList.map(
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
                <button className='btn btn-danger' onClick={()=>{deleteEducation(ed._id)}} >DELETE</button>
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
    deleteExperience:PropTypes.func.isRequired,

}

const mapStateToProps=(state)=>({
   
    education:state.profile?.profile?.education || []
   
   });
export default connect(mapStateToProps,{deleteEducation} )(Educations)
