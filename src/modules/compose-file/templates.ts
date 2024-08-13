/* eslint-disable no-template-curly-in-string */

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

/**
 * Generates the content for the logging system (local driver).
 * @returns string
 */
const __generateLogging = (): string => {
  let _ = '';
  _ += '    logging:\n';
  _ += '      driver: local\n';
  _ += '      options:\n';
  _ += '        max-size: "10m"\n';
  _ += '        max-file: "10"\n';
  _ += '        compress: "true"';
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
  let _ = '';
  _ += '  postgres:\n';
  _ += '    container_name: balancer-postgres\n';
  _ += '    image: postgres:16.3-alpine3.20\n';
  _ += '    restart: always\n';
  _ += '    secrets:\n';
  _ += '      - POSTGRES_PASSWORD_FILE\n';
  _ += '    environment:\n';
  _ += '      - POSTGRES_USER=${POSTGRES_USER}\n';
  _ += '      - POSTGRES_DB=${POSTGRES_DB}\n';
  _ += '      - POSTGRES_PASSWORD_FILE=${POSTGRES_PASSWORD_FILE}\n';
  _ += '    volumes:\n';
  _ += '      - pgdata:/var/lib/postgresql/data\n';
  _ += '      - pgdata-management:/var/lib/pgdata-management\n';
  _ += '    expose:\n';
  _ += '      - 5432:5432\n';
  _ += '    healthcheck:\n';
  _ += '      test: [ "CMD", "pg_isready", "-U", "postgres" ]\n';
  _ += '      interval: "10s"\n';
  _ += '      timeout: "5s"\n';
  _ += '      retries: "5"\n';
  _ += __generateLogging();
  return _;
};

/**
 * Generates the content for the api service.
 * @param testMode
 * @param restoreMode
 * @param hasTunnelToken
 * @returns string
 */
const generateAPIService = (
  testMode: boolean,
  restoreMode: boolean,
  hasTunnelToken: boolean,
): string => {
  let _ = '';
  _ += '  api:\n';
  _ += '    container_name: balancer-api\n';
  _ += '    build:\n';
  _ += '      context: ../api\n';
  _ += '      args:\n';
  _ += '        - NODE_ENV=${NODE_ENV}\n';
  _ += '    image: jesusgraterol/balancer-api:latest\n';
  _ += '    ports:\n';
  _ += '      - 5075:5075\n';
  _ += '    secrets:\n';
  _ += '      - POSTGRES_PASSWORD_FILE\n';
  _ += '      - ROOT_ACCOUNT\n';
  _ += '      - TELEGRAM\n';
  _ += '      - ALTCHA_SECRET\n';
  _ += '      - JWT_SECRET\n';
  _ += '      - COOKIE_SECRET\n';
  _ += '      - EXCHANGES_CREDENTIALS\n';
  _ += '    environment:\n';
  _ += '      - NODE_ENV=${NODE_ENV}\n';
  _ += '      - GUI_URL=${GUI_URL}\n';
  _ += `      - TEST_MODE=${testMode}\n`;
  _ += `      - RESTORE_MODE=${restoreMode}\n`;
  _ += `      - HAS_TUNNEL_TOKEN=${hasTunnelToken}\n`;
  _ += '      - API_PORT=5075\n';
  _ += '      - POSTGRES_HOST=${POSTGRES_HOST}\n';
  _ += '      - POSTGRES_USER=${POSTGRES_USER}\n';
  _ += '      - POSTGRES_DB=${POSTGRES_DB}\n';
  _ += '      - POSTGRES_PORT=5432\n';
  _ += '      - POSTGRES_PASSWORD_FILE=${POSTGRES_PASSWORD_FILE}\n';
  _ += '      - ROOT_ACCOUNT=${ROOT_ACCOUNT}\n';
  _ += '      - TELEGRAM=${TELEGRAM}\n';
  _ += '      - ALTCHA_SECRET=${ALTCHA_SECRET}\n';
  _ += '      - JWT_SECRET=${JWT_SECRET}\n';
  _ += '      - COOKIE_SECRET=${COOKIE_SECRET}\n';
  _ += '      - EXCHANGES_CONFIGURATION=${EXCHANGES_CONFIGURATION}\n';
  _ += '      - EXCHANGES_CREDENTIALS=${EXCHANGES_CREDENTIALS}\n';
  _ += '    depends_on:\n';
  _ += '      postgres:\n';
  _ += '        condition: service_healthy\n';
  _ += __generateLogging();
  return _;
};

/**
 * Generates the content for the gui service.
 * @param productionBuild?
 * @returns string
 */
const generateGUIService = (productionBuild?: boolean): string => {
  let _ = '';
  _ += '  gui:\n';
  _ += '    container_name: balancer-gui\n';
  _ += '    build:\n';
  _ += '      context: ../gui\n';
  _ += '      args:\n';
  _ += `        - NODE_ENV=${productionBuild ? 'production' : 'development'}\n`;
  _ += '    image: jesusgraterol/balancer-gui:latest\n';
  _ += '    ports:\n';
  _ += '      - 8090:8090\n';
  _ += '    depends_on:\n';
  _ += '      - api\n';
  _ += __generateLogging();
  return _;
};

/**
 * Generates the content for the cloudflare tunnel service.
 * @returns string
 */
const generateCTService = (): string => {
  let _ = '';
  _ += '  ct:\n';
  _ += '    container_name: balancer-ct\n';
  _ += '    build:\n';
  _ += '      context: ../ct\n';
  _ += '    image: jesusgraterol/balancer-ct:latest\n';
  _ += '    user: root\n';
  _ += '    restart: unless-stopped\n';
  _ += '    secrets:\n';
  _ += '      - TUNNEL_TOKEN\n';
  _ += __generateLogging();
  return _;
};

/**
 * Generates the content for the volumes.
 * @returns string
 */
const generateVolumes = (): string => {
  let _ = '';
  _ += 'volumes:\n';
  _ += '  pgdata:\n';
  _ += '  pgdata-management:';
  return _;
};

/**
 * Generates the content for the secrets.
 * @param secrets
 * @returns string
 */
const generateSecrets = (secrets: string[]): string => {
  let _ = '';
  _ += 'secrets:\n';
  secrets.forEach((secret, index) => {
    _ += `  ${secret}:\n`;
    _ += `    file: secrets/${secret}.txt${index === secrets.length - 1 ? '' : '\n'}`;
  });
  return _;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  generatePOSTGRESService,
  generateAPIService,
  generateGUIService,
  generateCTService,
  generateVolumes,
  generateSecrets,
};
