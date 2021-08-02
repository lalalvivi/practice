import React, { memo } from 'react'
import { Link } from 'react-router-dom'

export default memo(function Sider() {
    return (
        <div className="route">
            <Link to="/canvas">canvas</Link>
            <Link to="/webgl">webgl</Link>
        </div>
    )
})