/**
 * Debug utilities for logging and troubleshooting
 * 
 * These utilities help with debugging the application's functionality,
 * particularly for asynchronous operations like API calls and search.
 * 
 * When isDebugMode is true, detailed logs will be shown in the console.
 * This should be set to false for production builds.
 */

const isDebugMode = true; // Set to false in production

/**
 * Log debug information when debug mode is enabled
 * @param message - The debug message to display
 * @param data - Optional data object to log alongside the message
 */
export const logDebug = (message: string, data?: any) => {
  if (isDebugMode) {
    if (data) {
      console.log(`[DEBUG] ${message}:`, data);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
};

/**
 * Log error information (always shown regardless of debug mode)
 * @param message - The error message to display
 * @param error - The error object or details
 */
export const logError = (message: string, error: any) => {
  console.error(`[ERROR] ${message}:`, error);
};
