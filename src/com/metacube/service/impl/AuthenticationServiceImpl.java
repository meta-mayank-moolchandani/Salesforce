package com.metacube.service.impl;

import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import com.google.gson.Gson;
import com.metacube.app.pojos.AuthData;
import com.metacube.app.service.AuthenticationService;
import com.metacube.app.utils.AuthConstants;

public class AuthenticationServiceImpl implements AuthenticationService {

	public static AuthData authData;

	public static AuthData getAuthData() {

		if (authData != null) {
			return authData;
		} else {
			HttpClient httpclient = HttpClientBuilder.create().build();
			String loginURL = AuthConstants.LOGINURL
					+ AuthConstants.GRANTSERVICE + "&client_id="
					+ AuthConstants.CLIENTID + "&client_secret="
					+ AuthConstants.CLIENTSECRET + "&username="
					+ AuthConstants.USERNAME + "&password="
					+ AuthConstants.PASSWORD;

			HttpPost httpPost = new HttpPost(loginURL);
			HttpResponse response = null;

			try {
				// Execute the login POST request
				response = httpclient.execute(httpPost);
			} catch (ClientProtocolException cpException) {
				cpException.printStackTrace();
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}

			final int statusCode = response.getStatusLine().getStatusCode();
			if (statusCode != HttpStatus.SC_OK) {
				System.out.println("Error authenticating to Force.com: "
						+ statusCode);
				return null;
			}

			String getResult = null;
			try {
				getResult = EntityUtils.toString(response.getEntity());
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}

			JSONObject jsonObject = null;

			try {
				Gson gson = new Gson();
				jsonObject = (JSONObject) new JSONTokener(getResult)
						.nextValue();
				authData = gson.fromJson(jsonObject.toString(), AuthData.class);

			} catch (JSONException jsonException) {
				jsonException.printStackTrace();
			}

			return authData;
		}
	}

}
