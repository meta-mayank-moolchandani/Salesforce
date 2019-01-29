package com.metacube.app.pojos;

public class Contact {
	private String Name;

	private String Email;

	private String Experience__c;

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getExperience__c() {
		return Experience__c;
	}

	public void setExperience__c(String experience__c) {
		Experience__c = experience__c;
	}
	

	@Override
	public String toString() {
		return "Contact [Name=" + Name + ", Email=" + Email
				+ ", Experience__c=" + Experience__c + "]";
	}



}
