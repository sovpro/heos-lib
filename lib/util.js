const getPayload = data => data.payload
const getMessage = data => data.message
const getItems = data => ({
    count: parseInt (data.message.count, 10)
  , items: data.payload
  , options: data.options
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

function makeBrowseSourceShortcut (source_name) {
  return async function (range) {
    const _range = typeof range === 'object' ? range.range : range
    const music_sources = await this.getMusicSources ()
    const music_source = music_sources.find (matchingProps ({name: source_name}, false))
    return this.browseSource (music_source.sid, _range)
  }
}

module.exports = {
    getMessage
  , getPayload
  , getItems
  , matchingProps
  , makeBrowseSourceShortcut
}

