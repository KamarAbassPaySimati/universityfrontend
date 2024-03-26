import React from 'react';
import CardHeader from '../../../components/CardHeader';

const Agent = () => {
    return (
        <CardHeader
            activePath='Agents'
            paths={['Users']}
            pathurls={['users/agents']}
            header='Agent list'
            minHeightRequired={true}
            buttonText='Register Agent'
            navigationPath='/users/agents/onboard-agent'
            table={true}
        >
            <div>
                hello
            </div>
        </CardHeader>
    );
};

export default Agent;
