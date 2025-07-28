import { Separator } from '@inquirer/prompts';

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Action Menu Item
 * ...
 */
type IActionMenuItem = {
  // the action(:variation)? that will be executed when chosen.
  value: string;

  // a short description of what the action does
  description: string;
};

/**
 * Category Menu Item
 * ...
 */
type ICategoryMenuItem = {
  // the name of the actions container
  name: string;

  // a short description of category's contents
  description: string;

  // the list of actions in the category
  value: (IActionMenuItem | Separator)[];
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { type IActionMenuItem, type ICategoryMenuItem };
