import React from 'react';
import NotFound from '../pages/NotFound';
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
                <NotFound />
            </>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
