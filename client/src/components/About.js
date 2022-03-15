import React from 'react';
import { useParams } from 'react-router-dom';
const About = () => {
    let params = useParams()
    return (
        <div>About works! {params.id}</div>
    );
};

export default About;
