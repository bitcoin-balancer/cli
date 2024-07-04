import { remoteHostFactory } from '../../modules/shared/remote-host/index.js';

/**
 * landscape-sysinfo
 * Displays details regarding the remote host's resources and state.
 */
export default async () => {
  // instantiate the remote host
  const host = await remoteHostFactory();

  // perform the action
  const payload = await host.getLandscapeSysInfo();
  console.log(payload);
};
