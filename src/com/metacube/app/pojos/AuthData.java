package com.metacube.app.pojos;

public class AuthData {
	

	private String access_token;
	
	private String instance_url;

	
	public String getLoginAccessToken() {
		return access_token;
	}

	public void setLoginAccessToken(String loginAccessToken) {
		this.access_token = loginAccessToken;
	}

	public String getLoginInstanceUrl() {
		return instance_url;
	}

	public void setLoginInstanceUrl(String loginInstanceUrl) {
		this.instance_url = loginInstanceUrl;
	}

	
	public String getAuthBearer(){
		return "Bearer " + access_token;
		
	}
	
	@Override
	public String toString() {
		return "AuthData [access_token=" + access_token + ", instance_url="
				+ instance_url + "]";
	}



}
