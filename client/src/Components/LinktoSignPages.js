import React from 'react'
import {Link} from 'react-router-dom'

const LinktoSignPages = ({text, route, routeContext}) => {
    
    return (
        <div style={{ display: 'flex', columnGap: '5px' }}>
            <span style={{ fontSize: '12px' }}>
                {text}
            </span>
            <Link className='login-link' to={route} style={{ fontSize: '12px' }}>
                {routeContext}
            </Link>
        </div>
    )
}

export default LinktoSignPages;