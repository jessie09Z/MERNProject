import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileEducation = ({ education }) => {
    if (!education || Object.keys(education).length === 0) {
        return <p>No education details available</p>;
    }

    const { school, degree, fieldofstudy, to, from, description } = education;

    return (
        <div>
            <h3 className="text-dark">{school || 'N/A'}</h3>
            <p>
            {from ? <Moment format="YYYY-MM-DD">{from}</Moment> : "N/A"} - 
            {to ? <Moment format="YYYY-MM-DD">{to}</Moment> : "Now"}
            </p>
            <p>
                <strong>Degree: </strong> {degree || 'N/A'}
            </p>
            <p>
                <strong>Field Of Study: </strong> {fieldofstudy || 'N/A'}
            </p>
            <p>
                <strong>Description: </strong> {description || 'N/A'}
            </p>
        </div>
    );
};

ProfileEducation.propTypes = {
    education:PropTypes.object.isRequired,
};

ProfileEducation.defaultProps = {
    education: {}
};

export default ProfileEducation;
