const NOT_FOUND_IDX  = -1
const AMP_CHAR = '&'
const EQL_CHAR = '='

const getPayload = data => data.payload
const getMessage = data => data.message
const getFull = data => ({
    message: data.message
  , options: data.options
  , data: data.payload
})

function matchingProps (props, case_sensitive = true) {
  const keys = Object.keys (props)
  return (
    item => keys.every (
      k => props[k] instanceof RegExp
           ? props[k].test (item[k])
           : case_sensitive
           ? item[k] === props[k]
           : item[k].toLowerCase () === props[k].toLowerCase ()
    )
  )
}

module.exports = {
    getMessage
  , getPayload
  , getFull
  , matchingProps
}

