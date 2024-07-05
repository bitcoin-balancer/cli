/* eslint-disable no-template-curly-in-string */

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

/**
 * Generates the content for the logging system (local driver).
 * @returns string
 */
const __generateLogging = (): string => {
  let _ = '\t\tlogging:';
  _ += '\t\tdriver: local';
  _ += '\t\toptions:';
  _ += '\t\t\tmax-size: "10m"';
  _ += '\t\t\tmax-file: "10"';
  _ += '\t\t\tcompress: "true"';
  return _;
};





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Generates the content for the postgres service.
 * @returns string
 */
const generatePOSTGRESService = (): string => {
  let _ = '\tpostgres:';
  _ += '\t\tcontainer_name: balancer-postgres';
  _ += '\t\timage: postgres:16.3-alpine3.20';
  _ += '\t\trestart: always';
  _ += '\t\tuser: postgres';
  _ += '\t\tsecrets:';
  _ += '\t\t\t- POSTGRES_PASSWORD_FILE';
  _ += '\t\tenvironment:';
  _ += '\t\t\t- POSTGRES_USER=${POSTGRES_USER}';
  _ += '\t\t\t- POSTGRES_DB=${POSTGRES_DB}';
  _ += '\t\t\t- POSTGRES_PASSWORD_FILE=${POSTGRES_PASSWORD_FILE}';
  _ += '\t\tvolumes:';
  _ += '\t\t\t- pgdata:/var/lib/postgresql/data';
  _ += '\t\texpose:';
  _ += '\t\t\t- 5432:5432';
  _ += '\t\thealthcheck:';
  _ += '\t\t\ttest: [ "CMD", "pg_isready" ]';
  _ += '\t\t\tinterval: "10s"';
  _ += '\t\t\ttimeout: "5s"';
  _ += '\t\t\tretries: "5"';
  _ += __generateLogging();
  return _;
};

/**
 * Generates the content for the api service.
 * @param testMode
 * @param restoreMode
 * @returns string
 */
const generateAPIService = (testMode: boolean, restoreMode: boolean): string => {
  let _ = '\tapi:';
  _ += '\t\tcontainer_name: balancer-api';
  _ += '\t\tbuild:';
  _ += '\t\t\tcontext: ../api';
  _ += '\t\t\targs:';
  _ += '\t\t\t\t- NODE_ENV=${NODE_ENV}';
  _ += '\t\timage: jesusgraterol/balancer-api:latest';
  _ += '\t\tports:';
  _ += '\t\t\t- 5075:5075';
  _ += '\t\tsecrets:';
  _ += '\t\t\t- POSTGRES_PASSWORD_FILE';
  _ += '\t\t\t- ROOT_ACCOUNT';
  _ += '\t\t\t- TELEGRAM';
  _ += '\t\tenvironment:';
  _ += '\t\t\t- NODE_ENV=${NODE_ENV}';
  _ += `\t\t\t- TEST_MODE=${testMode}`;
  _ += `\t\t\t- RESTORE_MODE=${restoreMode}`;
  _ += '\t\t\t- API_PORT=5075';
  _ += '\t\t\t- POSTGRES_HOST=${POSTGRES_HOST}';
  _ += '\t\t\t- POSTGRES_USER=${POSTGRES_USER}';
  _ += '\t\t\t- POSTGRES_DB=${POSTGRES_DB}';
  _ += '\t\t\t- POSTGRES_PORT=5432';
  _ += '\t\t\t- POSTGRES_PASSWORD_FILE=${POSTGRES_PASSWORD_FILE}';
  _ += '\t\t\t- ROOT_ACCOUNT=${ROOT_ACCOUNT}';
  _ += '\t\t\t- TELEGRAM=${TELEGRAM}';
  _ += '\t\tdepends_on:';
  _ += '\t\t\tpostgres:';
  _ += '\t\t\t\tcondition: service_healthy';
  _ += __generateLogging();
  return _;
};

/**
 * Generates the content for the gui service.
 * @returns string
 */
const generateGUIService = (): string => {
  let _ = '\tgui:';
  _ += '\t\tcontainer_name: balancer-gui';
  _ += '\t\tbuild:';
  _ += '\t\t\tcontext: ../gui';
  _ += '\t\t\targs:';
  _ += '\t\t\t\t- NODE_ENV=${NODE_ENV}';
  _ += '\t\timage: jesusgraterol/balancer-gui:latest';
  _ += '\t\tports:';
  _ += '\t\t\t- 8090:8090';
  _ += '\t\tenvironment:';
  _ += '\t\t\t- NODE_ENV=${NODE_ENV}';
  _ += '\t\tdepends_on:';
  _ += '\t\t\t- api';
  _ += __generateLogging();
  return _;
};

/**
 * Generates the content for the cloudflare tunnel service.
 * @returns string
 */
const generateCLOUDFLAREDService = (): string => {
  let _ = '\tcloudflared:';
  _ += '\t\tcontainer_name: balancer-cloudflare-tunnel';
  _ += '\t\timage: cloudflare/cloudflared';
  _ += '\t\trestart: unless-stopped';
  _ += '\t\tcommand: tunnel run';
  _ += '\t\tenvironment:';
  _ += '\t\t\t- TUNNEL_TOKEN=${TUNNEL_TOKEN}';
  _ += __generateLogging();
  return _;
};

/**
 * Generates the content for the volumes.
 * @returns string
 */
const generateVolumes = (): string => {
  let _ = 'volumes:';
  _ += '\tpgdata:';
  _ += '\tpgdata-management:';
  return _;
};

/**
 * Generates the content for the secrets.
 * @returns string
 */
const generateSecrets = (): string => {
  let _ = 'secrets:';
  _ += '\tPOSTGRES_PASSWORD_FILE:';
  _ += '\t\tfile: secrets/POSTGRES_PASSWORD_FILE.txt';
  _ += '\tROOT_ACCOUNT:';
  _ += '\t\tfile: secrets/ROOT_ACCOUNT.txt';
  _ += '\tTELEGRAM:';
  _ += '\t\tfile: secrets/TELEGRAM.txt';
  return _;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  generatePOSTGRESService,
  generateAPIService,
  generateGUIService,
  generateCLOUDFLAREDService,
  generateVolumes,
  generateSecrets,
};
