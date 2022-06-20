package com.convoy.dtd.tos.web.core.dao.impl

import com.convoy.dtd.johnston.domain.jpa.dao.AbstractGenericDao
import com.convoy.dtd.tos.web.api.entity.{User,QUser}
import com.convoy.dtd.tos.web.core.dao.UserDAO
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

import scala.collection.JavaConverters.asScalaBufferConverter

@Repository
private[impl] class UserDaoImpl extends AbstractGenericDao[User, Long] with UserDAO
{
  override def checkDupUsername(username: String): Boolean = {
    val q = new JPAQueryFactory(entityManager)

    val selectedUser = q.selectFrom(QUser).where(QUser.username.eq(username)).fetchFirst()

    if(selectedUser != null)
      return true
    return false
  }

  override def checkOwnerPwd(userID: Long, ownerPwd: String): Boolean = {
    val q = new JPAQueryFactory(entityManager)

    val selectedUser = q.selectFrom(QUser).where(QUser.userID.eq(userID)).fetchOne()

    if(ownerPwd == selectedUser.userPwd){
      return true
    }
    return false
  }

  override def getByName(username: String): List[User] = {
    val q = new JPAQueryFactory(entityManager)

    return q.selectFrom(QUser).where(QUser.username.toLowerCase.contains(username.toLowerCase())).fetch().asScala.toList
  }

  override def loginUser(username: String, userPwd: String): Int = {
    val q = new JPAQueryFactory(entityManager)

    if(q.selectFrom(QUser).where(QUser.username.eq(username)).fetch().asScala.toList.isEmpty)
      return 1
    else
      if(q.selectFrom(QUser).where(QUser.username.eq(username).and(QUser.userPwd.eq(userPwd))).fetch().asScala.toList.isEmpty)
        return 2
    return 0
  }
}