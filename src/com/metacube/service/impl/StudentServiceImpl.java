package com.metacube.service.impl;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

import com.google.gson.Gson;
import com.metacube.app.pojos.AuthData;
import com.metacube.app.pojos.Student;
import com.metacube.app.service.StudentService;

public class StudentServiceImpl implements StudentService {

	@Override
	public boolean insertStudent(Student student) {
		AuthData authData = AuthenticationServiceImpl.getAuthData();
		HttpClient httpClient = HttpClientBuilder.create().build();
		HttpPost postStudentRequest = new HttpPost(
				authData.getLoginInstanceUrl()
						+ "/services/data/v44.0/sobjects/Student__c");

		postStudentRequest.setHeader("Authorization", authData.getAuthBearer());
		postStudentRequest.setHeader("Content-Type",
				"application/json; charset=utf8");
		
		boolean isStudentCreated = false;

		Gson gson = new Gson();
		try {
			StringEntity params = new StringEntity(gson.toJson(student)
					.toString());
			postStudentRequest.setEntity(params);
			HttpResponse response = httpClient.execute(postStudentRequest);
			
			if(response.getStatusLine().getStatusCode()==201){
				isStudentCreated = true;
			}
			
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return isStudentCreated;
	}

}
