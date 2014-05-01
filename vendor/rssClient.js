/**
 * Retrieve and Parse RSS Feeds
 * @author gabe@fijiwebdesign.com
 * @copyright www.fijiwebdesign.com
 * @license Creative-Commons 2.0
 * @version $Id$
 */
RSSClient = function() {
    // sad, but we need this to call our instance from global scope
    this._id = new String('instance_'+new Date().getTime());
    RSSClient[this._id] = this;
};
RSSClient.prototype = {

    /**
     * JSON proxy url
     */
    proxy: 'http://json-proxy.jgate.de/',


    /**
     * Attach an Event Listener
     * @param {HTMLElement} el DOM Node
     * @param {String} type Event Type
     * @param {Function} fn Event listener
     * @param {Bool}
     */
    addEvent: function(el, type, fn, useCapture) {
        if (el.addEventListener) {
            el.addEventListener(type, fn, useCapture);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, fn);
        } else {
            el['on' + type] = fn;
        }
    },

    /**
     * Attach a Script Element to the DOM
     * @param {String} src URL of script
     */
    addScript: function(src) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        head.appendChild(script);
    },

    /**
     * Convert String XML to DOM XML Object
     * @param {String} strXML
     */
    textToXML: function(strXML) {
        var xmlDoc = null;
        try {
            xmlDoc = (document.all)?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser();
            xmlDoc.async = false;
        } catch(e) {throw new Error("XML Parser could not be instantiated");}
        var out;
        try {
            if(document.all) {
                out = (xmlDoc.loadXML(strXML))?xmlDoc:false;
            } else {
                out = xmlDoc.parseFromString(strXML, "text/xml");
            }
        } catch(e) { throw new Error("Error parsing XML string"); }
        return out;
    },

    /**
     * Retrieve an RSS Feed
     * @param {Object} url
     */
    getRSS: function(url, callback) {
        var self = this;
        self._callback = callback;
        self.callback = function(str) {
            var xml = self.textToXML(str);
            self._callback(xml);
        };
//        var proxy = this.proxy+'?url='+encodeURIComponent(url)+'&callback=RSSClient.'+this._id+'.callback';
        var proxy = encodeURIComponent(url);
        this.addScript(proxy);
    },

    /**
     * Add observer of client load
     */
    onload: function(fn) {
        this.addEvent(window, 'load', fn);
    }
}