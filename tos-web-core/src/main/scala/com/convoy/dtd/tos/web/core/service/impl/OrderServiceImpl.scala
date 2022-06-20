package com.convoy.dtd.tos.web.core.impl

import com.convoy.dtd.tos.web.api.entity.{OrderSummary, Orders}
import com.convoy.dtd.tos.web.api.service.OrderService
import com.convoy.dtd.tos.web.core.dao.{OrderDAO, TeaSessionDAO, UserDAO}
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import java.util.Date
import javax.inject.Inject

@Service
private[impl] class OrderServiceImpl extends OrderService
{
  @Inject
  private var OrderDAO:OrderDAO = _
  @Inject
  private var teaSessionDAO:TeaSessionDAO = _
  @Inject
  private var userDAO:UserDAO = _

  @Transactional(readOnly=true)
  override def findAllOrder(): List[Orders] = OrderDAO.findAllAsScala()

  @Transactional
  override def addOrder(itemName:String, itemQty:Int, orderCreator:Long, orderTeaID:Long, orderCutoffDate:Date): Boolean
  =
  {
    val t = new Orders()
    t.itemName = itemName
    t.itemQty = itemQty
    t.orderCreator = this.userDAO.getById(orderCreator).get
    t.orderTeaID = this.teaSessionDAO.getById(orderTeaID).get
    t.orderCutoffDate = orderCutoffDate
    OrderDAO.saveOrUpdate(t)
    return true
  }

  @Transactional
  override def adminDeleteOrderById(orderID:Long):Boolean = {
    if(orderID.isValidLong) {
      OrderDAO.deleteById(orderID)
      return true
    }
    return false
  }

  @Transactional
  override def adminUpdateOrderById(orderID:Long, itemName:String, itemQty:Int, orderCreator:Long, orderTeaID:Long, orderCutoffDate:Date): Boolean
  = {
    val to = OrderDAO.getById(orderID)

    if(to.isDefined)
    {
      val t = to.get
      if(itemName != null)
        t.itemName = itemName
      if(itemQty.isValidInt)
        t.itemQty = itemQty
      if(orderCreator.isValidLong)
        t.orderCreator = this.userDAO.getById(orderCreator).get
      if(orderTeaID.isValidLong)
        t.orderTeaID = this.teaSessionDAO.getById(orderTeaID).get
      if(orderCutoffDate != null)
        t.orderCutoffDate = orderCutoffDate
      return true
    }
    return false
  }

  @Transactional
  override def getAllOrderById(orderID: Long): Option[Orders] = OrderDAO.getById(orderID)

  @Transactional
  override def getAllOrderByTeaId(teaID: Long): List[Orders] = OrderDAO.getAllOrderByTeaId(teaID)

  @Transactional
  override def checkDupeOrder(itemName:String,username: String): List[Orders] = OrderDAO.checkDupeOrder(itemName,username)

  @Transactional
  override def getParticipant(teaID: Long): Long = OrderDAO.getParticipant(teaID)

  @Transactional
  override def getTotal(teaID: Long): OrderSummary = OrderDAO.getTotal(teaID)
}