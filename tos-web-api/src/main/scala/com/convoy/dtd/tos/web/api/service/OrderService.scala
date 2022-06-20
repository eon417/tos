package com.convoy.dtd.tos.web.api.service

import com.convoy.dtd.tos.web.api.entity.{OrderSummary, Orders}

import java.util.Date

trait OrderService {
  def getTotal(teaID: Long):OrderSummary

  def getParticipant(teaID: Long):Long

  def checkDupeOrder(itemName: String, username: String):List[Orders]

  def findAllOrder():List[Orders]

  def getAllOrderById(orderID:Long):Option[Orders]

  def addOrder(itemName:String, itemQty:Int, orderCreator:Long, orderTeaID:Long, orderCutoffDate:Date):Boolean

  def adminDeleteOrderById(orderID:Long):Boolean

  def adminUpdateOrderById(orderID:Long, itemName:String, itemQty:Int, orderCreator:Long, orderTeaID:Long, orderCutoffDate:Date):Boolean

  def getAllOrderByTeaId(teaID:Long):List[Orders]

}