package com.convoy.dtd.tos.web.core.dao.impl

import com.convoy.dtd.johnston.domain.jpa.dao.AbstractGenericDao
import com.convoy.dtd.tos.web.api.entity.{TeaSession,QTeaSession}
import com.convoy.dtd.tos.web.core.dao.TeaSessionDAO
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

import scala.collection.JavaConverters._

@Repository
private[impl] class TeaSessionDaoImpl extends AbstractGenericDao[TeaSession, Long] with TeaSessionDAO
{

  override def findTeaSession(teaVisible: Boolean, ownerID: Long): List[TeaSession] = {
    val q = new JPAQueryFactory(entityManager)

    val res = q.selectFrom(QTeaSession).where(QTeaSession.teaVisible.eq(teaVisible).and(QTeaSession.teaCreator.userEnabled.eq(true))).fetch().asScala.toList
    val res2 = q.selectFrom(QTeaSession).where(QTeaSession.teaCreator.userID.eq(ownerID)).fetch().asScala.toList

    return (res ++ res2).distinct
  }

  override def checkOwnerPwd(teaID: Long, ownerPwd: String): Boolean = {
    val q = new JPAQueryFactory(entityManager)

    val selectedTea = q.selectFrom(QTeaSession).where(QTeaSession.teaID.eq(teaID)).fetchOne()

    if(ownerPwd == selectedTea.teaPwd){
      return true
    }
    return false
  }

  override def findByID(teaID: Long,teaVisible: Boolean): Boolean = {
    val q = new JPAQueryFactory(entityManager)

    val selectedTea = q.selectFrom(QTeaSession).where(QTeaSession.teaID.eq(teaID)).fetchOne()

    if(teaVisible == selectedTea.teaVisible){
      return true
    }
    return false
  }

  override def getByName(teaName: String): List[TeaSession] = {
    val q = new JPAQueryFactory(entityManager)

    return q.selectFrom(QTeaSession).where(QTeaSession.teaName.toLowerCase.contains(teaName.toLowerCase())).fetch().asScala.toList

  }

  override def findByName(teaName: String, teaVisible: Boolean): List[TeaSession] = {
    val q = new JPAQueryFactory(entityManager)

    return q.selectFrom(QTeaSession).where(QTeaSession.teaName.toLowerCase.contains(teaName.toLowerCase()).and(QTeaSession.teaVisible.eq(teaVisible))).fetch().asScala.toList
  }

  override def findByLink(teaLink: String): TeaSession = {
    val q = new JPAQueryFactory(entityManager)

    return q.selectFrom(QTeaSession).where(QTeaSession.teaLink.eq(teaLink)).fetchFirst()
  }

  override def test(teaID: Long): TeaSession = {
    val q = new JPAQueryFactory(entityManager)

    return q.selectFrom(QTeaSession).where(QTeaSession.teaID.eq(teaID)).fetchFirst()
  }
}