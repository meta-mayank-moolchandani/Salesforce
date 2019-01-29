package com.metacube.service.impl;

import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import com.google.gson.Gson;
import com.metacube.app.pojos.AuthData;
import com.metacube.app.pojos.Contact;
import com.metacube.app.service.ContactService;

public class ContactServiceImpl implements ContactService {

	@Override
	public Contact getContactById(String id) {
		Contact contact = new Contact();
		AuthData authData = AuthenticationServiceImpl.getAuthData();
		HttpClient httpclient = HttpClientBuilder.create().build();

		HttpGet getMethod = new HttpGet(authData.getLoginInstanceUrl()
				+ "/services/data/v44.0/sobjects/contact/" + id);
		getMethod.setHeader("Authorization", authData.getAuthBearer());
		getMethod.setHeader("ContentType", "application/json");

		HttpResponse getResponse = null;

		try {
			// Execute the login POST request
			getResponse = httpclient.execute(getMethod);
		} catch (ClientProtocolException cpException) {
			cpException.printStackTrace();
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}

		// verify response is HTTP OK
		final int statusCodeGet = getResponse.getStatusLine().getStatusCode();
		if (statusCodeGet != HttpStatus.SC_OK) {
			System.out.println("Error authenticating to Force.com: "
					+ statusCodeGet);
			// Error is in EntityUtils.toString(response.getEntity())
			contact = null;
		}

		String getRequestResult = null;

		try {
			getRequestResult = EntityUtils.toString(getResponse.getEntity());
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}

		JSONObject jsonObject = null;
		try {
			Gson gson = new Gson();
			jsonObject = (JSONObject) new JSONTokener(getRequestResult).nextValue();
			contact = gson.fromJson(jsonObject.toString(), Contact.class);
		} catch (JSONException jsonException) {
			jsonException.printStackTrace();
		}

		return contact;
	}

}
