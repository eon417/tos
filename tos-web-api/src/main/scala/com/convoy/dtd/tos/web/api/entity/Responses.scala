package com.convoy.dtd.tos.web.api.entity

class Responses {
  var status:Boolean = _
  var statusMsg:String = _
  var data:Object = _

  def reset(): Unit ={
    this.status = true
    this.statusMsg = ""
    this.data = ""
  }

}
