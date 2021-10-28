package com.itnihongo.kamehouse.service;

import javax.servlet.http.HttpServletResponse;

public interface IAuthService {
    String login(String email, String password, HttpServletResponse response);
}
