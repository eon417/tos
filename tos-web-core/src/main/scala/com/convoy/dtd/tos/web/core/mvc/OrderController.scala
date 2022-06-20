package com.convoy.dtd.tos.web.core.mvc

import com.convoy.dtd.tos.web.api.entity.Responses
import com.convoy.dtd.tos.web.api.service.OrderService
import org.springframework.web.bind.annotation.{RequestMapping, RequestMethod, RestController}

import java.util.Date
import javax.inject.Inject

@RestController
@RequestMapping(value = Array("/rest/order"), method = Array(RequestMethod.POST))
private[mvc] class OrderController {
  @Inject
  private var OrderService:OrderService = _
  private var Responses:Responses = new Responses

  @RequestMapping(value = Array("find-all-order"), method = Array(RequestMethod.GET))
  def findAllOrder():Object = {
    Responses.reset()
    val res = OrderService.findAllOrder()
    if(res.nonEmpty) {
      Responses.status = true
      Responses.statusMsg = "Orders Found"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find orders"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("add-order"), method = Array(RequestMethod.POST))
  def addOrder(itemName:String, itemQty:Int, orderCreator:Long, orderTeaID:Long, orderCutoffDate:Date):Object = {
    Responses.reset()
    if(itemName.isEmpty){
      Responses.status = false
      Responses.statusMsg = "Item Name can't be empty"
      Responses.data = ""
      return Responses
    }
    val res = OrderService.addOrder(itemName, itemQty, orderCreator, orderTeaID, orderCutoffDate)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully created new order"
      Responses.data = ""
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to create new order"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("delete-order-by-id"), method = Array(RequestMethod.DELETE))
  def adminDeleteOrderById(orderID:Long):Object = {
    Responses.reset()
    val res = OrderService.adminDeleteOrderById(orderID)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully created new order"
      Responses.data = ""
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to create new order"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("admin-update-order-by-id"), method = Array(RequestMethod.PUT))
  def adminUpdateOrderById(orderID:Long, itemName:String, itemQty:Int, orderCreator:Long, orderTeaID:Long, orderCutoffDate:Date):Object = {
    Responses.reset()
    val res = OrderService.adminUpdateOrderById(orderID, itemName, itemQty, orderCreator, orderTeaID, orderCutoffDate)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully updated order"
      Responses.data = ""
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to update order"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("admin-get-order-by-id"), method = Array(RequestMethod.GET))
  def getAllOrderById(orderID:Long):Object = {
    Responses.reset()
    val res = OrderService.getAllOrderById(orderID)
    if(res.nonEmpty) {
      Responses.status = true
      Responses.statusMsg = "Successfully find order by ID"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find order by ID"
      Responses.data = ""
    }
    return Responses
  }

  //Summarize Order after cutoff date
  //Get all order from same tea session
  @RequestMapping(value = Array("admin-get-order-by-tea-id"), method = Array(RequestMethod.GET))
  def getAllOrderByTeaId(teaID:Long):Object = {
    Responses.reset()
    val res = OrderService.getAllOrderByTeaId(teaID)
    if(res.nonEmpty) {
      Responses.status = true
      Responses.statusMsg = s"Successfully found all orders from TeaID:${teaID}"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = s"Failed to find orders from TeaID:${teaID}"
      Responses.data = ""
    }
    return Responses
  }

  //Get all order from same tea session
  @RequestMapping(value = Array("generate-order"), method = Array(RequestMethod.GET))
  def generateOrder(teaID:Long):Object = {
    val participant = OrderService.getParticipant(teaID)
    val subtotal = OrderService.getTotal(teaID)

    Responses.reset()
    //    if(subtotal.nonEmpty) {
    Responses.status = true
    Responses.statusMsg = participant.toString
    Responses.data = subtotal
    //    } else {
    //      Responses.status = false
    //      Responses.statusMsg = "Failed to generate orders"
    //      Responses.data = ""
    //    }
    return Responses
  }

  @RequestMapping(value = Array("check-dupe-order"), method = Array(RequestMethod.GET))
  def checkDupeOrder(itemName:String, username:String):Object = {
    Responses.reset()

    val res = OrderService.checkDupeOrder(itemName, username)
    if(res.nonEmpty){
      Responses.status = true
      Responses.statusMsg = s"Duplicated Item(${itemName}) found for user(${username})"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = s"Item(${itemName}) is not duplicated for user(${username})"
      Responses.data = ""
    }

    return Responses
  }
}