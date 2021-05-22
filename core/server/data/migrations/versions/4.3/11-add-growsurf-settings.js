const logging = require('../../../../../shared/logging');
const {createTransactionalMigration} = require('../../utils');

module.exports = createTransactionalMigration(

    async function up(connection) {
        logging.info('Updating GrowSurf settings -  growsurf, growsurf_api_key, growsurf_campaign_id');
        await connection('settings')
            .whereIn('key', ['growsurf', 'growsurf_api_key', 'growsurf_campaign_id'])
            .update({
                group: 'growsurf'
            });
    },

    async function down() { }
);
