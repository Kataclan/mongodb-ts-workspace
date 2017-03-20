import * as React from 'react';
import { Styles } from '../styles/AppStyles';

export var GoFooter = (onClick: () => void) => {
    return (
        <div id="footer" style={Styles.Footer.inlineStyle}>
            <span style={Styles.Footer.spanStyle} onClick={() => { onClick(); }}>GO</span>
        </div>
    );
}