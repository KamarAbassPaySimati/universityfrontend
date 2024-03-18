import React from 'react';
class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError () {
        return { hasError: true };
    }

    render () {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <>
                <h1 className="text-center font-bold text-[100px]">Something went wrong.</h1>
            </>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
