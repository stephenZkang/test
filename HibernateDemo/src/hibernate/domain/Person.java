package hibernate.domain;

/**
 * 
* @ClassName: Person 
* @Description: 人员信息
* @author A18ccms a18ccms_gmail_com 
* @date Sep 25, 2014 8:49:38 AM 
*
 */
public class Person {
  
  
  private int id;
  private String name;
  private String email;
  private String age;
  
  
  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getAge() {
    return age;
  }
  public void setAge(String age) {
    this.age = age;
  }
  
  
}
