const 
    TYPE_ERR = 9999,
    TYPE_NIL = -1,
    TYPE_STATUS = 0,
    TYPE_STRING = 1,
    TYPE_INTEGER = 2,
    TYPE_ARRAY = 3;

/**
 *
 * bulk reply:       $
 * status reply:     +
 * multi bulk reply: *
 * integer reply:    :
 * error reply:      -
 */
function parser(orgData) {
    let t = orgData.shift();
    switch (t.charAt()) {
        // type of string
        // return a string of result
        case '$':
            if (t.substr(1) === '-1') {
                return ResponseReply(TYPE_NIL, null)
            }
            return ResponseReply(TYPE_STRING, orgData.shift());

        // type of array
        // return an array of result
        case '*': 
            let tmp = [];
            for (let index = 0; index < parseInt(t.substr(1)); index++) {
                tmp.push(parser(orgData));
            }
            return ResponseReply(TYPE_ARRAY, tmp);

        // type of status
        case '+':
            return ResponseReply(TYPE_STATUS, t.substr(1));

        // type of integer
        // return a integer of result
        case ':':
            return ResponseReply(TYPE_INTEGER, parseInt(t.substr(1), 10));
        
        // TODO err msg info
        case '-':
            return ResponseReply(TYPE_ERR, t.substr(1));
        default:
            console.log('Protocol error, got ' + JSON.stringify(orgData) + ' as reply type byte')
            return null;
    }
}

function parseReply(data) {
    var foo = parser(data.split(`\r\n`));
    console.log(foo);
    return foo;
}

function ResponseReply(type, data) {
    return {"type": type, "data": data};
}
