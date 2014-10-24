package hibernate.dao.Impl;

import org.hibernate.SessionFactory;

public class BaseDaoImpl {
  private SessionFactory sessionFactory;

  public SessionFactory getSessionFactory() {
    return sessionFactory;
  }

  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }
  
  
}
