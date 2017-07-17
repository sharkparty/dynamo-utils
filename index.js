class Utils {
/**
     * @name unMarshall
     * @param marshaledItem - A dynamo-encoded object (https://goo.gl/mFZDoj)
     * @return { JSON, Object }
     *
     * @description: This method is used to deserialize a marshaled dynamo response into a simple JSON object. We had
     * this sweet library that did this, but it was deprecated.
     *
     * Basic I/O
     *
     * {"SS": ["foo", "bar"]}                                  // ["foo", "bar"]
     * {"S": "bar"}                                            // "bar"
     * {"NS": ["42", "43"]})                                   // ["42", "43"]
     * {"L": [{"N": "42"}, {"S": "foo"}, {"NULL": true}]}      // ["42", "foo", true]
     * {"L": [{"S": "foo"}, {"S": "bar"}, {"S": "foo"}]}       // ["foo", "bar", "foo"]
     *
     * {"foo":{"S":"bar"},"myList":{"L":[{"S":"bingo"},{"N":"42"},{"NULL":true}]}}
     *                                                         // {foo: "bar", myList: Array(3)}
     *
     * If your type isn't here, that's my bad. Here's a fiddle to add your type in isolation:
     * https://jsfiddle.net/krsween/0uq3bag7/
     *
     */
    unMarshall(marshaledItem) {
        let unMarshaled = {};
        for (const marshaledChild in marshaledItem) {
            if (marshaledItem.hasOwnProperty(marshaledChild)) {
                switch (marshaledChild) {
                    case 'S':
                    case 'SS':
                    case 'N':
                    case 'NS':
                    case 'BOOL':
                    case 'NULL':
                    case 'M':
                    case 'B':
                        unMarshaled = marshaledItem[marshaledChild];
                        break;
                    case 'L':
                        unMarshaled = marshaledItem[marshaledChild].map(item => this.unMarshall(item));
                        break;
                    default:
                        unMarshaled[marshaledChild] = this.unMarshall(marshaledItem[marshaledChild]);
                        break;
                }
            }
        }
        return unMarshaled;
    }
}


module.exports = Utils;