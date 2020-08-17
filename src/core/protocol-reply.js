// type of status
function parseStatus(parser) {
    console.log("status", parser)
    return parser.pop();
}

// err msg info
function parseError(parser) {
    console.log("error", parser)
    return parser.pop();
}

// type of integer
// return a integer of result
function parseInteger(parser) {
    console.log("integer", parser)
    return parseInt(parser.pop())
}

// type of string
// return a string of result
function parseBulk(parser) {
    console.log("bulk", parser)
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
    console.log("multi bulk", values)
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
            return parseBulk(parser)
        case '+':
            return parseStatus(parser)
        case '*':
            return parseMultiBulk(parser)
        case ':':
            return parseInteger(parser)
        case '-':
            return parseError(parser)
        default:
            return handleError(parser, type)
    }
}

function parseReply(data) {
    console.log(data)
    var type = data.charAt(0);
    var foo = data.substr(1);
    parser = foo.split(`\r\n`);
    parser.pop();
    return parserType(parser, type);
}