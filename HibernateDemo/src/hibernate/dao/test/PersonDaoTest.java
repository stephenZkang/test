package hibernate.dao.test;

import hibernate.dao.Impl.PersonDaoImpl;
import hibernate.domain.Person;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.junit.Before;
import org.junit.Test;

public class PersonDaoTest {
  private SessionFactory sessionFactory;
  
  @SuppressWarnings("deprecation")
  @Before
  public void setUp(){
    Configuration config = new Configuration();
    config.configure();
    ServiceRegistry serviceRegistry =new ServiceRegistryBuilder().applySettings(config.getProperties()).buildServiceRegistry();
    sessionFactory = config.buildSessionFactory(serviceRegistry);
  }
  
  @Test
  public void testSavePerson(){
    PersonDaoImpl personDao = new PersonDaoImpl();
    personDao.setSessionFactory(sessionFactory);
    Person person = new Person();
    person.setAge("25");
    person.setEmail("join@gmail.com");
    person.setName("join");
    personDao.save(person);
    
  }
  
  @Test
  public void testGetRandom(){
    PersonDaoImpl personDao = new PersonDaoImpl();
    personDao.setSessionFactory(sessionFactory);
    Person random = personDao.getRandom();
    System.out.println(random.getId());
  }
  
  @Test
  public void testListPersons(){
    PersonDaoImpl personDao = new PersonDaoImpl();
    personDao.setSessionFactory(sessionFactory);
    List<Person> listPersons = personDao.listPersons();
    for (Person person : listPersons) {
      System.out.println(person.getId());
    }
  }
  
  @Test
  public void updatePersons(){
    PersonDaoImpl personDao = new PersonDaoImpl();
    personDao.setSessionFactory(sessionFactory);
    personDao.updatePersons();
  }
  
  @Test
  public void updatePs(){
    PersonDaoImpl personDao = new PersonDaoImpl();
    personDao.setSessionFactory(sessionFactory);
    Integer[] ids = {1,2,3,4};
    personDao.updatePs(ids);
  }
  
}
