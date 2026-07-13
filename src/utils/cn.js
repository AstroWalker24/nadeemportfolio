/**
 * Merges class names, filtering out falsy values.
 * @param {...string} classes
 * @returns {string}
 */
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default cn;
