package com.convoy.dtd.tos.web.api.entity

import java.util.Date
import javax.persistence._

@SerialVersionUID(1L)
@Entity
@Table(name="tos_dev.dbo.[teaSession]")
class TeaSession {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name="teaID", nullable = false)
  var teaID: Long = _

  @Column(name="teaName")
  var teaName: String = _

  @Column(name="teaDesc")
  var teaDesc: String = _

  @ManyToOne(fetch = FetchType.EAGER, targetEntity = classOf[Users])
  @JoinColumn(name="teaCreator", referencedColumnName = "userID")
  var teaCreator: Users = _

  @Column(name="teaPwd", nullable = false)
  var teaPwd: String = _

  @Column(name="teaTreatDate", nullable = false)
  var teaTreatDate: Date = _

  @Column(name="teaCutOffDate", nullable = false)
  var teaCutOffDate: Date = _

  @Column(name="teaVisible", nullable = false)
  var teaVisible: Boolean = _

  @Lob
  @Column(name="teaMenu", nullable = false)
  var teaMenu: String = _

  @Column(name="teaLink")
  var teaLink: String = _

  @OneToMany(fetch=FetchType.LAZY, mappedBy = "orderTeaID", targetEntity = classOf[Orders])
  var teaSessionIDs: java.util.Collection[Long] = _
}
