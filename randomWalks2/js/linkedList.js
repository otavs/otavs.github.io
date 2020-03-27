// A linked list that only works with objects xD
class LinkedList {
  constructor() {
    this.last = this
    this.length = 0
  }
  push(obj) {
    obj.prev = this.last
    this.last.next = obj
    this.last = obj
    this.length++
  }
  remove(obj) {
    obj.prev.next = obj.next
    if(this.last === obj) this.last = obj.prev
    else obj.next.prev = obj.prev
    this.length--
  }
  forEach(f) {
    let obj = this.next
    while(obj) {
      f(obj)
      obj = obj.next
    }
  }
  pop() {
    if(this.empty()) return null
    let last = this.last
    this.remove(last)
    return last
  }
  empty() {
    return this.length <= 0
  }
}