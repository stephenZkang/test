package hibernate.dao;

import hibernate.domain.Person;

import java.util.List;

public interface PersonDao {
  /**
  * @Title: save 
  * @Description: 保存人员
  * @param @param person  人员 
  * @return void    返回类型 
  * @throws
   */
  public void save(Person person);
  /**
  * @Title: batchSave 
  * @Description: FIXME(批量保存人员) 
  * @param @param persons    人员集合 
  * @return void    返回类型 
  * @throws
   */
  public void batchSave(List<Person> persons);
  /**
   * 
  * @Title: getRandom 
  * @Description: 随机获取一个人员信息
  * @param @return     
  * @return Person    人员信息 
  * @throws
   */
  public Person getRandom();
  /**
  * @Title: listPersons 
  * @Description: 获取人员集合
  * @param @return     
  * @return List<Person>    返回类型 人员集合 
  * @throws
   */
  public List<Person> listPersons();
}
