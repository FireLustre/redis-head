const 
    TYPE_ERR = 9999,
    TYPE_NIL = -1,
    TYPE_STATUS = 0,
    TYPE_STRING = 1,
    TYPE_INTEGER = 2,
    TYPE_ARRAY = 3;

// type of status
function parseStatus(parser) {
    return parser.pop();
}

// TODO err msg info
function parseError(parser) {
    console.log("error", parser)
    return parser.pop();
}

// type of integer
// return a integer of result
function parseInteger(parser) {
    return parseInt(parser.pop())
}

// type of string
// return a string of result
function parseBulk(parser) {
    if (parser.pop() === '-1') {
        return null;
    }
    return parser.pop();
}

// type of array
// return an array of result
function parseMultiBulk(parser) {
    let len = parser[0],
     values = [],
     offset = 0;
     
    for (let index = 0; index < len; index++) {
        offset += 2;
        values.push(parser[offset]);
    }
    console.log("multi bulk", values);
    return values;
}

function handleError(parser, type) {
    console.log('Protocol error, got ' + JSON.stringify(type) + ' as reply type byte', parser)
}

/**
 *
 * bulk reply:       $
 * status reply:     +
 * multi bulk reply: *
 * integer reply:    :
 * error reply:      -
 */
function parserType(parser, type) {
    console.log("parser=>", parser)
    switch (type) {
        case '$':
            let res = parseBulk(parser);
            if (null === res) {
                return ResponseReply(TYPE_NIL, null)
            }
            return ResponseReply(TYPE_STRING, res);
        case '+':
            return ResponseReply(TYPE_STATUS, parseStatus(parser));
        case '*':
            return ResponseReply(TYPE_ARRAY, parseMultiBulk(parser));
        case ':':
            return ResponseReply(TYPE_INTEGER, parseInteger(parser));
        case '-':
            return ResponseReply(TYPE_ERR, parseError(parser));
        default:
            handleError(parser, type);
            return null;
    }
}

function parseReply(data) {
    var type = data.charAt(0);
    var foo = data.substr(1);
    parser = foo.split(`\r\n`);
    parser.pop();
    return parserType(parser, type);
}

function ResponseReply(type, data) {
    return {"type": type, "data": data};
}