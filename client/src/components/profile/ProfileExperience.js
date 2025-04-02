import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileExperience = ({ experience }) => {
    // 判断 experience 是否为空
    if (!experience || Object.keys(experience).length === 0) {
        return ;
    }

    const { company, title, location, current, to, from, description } = experience;

    return (
        <div>
            <h3 className="text-dark">{company || 'N/A'}</h3>
            <p>
                {from ? <Moment format="YYYY-MM-DD">{from}</Moment> : "N/A"} - 
                {to ? <Moment format="YYYY-MM-DD">{to}</Moment> : (current ? "Now" : "N/A")}
            </p>
            <p>
                <strong>Position: </strong> {title || 'N/A'}
            </p>
            <p>
                <strong>Location: </strong> {location || 'N/A'}
            </p>
            <p>
                <strong>Description: </strong> {description || 'N/A'}
            </p>
        </div>
    );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

ProfileExperience.defaultProps = {
  experience: {}
};

export default ProfileExperience;