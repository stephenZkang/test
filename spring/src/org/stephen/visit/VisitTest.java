package org.stephen.visit;

/**
 * 访问者模式
 * @author qiao123
 *	简单来说，访问者模式就是一种分离对象数据结构与行为的方法，
 *	通过这种分离，可达到为一个被访问者动态添加新的操作而无需做其它的修改的效果。
 */
public class VisitTest {
	public static void main(String[] args) {
		Subject  subject = new MySubject();
		Visitor visitor = new MyVisitor();
		subject.accept(visitor);
	}
}
