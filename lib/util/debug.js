/**
 * This class is used mainly for debugging purposes. contains static methods.
 */
class Debug {
    /**
     *
     * Will pretty a js object.
     * @param {object} obj - the object you wish to pretty print.
     * @return {string} - the pretty printed string of the object.
     */
    static json(obj = {}) {
        return JSON.stringify(obj, null, '\t');
    }
}

module.exports = Debug;