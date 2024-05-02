const { getAgentPayload } = require('../../bdd_payload/index');
const { createAgentAccount } = require('../../bdd_api/index');
const { Before } = require('@cucumber/cucumber');

Before('@register_new_agent', async function () {
    try {
        global.agent_registration_payload = await getAgentPayload();
        global.agent_registration_response = await createAgentAccount(global.agent_registration_payload);
    } catch (error) {
        console.log('Registration of agent failed', error);
    }
});
