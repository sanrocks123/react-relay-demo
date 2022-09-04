
import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error.toString().replace("Error:", ""),
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    {/** 
                    <p>Oops! Something went wrong here</p>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                    </details>
                    */
                    }
                    <ErrorComponent error={this.state.error} />
                </div>
            );
        }
        return this.props.children;
    }
}

export function ErrorComponent(props) {
    const error = JSON.parse(props.error);
    return (
        <>
            <code><p>{error.errors[0].message}</p></code>
        </>
    );
}