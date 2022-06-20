package com.convoy.dtd.tos.web.core.dao

import com.convoy.dtd.johnston.domain.api.dao.GenericDao
import com.convoy.dtd.tos.web.api.entity.{OrderSummary, Orders}

trait OrderDAO extends GenericDao[Orders, Long]
{
  def getTotal(teaID: Long): OrderSummary

  def getParticipant(teaID: Long): Long

  def checkDupeOrder(itemName: String, username: String): List[Orders]

  def getAllOrderByTeaId(teaID:Long):List[Orders]
}