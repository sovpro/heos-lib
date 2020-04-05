const {
    HeosStream
  , HeosResultStream
  , HeosEventStream
}                     = require ('@sovpro/heos-stream')
const {declarations}  = require ('./declarations')
const {event_names}   = require ('./event_names')
const {command_names} = require ('./command_names')
const {EventEmitter}  = require ('events')

const CMDUNDPROC = 'command under process'
const DEFAULT_OPTS = {
  timeout: 5000
}

const heos_stream_sym         = Symbol ()
const heos_result_stream_sym  = Symbol ()
const heos_event_stream_sym   = Symbol ()
const get_result_sym          = Symbol ()
const timeout_sym             = Symbol ()

class HeosLib extends EventEmitter {

  constructor (
      heos_socket
    , {timeout} = DEFAULT_OPTS
  ) {
    super ()

    this[timeout_sym]    = timeout

    const heos_stream    = new HeosStream (heos_socket)
    const result_stream  = new HeosResultStream (command_names)
    const event_stream   = new HeosEventStream (event_names)

    heos_stream.on ('data', data => {
      this.emit ('data', data)
    })
    result_stream.on ('data', data => {
      this.emit ('result:' + data.command, data)
      this.emit ('result', data)
    })
    event_stream.on ('data', data => {
      this.emit ('event:' + data.event, data)
      this.emit ('event', data)
    })

    heos_stream.pipe (result_stream)
    heos_stream.pipe (event_stream)

    this[heos_stream_sym]        = heos_stream
    this[heos_result_stream_sym] = result_stream
    this[heos_event_stream_sym]  = event_stream
  }

  command (command_data) {
    this[heos_stream_sym].write (command_data)
  }

  get timeout () {
    return this[timeout_sym]
  }

  [get_result_sym] (
    {command, params}
  , sequence = false
  ) {
    const SEQUENCE = String (
      sequence ?
      Math.floor (Math.random () * Date.now ()) : 0
    )

    const getResult = (fulfill, reject) => {
      const event_name = 'result:' + command
      const onTimeout = () => {
        this.off (event_name, onResult)
        let msg = `Result timeout for "${command}"`
        reject (new Error (msg))
      }

      let timer = setTimeout (onTimeout, this.timeout)

      this.on (event_name, onResult)
      this.command ({
        command ,
        params: sequence ? {
          ...params
        , SEQUENCE
        } : params
      })

      function onResult (data) {
        if (data.message.hasOwnProperty ('SEQUENCE') &&
            data.message.SEQUENCE !== SEQUENCE) return
        if (data.message.hasOwnProperty (CMDUNDPROC)) return
        clearTimeout (timer)
        this.off (event_name, onResult)
        if (data.result === 'success') fulfill (data)
        else {
          const error = new Error (data.message.text)
          error.code = +(data.message.eid)
          reject (error)
        }
      }
    }

    return new Promise (getResult)
  }

  static get QUEUE_PLAY_NOW () { return 1 }
  static get QUEUE_PLAY_NEXT () { return 2 }
  static get QUEUE_PLAY_LAST () { return 3 }
  static get QUEUE_REPLACE_AND_PLAY () { return 4 }

  static get SEARCH_CRITERIA_ARTIST () { return 1 }
  static get SEARCH_CRITERIA_ALBUM () { return 2 }
  static get SEARCH_CRITERIA_TRACK () { return 3 }
  static get SEARCH_CRITERIA_STATION () { return 4 }
  static get SEARCH_CRITERIA_SHOWS () { return 5 }
  static get SEARCH_CRITERIA_PLAYLIST () { return 6 }
  static get SEARCH_CRITERIA_ACCOUNTS () { return 7 }
}

HeosLib.prototype = declarations.reduce (
  (proto, decl) => {
    proto[decl.name] = (
      decl.func || methodize (decl)
    )
    return proto
  }
, HeosLib.prototype
)

function methodize (decl) {
  return async function (...args) {
    let params = {}

    if (decl.args) {
      const as_obj = typeof args[0] === 'object'

      for ( let i = 0
          ; (as_obj || i < args.length) &&
            i < decl.args.length
          ; i++ ) {

        if (! as_obj)
          params[decl.args[i]] = args[i]

        else if (args[0].hasOwnProperty (decl.args[i]))
          params[decl.args[i]] = args[0][decl.args[i]]
      }
    }

    const result = await this[get_result_sym] (
      { command: decl.command
      , params
      }
    , decl.sequence
    )

    return decl.success (result)
  }
}

exports.HeosLib = HeosLib

