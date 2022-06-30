package com.convoy.dtd.tos.web.core.impl

import com.convoy.dtd.tos.web.api.entity.Users
import com.convoy.dtd.tos.web.api.service.UserService
import com.convoy.dtd.tos.web.core.dao.{OrderDAO, TeaSessionDAO, UserDAO}
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import java.util.Date
import javax.inject.Inject

@Service
private[impl] class UserServiceImpl extends UserService
{
  @Inject
  private var UserDAO:UserDAO = _

  @Transactional(readOnly=true)
  override def findAllUser(): List[Users] = UserDAO.findAllAsScala()

  @Transactional
  override def addUser(username:String, userPwd:String, userEnabled:Boolean, userLastLogin:Date, userIsAdmin:Boolean): Boolean
  = {
    if(!UserDAO.checkDupUsername(username))
    {
      val t = new Users()
      t.username = username
      t.userPwd = userPwd
      t.userEnabled = userEnabled
      t.userLastLogin = userLastLogin
      t.userIsAdmin = userIsAdmin
      UserDAO.saveOrUpdate(t)
      return true
    }
    return false
  }

  @Transactional
  override def adminDeleteUserById(userID:Long):Boolean = {
    if(userID.isValidLong) {
      UserDAO.deleteById(userID)
      return true
    }
    return false
  }

  @Transactional
  override def ownerUpdateUserById(userID:Long, ownerPwd:String, username:String, userPwd:String): Boolean
  = {
    if (UserDAO.checkOwnerPwd(userID, ownerPwd)) {
      adminUpdateUserById(userID, username, userPwd, userEnabled = false, null, userIsAdmin = false, isAdmin = false)
      return true
    }
    return false
  }

  @Transactional
  override def adminUpdateUserById(userID:Long, username:String, userPwd:String, userEnabled:Boolean, userLastLogin:Date, userIsAdmin:Boolean, isAdmin:Boolean): Boolean
  = {
    val to = UserDAO.getById(userID)

    if(to.isDefined) {
      val t = to.get
      if(username != "null")
        t.username = username
      if(userPwd != "null")
        t.userPwd = userPwd
      if(userLastLogin != null && userLastLogin != "null" && userLastLogin != "")
        t.userLastLogin = userLastLogin
      t.userEnabled = userEnabled
      t.userIsAdmin = userIsAdmin
      return true
    }
    return false
  }

  @Transactional
  override def getAllUserById(userID: Long): Option[Users] = UserDAO.getById(userID)

  @Transactional
  override def getAllUserByName(username: String): List[Users] = UserDAO.getByName(username)

  @Transactional
  override def userLogin(username: String, userPwd: String): Int = {
    return UserDAO.loginUser(username,userPwd)
  }
}