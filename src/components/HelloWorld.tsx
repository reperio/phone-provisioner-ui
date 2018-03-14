import React from 'react'

export class HelloWorld extends React.Component {
    state = {
        test: 0,
        test2: 'this is a test'
    };

    handleClick = () => {
        this.state.test = this.state.test + 1;
        this.forceUpdate();
    }

    handleClick2 = () => {
        this.setState({test: this.state.test + 1});
    }

    render() {
        return (
            <div>
                <h2>Test App -- {this.state.test}</h2>
                <h2>{this.state.test2}</h2>

                <button className="btn" type="button" onClick={this.handleClick}>Test</button>
                <button type="button" onClick={this.handleClick2}>Test 2</button>
            </div>
        );
    }
}