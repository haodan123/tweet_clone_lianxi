import mitt from "mitt"
// mitt是event bus 的一个库

const emitter =mitt()

export default function useEmitter(){
  return {
    $on:emitter.on,
    $emit:emitter.emit 
  }
}