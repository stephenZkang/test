package test;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import dao.BaseDao;
/**
 *	@author qiao123
 *	
 *	@see 测试Mockitto框架的使用
 */
public class TestBaseDao {
	@Mock
	private BaseDao baseDao;
	
	/**
	 * @see 初始化测试类中的成员对象
	 */
	@Before
	public void init(){
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testSave(){
		Object o = new Object();
		/**
		 * baseDao.save时没有任何返回值。
		 */
		Mockito.doNothing().when(baseDao).save(o);
		baseDao.save(o);
	}
}
