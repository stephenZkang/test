package hibernate.dao.Impl;

import hibernate.dao.PersonDao;
import hibernate.domain.Person;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class PersonDaoImpl extends BaseDaoImpl implements PersonDao {
  
  @Override
  public void save(Person person) {
    Session session = getSessionFactory().openSession();
    Transaction tx = session.beginTransaction();
    session.save(person);
    tx.commit();
    session.close();
  }

  @Override
  public void batchSave(List<Person> persons) {
    // FIXME Auto-generated method stub
    Session session = getSessionFactory().openSession();
    session.beginTransaction();
    
  }

  @Override
  public Person getRandom() {
    Session session = getSessionFactory().openSession();
    Transaction tx = session.beginTransaction();
    Query query = session.getNamedQuery("getRandomPerson");
    Person person = (Person) query.uniqueResult();
    tx.commit();
    session.close();
    return person;
  }
  
  @SuppressWarnings("unchecked")
  @Override
  public List<Person> listPersons() {
    Session session = getSessionFactory().openSession();
    Transaction tx = session.beginTransaction();
    Query query = session.createQuery("from Person");
    List<Person> list = query.list();
    tx.commit();
    session.close();
    return list;
  }
  
  /**
   * 
  * @Title: updatePersons 
  * @Description: 将人员名为lucy的修改为jack
  * @param     设定文件 
  * @return void    返回类型 
  * @throws
   */
  public void updatePersons() {
    Session session = getSessionFactory().openSession();
    Transaction tx = session.beginTransaction();
    Query query = session.createQuery("update Person p set p.name = :newName where p.name = :oldName")
                          .setString("newName", "jack")
                          .setString("oldName", "lucy");
    query.executeUpdate();
    tx.commit();
  }
  
  /**
   * 
  * @Title: updatePs 
  * @Description: 将人员id在ids中的人员更新 
  * @param @param ids    人员id的集合 
  * @return void    返回类型 
  * @throws
   */
  public void updatePs(Integer[] ids) {
    Session session = getSessionFactory().openSession();
    Transaction tx = session.beginTransaction();
    Query query = session.createQuery("update Person p set p.name = :newName where p.id in(:oldName)")
                          .setString("newName", "lulu")
                          .setParameterList("oldName", ids);
    query.executeUpdate();
    tx.commit();
  }
  
}
