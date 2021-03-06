import React from 'react'

interface IComponentProps {
    base?: boolean;
}

const ConfigHeader = (props: IComponentProps) => (
    <div className={'row'}>
        <div className={'col-sm-2'}><h4>{props.base ? 'Enable?' : 'Override?'}</h4></div>
        <div className={'col-sm-6'}><h4>Property</h4></div>
        <div className={'col-sm-4'}><h4>Origin</h4></div>
    </div>
);

export default ConfigHeader;