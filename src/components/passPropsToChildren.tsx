import React from 'react'

export class PassPropsToChildren extends React.Component<any, any> {
    render() {
        if(!this.props.children) return (<div></div>);
        let propsWithoutChildren:any = Object.assign({}, this.props);
        //Don't pass this component's children to themselves
        delete propsWithoutChildren.children;
        return React.Children.map(this.props.children, (child: React.ReactElement<any>) => child && React.cloneElement(child, propsWithoutChildren));
    }
}