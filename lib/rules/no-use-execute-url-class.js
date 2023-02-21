const get = require('lodash.get')

module.exports = {
  meta: {
    messages: {
      "invalid": "MemberExpression after call is required"
    }
  },
  create: context => {
    const availables = [
      'MemberExpression'
    ]

    const handler = node => {
      const ancestors = context.getAncestors(node);

      const last = ancestors[ancestors.length - 1];

      const report = (node) => {
        context.report({
          node,
          messageId: 'invalid'
        });
      }
        
      if(get(last, 'callee.property.name') === 'path') {
        const parent = get(last, 'parent.property.name')

        if(parent === undefined) {
          report(node)
        }
      }
    }

    const handlers = availables.reduce((rules, key) => ({ ...rules, [key]: handler }), {});

    return handlers
  }
}