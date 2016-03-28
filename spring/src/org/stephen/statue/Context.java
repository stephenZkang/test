package org.stephen.statue;

public class Context {
	private Statue statue;

	public Context(Statue statue) {
		this.statue = statue;
	}
	

	public Statue getStatue() {
		return statue;
	}


	public void change(){
		if("close".equals(getStatue().getValue())){
			getStatue().close();
		}else if("open".equals(getStatue().getValue())){
			getStatue().open();
		}
	}
}
