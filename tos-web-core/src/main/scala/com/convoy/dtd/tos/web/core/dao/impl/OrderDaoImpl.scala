package com.convoy.dtd.tos.web.core.dao.impl

import com.convoy.dtd.johnston.domain.jpa.dao.AbstractGenericDao
import com.convoy.dtd.tos.web.api.entity.{OrderSummary, Orders, QOrders}
import com.convoy.dtd.tos.web.core.dao.OrderDAO
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

import scala.collection.JavaConverters.asScalaBufferConverter

@Repository
private[impl] class OrderDaoImpl extends AbstractGenericDao[Orders, Long] with OrderDAO
{
  override def getAllOrderByTeaId(teaID: Long): List[Orders] = {
    val q = new JPAQueryFactory(entityManager)
    return q.selectFrom(QOrders).where(QOrders.orderTeaID.teaID.eq(teaID)).fetch().asScala.toList
  }

  override def checkDupeOrder(itemName: String, username: String): List[Orders] = {
    val q = new JPAQueryFactory(entityManager)
    return q.selectFrom(QOrders).where(QOrders.itemName.eq(itemName).and(QOrders.orderCreator.username.eq(username))).fetch().asScala.toList
  }

  override def getParticipant(teaID: Long): Long = {
    val q = new JPAQueryFactory(entityManager)
    return q.selectDistinct(QOrders.orderCreator.username).from(QOrders).where(QOrders.orderTeaID.teaID.eq(teaID)).fetchResults().getTotal
  }

  override def getTotal(teaID: Long): OrderSummary = {
    val q = new JPAQueryFactory(entityManager)
    //      Calculate items Quantity if itemName is same
    //      select itemName,sum(itemQty) from orders where orderTeaID = 1 group by itemName
    //    val res = q.select(QOrders.itemName,QOrders.itemQty.sum.as("subtotal")).from(QOrders).where(QOrders.orderTeaID.teaID.eq(teaID)).groupBy(QOrders.itemName).fetch().asScala.toList

    val subtotalList = q.from(QOrders).select(QOrders.itemQty.sum).where(QOrders.orderTeaID.teaID.eq(teaID)).groupBy(QOrders.itemName).fetch().asScala.toList
    val itemNameList = q.from(QOrders).select(QOrders.itemName).where(QOrders.orderTeaID.teaID.eq(teaID)).groupBy(QOrders.itemName).fetch().asScala.toList

    val summary:OrderSummary = new OrderSummary()

    summary.itemName = itemNameList
    summary.itemQuantity = subtotalList

    return summary
  }


}