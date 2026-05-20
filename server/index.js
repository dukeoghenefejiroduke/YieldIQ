/**
 * Render Fail-safe Entry Point
 * This file handles cases where Render's "Root Directory" is set to 'server'.
 */
try {
  require('./dist/index.js');
} catch (e) {
  console.error("Compiled server not found. Ensure 'npm run build' has been executed.");
  process.exit(1);
}
