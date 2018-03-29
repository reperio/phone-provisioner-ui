import React from 'react'

export class PassPropsToChildren extends React.Component<any, any> {
    render() {
        if(!this.props.children) return (<div></div>);
        let propsWithoutChildren:any = Object.assign({}, this.props);
        propsWithoutChildren.children = null;
        return React.Children.map(this.props.children, (child: React.ReactElement<any>) => React.cloneElement(child, propsWithoutChildren));
    }
}