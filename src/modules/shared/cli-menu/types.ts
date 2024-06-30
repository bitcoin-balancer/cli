

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

type IActionID =
  'connect' | 'landscape-sysinfo' | 'top' | 'copy-ssh-public-key' | 'reboot' | 'shutdown' |


  'up' | 'up:test-mode' | 'up:restore-mode' |

  'build' | 'build-up' | 'build-up:test-mode' | 'build-up:restore-mode' |


  'generate-env-vars' | 'deploy-env-vars';




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  type IActionID,
};
