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
            navigationPath='/users/agents/register-agent'
        >
            <div>

            </div>
        </CardHeader>
    );
};

export default Agent;
