import { remoteHostFactory } from '../../modules/shared/remote-host/index.js';

/**
 * landscape-sysinfo
 * Displays details regarding the remote host's resources and state.
 */
export default async () => {
  // instantiate the remote host
  const host = remoteHostFactory();

  // ensure the host is running and has internet
  if (!await host.isOnline()) {
    throw new Error('The remote host is not running or has no access to the Internet.');
  }

  // perform the action
  const payload = await host.getLandscapeSysInfo();
  console.log(payload);
};
