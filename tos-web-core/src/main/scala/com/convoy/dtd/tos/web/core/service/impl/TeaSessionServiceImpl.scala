package com.convoy.dtd.tos.web.core.impl

import com.convoy.dtd.tos.web.api.entity.TeaSession
import com.convoy.dtd.tos.web.api.service.TeaSessionService
import com.convoy.dtd.tos.web.core.dao.{TeaSessionDAO, UserDAO}
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import java.util.Date
import javax.inject.Inject

@Service
private[impl] class TeaSessionServiceImpl extends TeaSessionService
{
  @Inject
  private var teaSessionDAO:TeaSessionDAO = _
  @Inject
  private var userDAO:UserDAO = _

  @Transactional(readOnly=true)
  override def findAllTeaSession(): List[TeaSession] = {
    teaSessionDAO.findAllAsScala()
  }

  @Transactional(readOnly=true)
  override def findTeaSession(teaVisible: Boolean, ownerID:Long): List[TeaSession] = teaSessionDAO.findTeaSession(teaVisible, ownerID)

  @Transactional
  override def addTeaSession(teaName: String, teaDesc: String, teaCreator: Long, teaPwd: String, teaTreatDate: Date, teaCutOffDate: Date, teaVisible: Boolean, teaMenu: String, teaLink: String): Boolean
  =
  {
    val t = new TeaSession()
    t.teaName = teaName
    t.teaDesc = teaDesc
    t.teaCreator = this.userDAO.getById(teaCreator).getOrElse(this.userDAO.getById(1).get)
    t.teaPwd = teaPwd
    t.teaTreatDate = teaTreatDate
    t.teaCutOffDate = teaCutOffDate
    t.teaVisible = teaVisible
    t.teaMenu = teaMenu
    t.teaLink = teaLink
    teaSessionDAO.saveOrUpdate(t)
    return true
  }

  @Transactional
  override def adminDeleteTeaSessionById(teaID:Long):Boolean = {
    teaSessionDAO.deleteById(teaID)
    return true
  }
  @Transactional
  override def ownerDeleteTeaSessionById(teaID: Long, ownerPwd: String): Boolean = {
    if (teaSessionDAO.checkOwnerPwd(teaID, ownerPwd)) {
      teaSessionDAO.deleteById(teaID)
      return true
    } else return false
  }

  @Transactional
  override def ownerUpdateTeaSessionById(teaID: Long, ownerPwd: String, teaName: String, teaDesc: String, teaCreator: Long, teaPwd: String, teaTreatDate: Date, teaCutOffDate: Date, teaVisible: Boolean, teaMenu: String): Boolean
  = {
    if (teaSessionDAO.checkOwnerPwd(teaID, ownerPwd)) {
      adminUpdateTeaSessionById(teaID, teaName, teaDesc, -1, teaPwd, teaTreatDate, teaCutOffDate, teaVisible, teaMenu, null)
      return true
    } else return false
  }


  @Transactional
  override def adminUpdateTeaSessionById(teaID: Long, teaName: String, teaDesc: String, teaCreator: Long, teaPwd: String, teaTreatDate: Date, teaCutOffDate: Date, teaVisible: Boolean, teaMenu: String, teaLink: String): Boolean
  = {
    val to = teaSessionDAO.getById(teaID)

    if(to.isDefined)
    {
      val t = to.get
      if(teaName != null && teaName != "")
        t.teaName = teaName
      if(teaDesc != null && teaDesc != "")
        t.teaDesc = teaDesc
      if(teaCreator.isValidLong)
        t.teaCreator = this.userDAO.getById(teaCreator).getOrElse(this.userDAO.getById(1).get)
      if(teaPwd != null && teaPwd != "")
        t.teaPwd = teaPwd
      if(teaTreatDate != null && teaTreatDate != "null")
        t.teaTreatDate = teaTreatDate
      if(teaCutOffDate != null && teaCutOffDate != "null")
        t.teaCutOffDate = teaCutOffDate
      if(teaMenu != null && teaMenu != "null" && teaMenu != "")
        t.teaMenu = teaMenu
      if(teaLink != null)
        t.teaLink = teaLink

      t.teaVisible = teaVisible
      if(t.teaVisible)
        t.teaLink = ""

      return true
    }
    else {
      return false
    }
  }

  @Transactional
  override def getTeaSessionById(teaID: Long, teaVisible: Boolean): Option[TeaSession]
  = {
    if(teaSessionDAO.findByID(teaID, teaVisible))
    {
      return teaSessionDAO.getById(teaID)
    }
    return null
  }

  @Transactional
  override def getAllTeaSessionById(teaID: Long): TeaSession = {
    val res = teaSessionDAO.test(teaID)
    return res
  }

  @Transactional
  override def getAllTeaSessionByName(teaName: String): List[TeaSession] = teaSessionDAO.getByName(teaName)

  @Transactional
  override def getTeaSessionByName(teaName: String, teaVisible: Boolean): List[TeaSession] = teaSessionDAO.findByName(teaName,teaVisible)

  @Transactional
  override def getTeaSessionByLink(teaLink: String): TeaSession = teaSessionDAO.findByLink(teaLink)
}