package com.convoy.dtd.tos.web.core.dao

import com.convoy.dtd.johnston.domain.api.dao.GenericDao
import com.convoy.dtd.tos.web.api.entity.TeaSession

trait TeaSessionDAO extends GenericDao[TeaSession, Long]
{
  def test(teaID: Long):TeaSession

  def findTeaSession(teaVisible:Boolean, ownerID: Long):List[TeaSession]

  def checkOwnerPwd(teaID:Long, ownerPwd: String):Boolean

  def findByID(teaID:Long, teaVisible:Boolean):Boolean

  def getByName(teaName:String):List[TeaSession]

  def findByName(teaName:String, teaVisible:Boolean):List[TeaSession]

  def findByLink(teaLink:String):TeaSession

}