import React from 'react'
import { Rating } from '@mui/material'
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const Ratings = ({ value, text, color }) => {
    return (
        <div>
            <Rating value={Number(value)} 
                readOnly
            /> {text && <Box sx={{ ml: 2 }}>{text}</Box>}
        </div>
    )

}
Ratings.defaultProps = {
    color: "#FF0000"
}


export default Ratings
