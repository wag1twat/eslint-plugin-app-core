const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-use-execute-url-class')
const ruleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run('no-use-execute-url-class', rule, {
    valid: [{
            code: `x.path().exec();`,
        }, 
        { code: `const f = x.path().exec();` }, 
        { code: `path().exec();` }
    ],
    invalid: [{
            code: `x.path();`,
            // we can use messageId from the rule object
            errors: [{ messageId: `invalid` }],
        },
        {
            code: `const f = x.path();`,
            // we can use messageId from the rule object
            errors: [{ messageId: `invalid` }],
        },
    ]
});