//#region [ Import React ]
import * as React from 'react';
//#endregion
//#region

export var MoreInfoNode = (text: string) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <InfoIcon /> <span>{text}</span>
        </div>
    );
}