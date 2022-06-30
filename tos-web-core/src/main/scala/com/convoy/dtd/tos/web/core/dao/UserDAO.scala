package com.convoy.dtd.tos.web.core.dao

import com.convoy.dtd.johnston.domain.api.dao.GenericDao
import com.convoy.dtd.tos.web.api.entity.Users

trait UserDAO extends GenericDao[Users, Long]
{
  def loginUser(username: String, userPwd: String): Int

  def checkDupUsername(username:String):Boolean

  def checkOwnerPwd(userID:Long, ownerPwd: String):Boolean

  def getByName(username:String):List[Users]

}