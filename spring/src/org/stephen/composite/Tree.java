package org.stephen.composite;

/**
 * ���ģʽ
 * @author qiao123
 *	��������������һ����в����������ڱ�ʾ���νṹ�У����������������
 */
public class Tree {
	TreeNode root =null;

	public Tree(String name) {
		root = new TreeNode(name);
	}
	
	public static void main(String[] args) {
		Tree tree = new Tree("A");
		TreeNode node = new TreeNode("B");
		TreeNode node2 = new TreeNode("C");
		tree.root.add(node);
		node.add(node2);
		System.out.println("build tree finished");
	}
	
}
